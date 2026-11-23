"use strict";

const friendsStorage="rare-below-friends-enabled";
const friendNamesStorage="rare-below-friend-names";
const friendNames=new Map();
const friendsConnection={relay:false};
let friendsEnabled=false;
let activeInvites;
let inboxLoading=false;
try { friendsEnabled=localStorage.getItem(friendsStorage)==="1"; } catch { /* The current tab can still participate. */ }
try {
  for (const [code,name] of Object.entries(JSON.parse(localStorage.getItem(friendNamesStorage)) ?? {})) {
    if (typeof name==="string" && name) friendNames.set(code,name);
  }
} catch { /* An unavailable store does not prevent editing names in this tab. */ }

const friendsRequest=data=>requestLobby("friends",friendsConnection,data);
const friendButton=(label,action)=>{
  const button=element("button",label);
  button.type="button";
  button.className="quiet";
  button.onclick=action;
  return button;
};
function paintFriendIdentity(identity, code) {
  const name=friendNames.get(code);
  const codeLabel=element("code",code);
  identity.replaceChildren(...(name ? [element("strong",name),codeLabel] : [codeLabel]));
}
function friendIdentity(code) {
  const identity=element("span","");
  identity.className="friend-identity";
  identity.dataset.friendCode=code;
  paintFriendIdentity(identity,code);
  return identity;
}
function friendNameEditor(code, panel) {
  const ui=words();
  const form=element("form","");
  form.className="friend-name-editor";
  form.id=`friend-name-editor-${code}`;
  form.hidden=true;
  const label=element("label",ui.friendNameLabel);
  const input=element("input","");
  input.id=`friend-name-${code}`;
  input.maxLength=32;
  input.autocomplete="off";
  input.setAttribute("aria-describedby",`friend-name-hint-${code}`);
  label.htmlFor=input.id;
  const hint=element("small",ui.friendNameHint);
  hint.id=input.getAttribute("aria-describedby");
  const controls=element("div","");
  controls.className="friend-name-controls";
  const save=element("button",ui.saveFriendName);
  save.className="primary";
  const cancel=friendButton(ui.cancelFriendName,close);
  const edit=friendButton(ui.editFriendName,()=>{
    if (!form.hidden) { close(); return; }
    input.value=friendNames.get(code) ?? "";
    form.hidden=false;
    edit.setAttribute("aria-expanded","true");
    input.focus();
    input.select();
  });
  edit.setAttribute("aria-controls",form.id);
  edit.setAttribute("aria-expanded","false");
  function close() {
    form.hidden=true;
    edit.setAttribute("aria-expanded","false");
    edit.focus();
  }
  form.onsubmit=event=>{
    event.preventDefault();
    const name=input.value.replace(/\s+/g," ").replace(/[\u0000-\u001f\u007f\u202a-\u202e\u2066-\u2069]/g,"").trim();
    if (name) friendNames.set(code,name);
    else friendNames.delete(code);
    try { localStorage.setItem(friendNamesStorage,JSON.stringify(Object.fromEntries(friendNames))); }
    catch { /* Keep the name for the current tab. */ }
    for (const identity of panel.querySelectorAll("[data-friend-code]")) {
      if (identity.dataset.friendCode===code) paintFriendIdentity(identity,code);
    }
    close();
  };
  controls.append(input,save,cancel);
  form.append(label,controls,hint);
  return {edit,form};
}
function showFriendInvites(invites,target=activeInvites) {
  const badge=get("friend-unread");
  badge.textContent=invites.length;
  badge.hidden=invites.length===0;
  get("menu-unread").hidden=badge.hidden;
  if (!target?.isConnected || !get("modal").open) return;
  const ui=words();
  const list=element("ul","");
  list.className="friend-rows";
  for (const invitation of invites) {
    const row=element("li","");
    const join=friendButton(ui.acceptInvite,()=>{
      get("modal").close();
      enterLive({mode:"live",duel:invitation.room,seat:"guest",key:`live:${invitation.room}:guest`});
    });
    const decline=friendButton(ui.declineInvite,async()=>{
      decline.disabled=true;
      try {
        await friendsRequest({action:"decline",contact:invitation.sender});
        await refreshFriendInbox();
      } catch (error) { if (get("friends-status")) get("friends-status").textContent=friendError(error.code); }
      finally { decline.disabled=false; }
    });
    row.append(friendIdentity(invitation.sender),join,decline);
    list.append(row);
  }
  target.replaceChildren(element("h3",ui.incoming),invites.length ? list : element("p",ui.nobodyInvited));
}
async function refreshFriendInbox() {
  if (!friendsEnabled || inboxLoading || document.hidden) return;
  inboxLoading=true;
  try { showFriendInvites((await friendsRequest({action:"inbox"})).invites); }
  catch { /* Keep the last invitation count until the server responds. */ }
  finally { inboxLoading=false; }
}
function startFriendPolling() {
  if (friendsEnabled) refreshFriendInbox();
  setInterval(refreshFriendInbox,12000);
  document.addEventListener("visibilitychange",refreshFriendInbox);
}
function friendError(code) {
  return ["contactCode","contactMissing","contactSelf"].includes(code) ? words()[code] : duelError(code);
}
async function showFriends() {
  const ui=words();
  const panel=element("section","");
  const status=element("p",ui.friendsLoading);
  status.id="friends-status";
  status.setAttribute("role","status");
  modal(ui.friends,panel,status);
  try {
    const data=await friendsRequest({action:"list"});
    if (!status.isConnected || !get("modal").open) return;
    friendsEnabled=true;
    try { localStorage.setItem(friendsStorage,"1"); } catch { /* Keep notifications active for this tab. */ }
    status.textContent="";
    paintFriends(panel,status,data);
  } catch (error) {
    if (status.isConnected) status.textContent=friendError(error.code);
  }
}
function paintFriends(panel,status,data) {
  const ui=words();
  const personal=element("label",ui.friendCode);
  const ownField=element("input","");
  ownField.value=data.code;
  ownField.readOnly=true;
  ownField.onclick=()=>ownField.select();
  personal.append(ownField);
  const form=element("form","");
  form.className="join-form";
  const label=element("label",ui.friendCodeInput);
  label.htmlFor="friend-code-input";
  const input=element("input","");
  input.id=label.htmlFor;
  input.required=true;
  input.maxLength=12;
  input.autocomplete="off";
  input.autocapitalize="characters";
  input.spellcheck=false;
  const add=element("button",ui.friendAdd);
  add.className="primary";
  const field=element("div","");
  field.className="join-controls";
  field.append(input,add);
  form.append(label,field);
  const contacts=element("ul","");
  contacts.className="friend-rows";

  async function perform(button,action,contact) {
    button.disabled=true;
    status.textContent="";
    try {
      const result=await friendsRequest({action,contact,deckVersion:action==="invite" ? MINE_DECK_VERSION : undefined});
      if (!panel.isConnected || !get("modal").open) return;
      if (action==="invite") {
        get("modal").close();
        enterLive({mode:"live",duel:result.room,seat:"host",key:`live:${result.room}`},result);
      } else {
        const updated=await friendsRequest({action:"list"});
        if (panel.isConnected && get("modal").open) paintFriends(panel,status,updated);
      }
    } catch (error) {
      if (status.isConnected) status.textContent=friendError(error.code);
    } finally { button.disabled=false; }
  }
  form.onsubmit=event=>{
    event.preventDefault();
    const code=input.value.replace(/[\s-]/g,"").toUpperCase();
    if (!/^[A-HJ-NP-Z2-9]{8}$/.test(code)) { status.textContent=ui.contactCode; return; }
    if (!add.disabled) perform(add,"add",code);
  };
  for (const code of data.friends) {
    const row=element("li","");
    const invite=friendButton(ui.challengeFriend,()=>perform(invite,"invite",code));
    const remove=friendButton(ui.removeFriend,()=>perform(remove,"remove",code));
    const editor=friendNameEditor(code,panel);
    row.append(friendIdentity(code),invite,editor.edit,remove,editor.form);
    contacts.append(row);
  }
  activeInvites=element("section","");
  activeInvites.className="friend-invites";
  panel.replaceChildren(element("p",ui.friendIntro),personal,element("small",ui.friendDevice),form,
    data.friends.length ? contacts : element("p",ui.noFriends),activeInvites);
  showFriendInvites(data.invites,activeInvites);
}
