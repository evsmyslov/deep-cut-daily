"use strict";

function showCompanyMenu() {
  leaveLive();
  showDuelPanel("company-menu");
  const ui=words();
  const name=get("company-name");
  const theme=get("company-pack");
  const rounds=get("company-rounds");
  const create=get("company-create");
  const join=get("company-join");
  const notice=get("company-notice");
  get("duel-title").textContent=ui.company;
  theme.append(new Option(ui.companyAll,""));
  for (const [id,pack] of Object.entries(minePacks)) theme.append(new Option(pack[lang],id));
  name.focus();
  create.onsubmit=async event=>{
    event.preventDefault();
    const controls=[...get("duel-body").querySelectorAll("input,select,button")];
    controls.forEach(control=>{control.disabled=true;});
    notice.textContent=ui.joiningRoom;
    try {
      const created=await requestLive({action:"create",kind:"company",pack:theme.value || null,rounds:Number(rounds.value),
        nickname:name.value,deckVersion:MINE_DECK_VERSION});
      if (create.isConnected && get("duel-modal").open) {
        enterLive({mode:"live",duel:created.room,company:true,seat:"host",key:`live:${created.room}`},created);
      }
    } catch(error) {
      if (notice.isConnected) notice.textContent=duelError(error.code);
    } finally {
      controls.forEach(control=>{control.disabled=false;});
    }
  };
  join.onsubmit=event=>{
    event.preventDefault();
    const input=get("company-code");
    const duel=normalizeRoomCode(input.value.replace(/\s/g,""));
    if (duel?.length!==6) { notice.textContent=ui.badCode; input.focus(); return; }
    enterLive({mode:"live",duel,company:true,nickname:name.value,seat:"guest",key:`live:${duel}:guest`});
  };
}

function companyName(member) {
  const ui=words();
  const name=member.name || `${ui.companyPlayer} ${member.index+1}`;
  const tags=[];
  if (member.you) tags.push(ui.companyYou);
  if (member.index===0) tags.push(ui.companyHost);
  return tags.length ? `${name} · ${tags.join(" · ")}` : name;
}

function paintCompanyBoard(target,standings,phase) {
  if (!target || !standings) return;
  const ui=words();
  const list=element(phase==="lobby" ? "ul" : "ol","");
  list.className="company-standings";
  for (const member of standings) {
    const row=element("li","");
    row.append(element("strong",companyName(member)));
    if (phase!=="lobby") row.append(element("span",`${member.score} ${ui.points}`));
    if (phase==="reveal") {
      const answer=member.answer;
      const label=answer?.tier>=0 ? answer[lang] : answer?.reason==="timeout" ? ui.timeUp : ui.skipped;
      const pick=element("small",`${label} · +${answer ? pointsFor(answer) : 0}${member.unique ? ` · ${ui.companyUnique}` : ""}`);
      pick.classList.toggle("company-unique",member.unique);
      row.append(pick);
    }
    list.append(row);
  }
  target.hidden=false;
  target.replaceChildren(...(phase==="lobby" ? [list] : [element("h3",ui.companyStandings),list]));
}

function updateCompanyLobby(view) {
  const state=view.state;
  const start=get("company-start");
  if (!start) return;
  const ui=words();
  const connected=state?.kind==="company";
  const lobby=connected && state.phase==="lobby";
  const canStart=lobby && state.seat==="host";
  start.hidden=!canStart;
  start.disabled=view.busy || !canStart || state.standings.length<2;
  get("company-rename").hidden=!lobby;
  get("company-rename").querySelector("button").disabled=view.busy;
  get("live-url").parentElement.hidden=!lobby;
  get("live-room-code").hidden=!lobby;
  get("company-settings").hidden=!connected;
  if (connected) {
    get("company-settings").textContent=`${state.pack ? minePack(state.pack)?.[lang] ?? ui.companyAll : ui.companyAll} · ${ui.companyRoundCount.toLowerCase()} ${state.rounds}`;
    if (view.rosterRevision!==state.revision) {
      view.rosterRevision=state.revision;
      paintCompanyBoard(get("company-lobby-roster"),state.standings,"lobby");
    }
    if (lobby) {
      get("live-status").textContent=canStart
        ? state.standings.length<2 ? ui.companyNeedPlayers : ""
        : ui.companyWait;
    }
  }
}

function showCompanyLobby(view,phase) {
  const state=view.state;
  const ui=words();
  showDuelPanel("company-lobby");
  get("duel-title").textContent=phase==="countdown" ? ui.getReady : ui.company;
  get("live-status").textContent=state ? "" : ui.joiningRoom;
  const url=get("live-url");
  const invite=directDuelLink(view.route.duel,null,true);
  url.value=invite;
  url.onclick=()=>url.select();
  get("current-room-code").textContent=view.route.duel;
  get("live-copy").onclick=()=>{
    get("live-notice").dataset.copied="1";
    copyChallenge(invite,"live-notice");
  };
  const name=get("company-lobby-name");
  name.value=state?.standings?.find(member=>member.you)?.name ?? view.route.nickname ?? "";
  get("company-rename").onsubmit=event=>{
    event.preventDefault();
    liveAction(view,"rename",{nickname:name.value});
  };
  get("company-start").onclick=()=>{
    activateAudio();
    liveAction(view,"start");
    updateCompanyLobby(view);
  };
  get("company-back").onclick=showCompanyMenu;
  setLiveRetry(view);
  view.rosterRevision=null;
  updateCompanyLobby(view);
}
