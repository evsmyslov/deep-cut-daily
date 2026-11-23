let liveView=null;
let duelFrame;

function relayDuelRequest(url,{body,signal}) {
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
        try { frame.contentWindow.postMessage({path:new URL(url).pathname,body},answerService,[channel.port2]); }
        catch (error) { finish(reject,error); }
      }
    });
  });
}

function duelError(code) {
  const label={
    expired:"roomExpired",full:"roomFull",invalid:"badCode",member:"memberExpired",timeout:"duelTimeout",
    network:"duelNetwork",offline:"duelOffline",response:"duelResponse",retry:"duelResponse",origin:"duelResponse",
    started:"companyStarted"
  }[code] ?? "matchError";
  return words()[label];
}

async function requestLobby(path,connection,data,timeout=8000) {
  if (connection.relay) return request(path,data,timeout,relayDuelRequest);
  try { return await request(path,data,timeout); }
  catch (error) {
    if (location.origin!==new URL(publicGame).origin || !["network","timeout"].includes(error.code)) throw error;
    const state=await request(path,data,timeout,relayDuelRequest);
    connection.relay=true;
    return state;
  }
}

function requestLive(data,signal) {
  const path=location.origin===answerService ? "play/api/live" : "live";
  return request(path,data,data.action==="submit" ? 8000 : 4500,undefined,signal);
}

function directDuelLink(room,member,company=false) {
  const url=new URL("/play/",answerService);
  if (company) url.searchParams.set("company","1");
  if (room && member) {
    url.searchParams.set("continue",room);
    url.hash=new URLSearchParams({seat:member}).toString();
  } else if (room) url.searchParams.set("join",room);
  else if (!company) url.searchParams.set("duel","1");
  return url.href;
}
function setDirectDuelLink(link,view,show=true) {
  link.hidden=!show || location.origin===answerService;
  if (!link.hidden) {
    link.href=directDuelLink(view?.route.duel,view?.state?.member ?? view?.route.member,view?.route.company);
    link.textContent=view?.route.company ? words().directCompany : words().directDuel;
  }
}

function leaveLive() {
  liveView?.lifetime.abort();
  clearTimeout(liveView?.poll);
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
  setDirectDuelLink(get("duel-direct"));
  create.focus();
  input.oninput=()=>{notice.textContent="";};
  join.onsubmit=event=>{
    event.preventDefault();
    if (create.disabled) return;
    const code=normalizeRoomCode(input.value.replace(/[\s-]/g,""));
    if (!code) { notice.textContent=words().badCode; input.focus(); return; }
    enterLive({mode:"live",duel:code,seat:"guest",key:`live:${code}:guest`});
  };
  create.onclick=async()=>{
    create.disabled=true;
    input.disabled=true;
    submit.disabled=true;
    notice.textContent=words().joiningRoom;
    try {
      const created=await requestLive({action:"create",shortCode:true,deckVersion:MINE_DECK_VERSION});
      if (create.isConnected && get("duel-modal").open) {
        enterLive({mode:"live",duel:created.room,seat:"host",key:`live:${created.room}`},created);
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
function enterLive(lobbyRoute,created=null) {
  leaveLive();
  const view={
    route:lobbyRoute,state:created,lifetime:new AbortController(),offset:created ? created.now-Date.now() : 0,
    key:"",polling:false,busy:false,error:null,failures:0,onStage:false,feedback:null
  };
  liveView=view;
  if (created?.kind==="company") {
    const url=new URL(gameRoot);
    url.searchParams.set("mode","live");
    url.searchParams.set("room",created.room);
    url.searchParams.set("company","1");
    history.pushState({...history.state,minePlayer:browserId},"",url);
  }
  paintLive(view,true);
  view.ticker=setInterval(()=>tickLive(view),120);
  syncLive(view);
}

function wakeDuel() {
  const view=liveView;
  if (!view || document.hidden || view.permanentError || view.state?.phase==="done" || view.polling) return;
  clearTimeout(view.poll);
  view.paused=false;
  view.failures=0;
  syncLive(view);
}
function scheduleLive(view,delay) {
  clearTimeout(view.poll);
  if (liveView===view && !view.paused && !view.permanentError && view.state?.phase!=="done") {
    view.poll=setTimeout(()=>syncLive(view),delay);
  }
}
async function syncLive(view) {
  if (liveView!==view || view.polling || view.permanentError || view.paused) return;
  if (view.busy || document.prerendering) { scheduleLive(view,500); return; }
  view.polling=true;
  try {
    await sendLive(view,view.state || view.route.member ? "state" : "join");
  } catch(error) {
    if (liveView!==view) return;
    view.error=error.code;
    view.permanentError=["expired","full","invalid","member","started"].includes(error.code);
    view.failures++;
    if (!view.state || (!view.onStage && view.failures>=2)) view.paused=true;
  } finally {
    view.polling=false;
    if (liveView===view) {
      updateLiveNotice(view);
      const delay=view.failures ? Math.min(3400,900*view.failures) : document.hidden ? 2400 : view.onStage ? 700 : 950;
      scheduleLive(view,delay);
    }
  }
}
async function sendLive(view,action,values={}) {
  const before=Date.now();
  const member=view.state?.member ?? view.route.member;
  const data={action,room:view.route.duel,seat:view.route.seat,member,
    ...(action==="join" && view.route.nickname ? {nickname:view.route.nickname} : {}),...values};
  const state=await requestLive(data,view.lifetime.signal);
  if (liveView!==view) return;
  if (action==="submit" && state.feedback && view.state?.phase==="question" && view.state.index===values.index) {
    view.feedback={index:values.index,message:state.feedback};
  }
  if (view.state && (state.revision<view.state.revision ||
    (state.revision===view.state.revision && state.now<view.state.now))) return;
  const after=Date.now();
  if (state.phase==="question" && (view.state?.phase!=="question" || view.state.index!==state.index)) playCue("round");
  if (state.phase==="reveal" && view.state?.phase!=="reveal") {
    if (state.ownPick?.tier>=0) playCue("find",state.ownPick.tier);
    else playCue("skip");
  }
  if (state.phase==="done" && view.state?.phase!=="done") playCue("finish");
  if (action==="submit" && state.feedback) playCue("reject");
  view.offset=state.now-(before+Math.min(500,(after-before)/2));
  view.state=state;
  view.route.company=state.kind==="company";
  view.error=null;
  view.failures=0;
  paintLive(view);
  if (state.phase==="done") {
    clearTimeout(view.poll);
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
        if (view.feedback?.message==="wrongRetry") offerAnswerReview(mineQuestion(view.state.prompt),get("answer").value.trim());
      }
    }
  }
}
function updateLiveNotice(view) {
  const notice=get("live-notice") ?? get("check-status");
  if (!notice) return;
  if (view.route.company) updateCompanyLobby(view);
  const direct=get("live-direct") ?? get("match-direct");
  if (direct) setDirectDuelLink(direct,view,Boolean(get("live-direct")) || Boolean(view.error));
  const retry=get("live-retry");
  if (retry) {
    retry.hidden=!view.error || view.permanentError;
    retry.disabled=view.polling && !view.paused;
    const ready=get("live-ready");
    if (ready) {
      ready.disabled=!view.state || view.busy || view.paused || view.permanentError;
      ready.textContent=view.state?.ready ? words().unready : words().ready;
    }
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
function setLiveRetry(view) {
  get("live-retry").onclick=()=>{
    if (view.polling) return;
    view.failures=0;
    view.paused=false;
    view.error=null;
    updateLiveNotice(view);
    clearTimeout(view.poll);
    syncLive(view);
  };
}
function duelAnswerText(answer) {
  const ui=words();
  const label=answer?.tier>=0 ? answer[lang] : answer?.reason==="timeout" ? ui.timeUp
    : answer?.reason==="checked" ? ui.unverifiable : ui.skipped;
  return `${ui.friendSeat} · ${label} · +${answer ? pointsFor(answer) : 0}`;
}
function paintLive(view,force=false) {
  const state=view.state;
  if (state) get("hud-rival").textContent=state.rivalScore ?? 0;
  const phase=state?.phase ?? "lobby";
  const key=[view.route.company,phase,state?.index,state?.locked,state?.ready,state?.opponentJoined,state?.opponentReady].join("/");
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
    round={answers:state.answers.map(answer=>({...answer,id:answer.id??null})),rivalAnswers:state.rivalAnswers,done:true};
    results(false);
    if (view.route.company) paintCompanyBoard(get("company-results"),state.standings,"done");
    else showComparison(state.rivalScore,state.ownScore);
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
    if (view.route.company) {
      showCompanyLobby(view,phase);
      updateLiveNotice(view);
      tickLive(view);
      return;
    }
    showDuelPanel("live-lobby");
    get("duel-title").textContent=phase==="countdown" ? ui.getReady : ui.live;
    get("live-status").textContent=!state ? ui.joiningRoom : phase==="countdown" ? "" : ui.liveRules;
    get("own-ready").textContent=state?.ready ? ui.isReady : ui.notReady;
    get("friend-ready").textContent=!state?.opponentJoined ? ui.waitSeat : state.opponentReady ? ui.isReady : ui.notReady;
    const invite=directDuelLink(view.route.duel);
    get("live-url").value=invite;
    get("current-room-code").textContent=view.route.duel;
    get("live-url").onclick=event=>event.currentTarget.select();
    get("live-copy").onclick=()=>{
      get("live-notice").dataset.copied="1";
      copyChallenge(invite,"live-notice");
    };
    get("live-ready").onclick=()=>{
      activateAudio();
      get("live-ready").disabled=true;
      liveAction(view,"ready",{ready:!state.ready});
    };
    setLiveRetry(view);
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
    get("category").textContent=`${ui.question} ${state.index+1} / ${expeditionLength()}`;
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
      renderAnswerVerdict(a,a?.reason==="timeout" ? ui.timeUp : a?.reason==="skip" ? ui.skipped
        : a?.reason==="checked" ? ui.unverifiable : ui.wrong,!force);
      get("arrival").textContent=`${ui.depth} · ${get("depth").textContent}`;
      get("rival-verdict").textContent=duelAnswerText(state.rivalPick);
      get("rival-verdict").hidden=!state.rivalPick;
      if (view.route.company) paintCompanyBoard(get("company-board"),state.standings,"reveal");
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
