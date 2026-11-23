let liveView=null;

function stopLive() {
  if (!liveView) return;
  clearInterval(liveView.poll);
  clearInterval(liveView.ticker);
  liveView=null;
}
function enterLive() {
  const view={route,state:null,key:"",offset:0,polling:false,busy:false,error:null};
  liveView=view;
  paintLive(view,true);
  view.poll=setInterval(()=>syncLive(view),850);
  view.ticker=setInterval(()=>tickLive(view),120);
  syncLive(view);
}

async function syncLive(view) {
  if (liveView!==view || view.polling || view.permanentError) return;
  view.polling=true;
  try {
    await sendLive(view,view.state?"state":"join");
  } catch(error) {
    if (liveView!==view) return;
    view.error=error.code;
    if (["expired","full","invalid"].includes(error.code)) view.permanentError=true;
    updateLiveNotice(view);
  } finally { view.polling=false; }
}
async function sendLive(view,action,values={}) {
  const before=Date.now();
  const state=await request("live",{action,room:view.route.duel,...values});
  if (liveView!==view || (view.state && (state.revision<view.state.revision ||
    (state.revision===view.state.revision && state.now<view.state.now)))) return;
  const after=Date.now();
  view.offset=state.now-(before+Math.min(500,(after-before)/2));
  view.state=state;
  view.error=null;
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
      if (get("live-ready")) get("live-ready").disabled=!view.state || view.state.ready;
      if (get("answer") && view.state?.phase==="question" && !view.state.locked) {
        get("answer").disabled=false;
        get("answer-form").querySelector("button").disabled=false;
      }
      updateLiveNotice(view);
      tickLive(view);
    }
  }
}
function updateLiveNotice(view) {
  const notice=get("live-notice") ?? get("check-status");
  if (!notice) return;
  if (view.error) {
    const label={expired:"roomExpired",full:"roomFull",invalid:"roomExpired"}[view.error] ?? "networkLost";
    notice.textContent=words()[label];
  } else if (view.state?.phase==="question") {
    notice.textContent=view.state.locked ? words().answerLocked : view.state.rushed ? words().rush : "";
  } else if (view.state?.phase==="reveal") {
    notice.textContent=words().autoNext;
  } else if (notice.dataset.copied!=="1") notice.textContent="";
}
function paintLive(view,force=false) {
  const state=view.state;
  const phase=state?.phase ?? "lobby";
  const key=[phase,state?.index,state?.locked,state?.ready,state?.opponentJoined,state?.opponentReady].join("/");
  if (!force && key===view.key) { updateLiveNotice(view); tickLive(view); return; }
  const draft=force && page==="question" ? get("answer")?.value ?? "" : "";
  view.key=key;
  const ui=words();
  if (phase==="done") {
    round={answers:state.answers.map(answer=>({...answer,id:answer.id??null})),done:true};
    results(false);
    showComparison(state.rivalScore,state.ownScore);
    return;
  }
  if (phase==="lobby" || phase==="countdown") {
    swap("live-lobby");
    setWorld(state?.index??0,state?.ownScore??0);
    get("live-title").textContent=phase==="lobby" ? ui.live : ui.getReady;
    get("live-status").textContent=!state ? ui.joiningRoom : phase==="countdown" ? "" : ui.liveRules;
    get("own-ready").textContent=state?.ready ? ui.isReady : ui.notReady;
    get("friend-ready").textContent=!state?.opponentJoined ? ui.waitSeat : state.opponentReady ? ui.isReady : ui.notReady;
    get("live-url").value=location.href;
    get("live-url").onclick=event=>event.currentTarget.select();
    get("live-copy").onclick=()=>{
      get("live-notice").dataset.copied="1";
      copyChallenge(location.href,"live-notice");
    };
    get("live-ready").disabled=!state || state.ready || view.busy;
    get("live-ready").onclick=()=>{
      get("live-ready").disabled=true;
      liveAction(view,"ready");
    };
    get("live-ready").hidden=phase==="countdown";
    get("live-seats").hidden=phase==="countdown";
    get("live-url").parentElement.hidden=phase==="countdown";
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
    } else if (!locked) bindSuggestions(question);
  }
  updateLiveNotice(view);
  tickLive(view);
}
function submitLive(view,text) {
  const state=view.state;
  if (!state || state.phase!=="question" || state.locked || Date.now()+view.offset>=state.deadline) return;
  get("answer").disabled=true;
  get("answer-form").querySelector("button").disabled=true;
  get("suggestions").hidden=true;
  liveAction(view,"submit",{index:state.index,text,language:lang});
}
function tickLive(view) {
  const state=view.state;
  if (!state) return;
  const now=Date.now()+view.offset;
  if (state.phase==="countdown") {
    get("live-status").textContent=String(Math.max(0,Math.ceil((state.opens-now)/1000)));
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
