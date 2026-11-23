let liveView=null;
let duelFrame;

function relayDuelRequest(_url,{body,signal}) {
  if (!duelFrame) {
    const frame=element("iframe","");
    frame.hidden=true;
    frame.title=words().duel;
    frame.setAttribute("sandbox","allow-scripts allow-same-origin");
    frame.src=`${answerService}/play/duel-connection`;
    const loaded=new Promise(resolve=>frame.addEventListener("load",resolve,{once:true}));
    document.body.append(frame);
    duelFrame={frame,loaded};
  }
  const {frame,loaded}=duelFrame;
  return new Promise((resolve,reject)=>{
    const channel=new MessageChannel();
    function finish(callback,value) {
      signal.removeEventListener("abort",abort);
      channel.port1.close();
      channel.port2.close();
      callback(value);
    }
    function abort() { finish(reject,signal.reason); }
    signal.addEventListener("abort",abort,{once:true});
    channel.port1.onmessage=({data})=>{
      if (data.error) finish(reject,new Error("Connection unavailable"));
      else finish(resolve,new Response(data.text,{status:data.status}));
    };
    loaded.then(()=>{
      if (!signal.aborted) {
        try { frame.contentWindow.postMessage(body,answerService,[channel.port2]); }
        catch (error) { finish(reject,error); }
      }
    });
  });
}

function duelError(code) {
  const label={
    expired:"roomExpired",full:"roomFull",invalid:"badCode",timeout:"duelTimeout",
    network:"duelNetwork",offline:"duelOffline",response:"duelResponse",retry:"duelResponse",origin:"duelResponse"
  }[code] ?? "matchError";
  return words()[label];
}

async function requestDuel(connection,data,timeout=8000,onAlternate=()=>{}) {
  if (connection.relay) return request("live",data,timeout,relayDuelRequest);
  try { return await request("live",data,timeout); }
  catch (error) {
    if (location.origin!==new URL(publicGame).origin || !["network","timeout"].includes(error.code)) throw error;
    onAlternate();
    const state=await request("live",data,timeout,relayDuelRequest);
    connection.relay=true;
    return state;
  }
}

function leaveLive() {
  clearInterval(liveView?.poll);
  clearInterval(liveView?.ticker);
  liveView=null;
}
function closeDuel() {
  leaveLive();
  hideDuelPanel();
}
function hideDuelPanel() {
  get("duel-modal").close();
  get("duel-body").replaceChildren();
}
function showDuelPanel(template) {
  const dialog=get("duel-modal");
  get("duel-body").replaceChildren(get(template).content.cloneNode(true));
  localize();
  if (!dialog.open) dialog.showModal();
}
function showDuelMenu() {
  leaveLive();
  showDuelPanel("duel-menu");
  const create=get("duel-create");
  const join=get("duel-join");
  const input=get("room-code-input");
  const submit=join.querySelector("button");
  const notice=get("duel-menu-notice");
  create.focus();
  input.oninput=()=>{notice.textContent="";};
  join.onsubmit=event=>{
    event.preventDefault();
    if (create.disabled) return;
    const code=input.value.toLowerCase().replace(/[\s-]/g,"");
    if (!isRoomCode(code)) { notice.textContent=words().badCode; input.focus(); return; }
    enterLive({mode:"live",duel:code,seat:"guest",key:`live:${code}:guest`});
  };
  create.onclick=async()=>{
    const connection={relay:false};
    create.disabled=true;
    input.disabled=true;
    submit.disabled=true;
    notice.textContent=words().joiningRoom;
    try {
      const created=await requestDuel(connection,{action:"create"},8000,()=>{
        notice.textContent=words().connectingAgain;
      });
      if (create.isConnected && get("duel-modal").open) {
        enterLive({mode:"live",duel:created.room,seat:"host",key:`live:${created.room}`},created,connection);
      }
    } catch (error) {
      if (create.isConnected) notice.textContent=duelError(error.code);
    } finally {
      create.disabled=false;
      input.disabled=false;
      submit.disabled=false;
    }
  };
}
function enterLive(lobbyRoute,created=null,connection={relay:false}) {
  leaveLive();
  const view={
    route:lobbyRoute,state:created,connection,offset:created ? created.now-Date.now() : 0,
    key:"",polling:false,busy:false,error:null,failures:0,onStage:false,feedback:null
  };
  liveView=view;
  paintLive(view,true);
  view.poll=setInterval(()=>syncLive(view),850);
  view.ticker=setInterval(()=>tickLive(view),120);
  syncLive(view);
}

async function syncLive(view) {
  if (liveView!==view || view.polling || view.permanentError || view.paused || document.prerendering) return;
  view.polling=true;
  try {
    await sendLive(view,view.state?"state":"join");
  } catch(error) {
    if (liveView!==view) return;
    view.error=error.code;
    view.permanentError=["expired","full","invalid"].includes(error.code);
    view.failures++;
    if (!view.onStage && (!view.state || view.failures>=2)) view.paused=true;
    updateLiveNotice(view);
  } finally {
    view.polling=false;
    if (liveView===view) updateLiveNotice(view);
  }
}
async function sendLive(view,action,values={}) {
  const before=Date.now();
  const data={action,room:view.route.duel,seat:view.route.seat,...values};
  const state=await requestDuel(view.connection,data,8000,()=>{
    if (liveView===view && !view.state) get("live-status").textContent=words().connectingAgain;
  });
  if (liveView!==view) return;
  if (action==="submit" && state.feedback && view.state?.phase==="question" && view.state.index===values.index) {
    view.feedback={index:values.index,message:state.feedback};
  }
  if (view.state && (state.revision<view.state.revision ||
    (state.revision===view.state.revision && state.now<view.state.now))) return;
  const after=Date.now();
  view.offset=state.now-(before+Math.min(500,(after-before)/2));
  view.state=state;
  view.error=null;
  view.failures=0;
  paintLive(view);
  if (state.phase==="done") {
    clearInterval(view.poll);
    clearInterval(view.ticker);
  }
}
async function liveAction(view,action,values) {
  if (view.busy) return;
  view.busy=true;
  try { await sendLive(view,action,values); }
  catch(error) {
    if (liveView!==view) return;
    view.error=error.code;
  } finally {
    view.busy=false;
    if (liveView===view) {
      updateLiveNotice(view);
      tickLive(view);
      if (action==="submit" && view.state?.phase==="question" && !view.state.locked && !get("answer").disabled) {
        get("answer").focus({preventScroll:true});
        if (view.feedback) get("answer").select();
      }
    }
  }
}
function updateLiveNotice(view) {
  const notice=get("live-notice") ?? get("check-status");
  if (!notice) return;
  const retry=get("live-retry");
  if (retry) {
    retry.hidden=!view.error || view.permanentError;
    retry.disabled=view.polling && !view.paused;
    const ready=get("live-ready");
    ready.disabled=!view.state || view.busy || view.paused || view.permanentError;
    ready.textContent=view.state?.ready ? words().unready : words().ready;
    if (!view.state) get("live-status").textContent=view.error ? "" : words().joiningRoom;
  }
  let message="";
  if (view.error) {
    message=duelError(view.error);
  } else if (view.state?.phase==="question") {
    message=view.state.locked ? words().answerLocked
      : view.busy ? words().checking
      : view.feedback?.index===view.state.index ? words()[view.feedback.message]
      : view.state.rushed ? words().rush : "";
  } else if (view.state?.phase==="reveal") {
    message=words().autoNext;
  } else if (notice.dataset.copied==="1") return;
  if (notice.textContent!==message) notice.textContent=message;
}
function paintLive(view,force=false) {
  const state=view.state;
  const phase=state?.phase ?? "lobby";
  const key=[phase,state?.index,state?.locked,state?.ready,state?.opponentJoined,state?.opponentReady].join("/");
  if (!force && key===view.key) { updateLiveNotice(view); tickLive(view); return; }
  const draft=force && page==="question" ? get("answer")?.value ?? "" : "";
  view.key=key;
  const ui=words();
  if (!view.onStage && !["lobby","countdown"].includes(phase)) {
    view.onStage=true;
    clearInterval(questionTimer);
    route=view.route;
    hideDuelPanel();
  }
  if (phase==="done") {
    round={answers:state.answers.map(answer=>({...answer,id:answer.id??null})),done:true};
    results(false);
    showComparison(state.rivalScore,state.ownScore);
    return;
  }
  if (phase==="lobby" || phase==="countdown") {
    if (view.onStage) {
      swap("question");
      setWorld(state.index,state.ownScore);
      get("prompt").textContent=ui.getReady;
      get("answer-form").hidden=true;
      get("skip").hidden=true;
      tickLive(view);
      return;
    }
    showDuelPanel("live-lobby");
    get("duel-title").textContent=phase==="countdown" ? ui.getReady : ui.live;
    get("live-status").textContent=!state ? ui.joiningRoom : phase==="countdown" ? "" : ui.liveRules;
    get("own-ready").textContent=state?.ready ? ui.isReady : ui.notReady;
    get("friend-ready").textContent=!state?.opponentJoined ? ui.waitSeat : state.opponentReady ? ui.isReady : ui.notReady;
    const invite=new URL(publicGame);
    invite.searchParams.set("join",view.route.duel);
    get("live-url").value=invite.href;
    get("current-room-code").textContent=view.route.duel;
    get("live-url").onclick=event=>event.currentTarget.select();
    get("live-copy").onclick=()=>{
      get("live-notice").dataset.copied="1";
      copyChallenge(invite.href,"live-notice");
    };
    get("live-ready").onclick=()=>{
      get("live-ready").disabled=true;
      liveAction(view,"ready",{ready:!state.ready});
    };
    get("live-retry").onclick=()=>{
      if (view.polling) return;
      view.failures=0;
      view.paused=false;
      view.error=null;
      view.connection.relay=false;
      duelFrame?.frame.remove();
      duelFrame=null;
      updateLiveNotice(view);
      syncLive(view);
    };
    get("live-back").onclick=showDuelMenu;
    get("live-ready").hidden=!state || (phase==="countdown" && state.index>0);
    get("live-seats").hidden=!state || phase==="countdown";
    get("live-url").parentElement.hidden=!state || phase==="countdown";
    get("live-room-code").hidden=!state || phase==="countdown";
    get("live-back").hidden=phase==="countdown";
  } else {
    const question=mineQuestion(state.prompt);
    swap("question");
    setWorld(state.index+Number(phase==="reveal"),state.ownScore,
      phase==="reveal" && state.ownPick?.tier>=0 && !force);
    get("category").textContent=`${ui.question} ${state.index+1} / ${questionsPerRound}`;
    get("prompt").textContent=question[lang];
    get("answer").placeholder=ui.placeholder;
    get("answer").value=draft;
    get("skip").onclick=()=>submitLive(view,"");
    get("answer-form").onsubmit=event=>{
      event.preventDefault();
      const text=get("answer").value.trim();
      if (answerKey(text)) submitLive(view,text);
    };
    const locked=state.locked || phase==="reveal";
    get("answer-form").hidden=locked;
    get("skip").hidden=locked;
    if (phase==="reveal") {
      get("feedback").hidden=false;
      get("next").hidden=true;
      const a=state.ownPick;
      get("verdict").textContent=a?.tier>=0 ? `${a[lang]} · ${ui.tiers[a.tier]} · +${pointsFor(a)}`
        : a?.reason==="timeout" ? ui.timeUp : a?.reason==="skip" ? ui.skipped
          : a?.reason==="checked" ? ui.unverifiable : ui.wrong;
      get("arrival").textContent=`${ui.depth} · ${get("depth").textContent}`;
    } else if (!locked) {
      bindSuggestions(question);
      get("answer").addEventListener("input",()=>{
        view.feedback=null;
        updateLiveNotice(view);
      });
    }
  }
  updateLiveNotice(view);
  tickLive(view);
}
function submitLive(view,text) {
  const state=view.state;
  if (!state || view.busy || state.phase!=="question" || state.locked || Date.now()+view.offset>=state.deadline) return;
  view.feedback=null;
  get("answer").disabled=true;
  get("answer-form").querySelector("button").disabled=true;
  get("suggestions").hidden=true;
  liveAction(view,"submit",{index:state.index,text,language:lang});
  updateLiveNotice(view);
}
function tickLive(view) {
  const state=view.state;
  if (!state) return;
  const now=Date.now()+view.offset;
  if (state.phase==="countdown") {
    const target=get("live-status") ?? get("category");
    const countdown=String(Math.max(0,Math.ceil((state.opens-now)/1000)));
    if (target.textContent!==countdown) target.textContent=countdown;
    const ready=get("live-ready");
    if (ready && now>=state.opens) ready.disabled=true;
  } else if (state.phase==="question" && !state.locked) {
    const seconds=Math.max(0,Math.ceil((state.deadline-now)/1000));
    get("timer").textContent=seconds;
    get("timer").classList.toggle("urgent",seconds<=10);
    const disabled=seconds===0 || view.busy;
    get("answer").disabled=disabled;
    get("answer-form").querySelector("button").disabled=disabled;
    get("skip").disabled=disabled;
  }
}
