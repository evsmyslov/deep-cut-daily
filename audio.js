"use strict";

const audioStorage="rare-below-audio";
const audioOptions={music:true,effects:true};
try {
  const saved=JSON.parse(localStorage.getItem(audioStorage));
  for (const key of Object.keys(audioOptions)) if (typeof saved?.[key]==="boolean") audioOptions[key]=saved[key];
} catch { /* Audio can run without saved settings. */ }

let gameAudio, musicChannel, effectsChannel, musicTimer;
let chordPosition=0;
const scoreChords=[[55,82.41,130.81],[49,73.42,110],[43.65,65.41,110],[48.99,73.42,123.47]];

function activateAudio() {
  const Audio=window.AudioContext ?? window.webkitAudioContext;
  if (!Audio || (!audioOptions.music && !audioOptions.effects)) return;
  try {
    if (!gameAudio) {
      gameAudio=new Audio();
      musicChannel=gameAudio.createGain();
      effectsChannel=gameAudio.createGain();
      musicChannel.gain.value=0;
      effectsChannel.gain.value=.12;
      musicChannel.connect(gameAudio.destination);
      effectsChannel.connect(gameAudio.destination);
    }
    if (gameAudio.state!=="running") gameAudio.resume().catch(()=>{});
    refreshMusic();
  } catch { /* A device without Web Audio still plays the game. */ }
}

function note(output,frequency,delay,length,volume,type="sine",end=frequency,attack=.025) {
  const start=gameAudio.currentTime+delay;
  const tone=gameAudio.createOscillator();
  const envelope=gameAudio.createGain();
  tone.type=type;
  tone.frequency.setValueAtTime(frequency,start);
  tone.frequency.exponentialRampToValueAtTime(end,start+length);
  envelope.gain.setValueAtTime(.0001,start);
  envelope.gain.exponentialRampToValueAtTime(volume,start+attack);
  envelope.gain.exponentialRampToValueAtTime(.0001,start+length);
  tone.connect(envelope);
  envelope.connect(output);
  tone.start(start);
  tone.stop(start+length);
}
function musicMeasure() {
  const chord=scoreChords[chordPosition++%scoreChords.length];
  chord.forEach((frequency,index)=>note(musicChannel,frequency,index*.36,6.2,.16,"sine",frequency,1.2));
  note(musicChannel,chord[2]*2,2.6,2.4,.09,"sine",chord[2]*2,.28);
}
function refreshMusic() {
  if (!gameAudio) return;
  const enabled=audioOptions.music && !document.hidden;
  musicChannel.gain.setTargetAtTime(enabled ? .10 : 0,gameAudio.currentTime,.25);
  if (!enabled) {
    clearInterval(musicTimer);
    musicTimer=null;
  } else if (!musicTimer) {
    musicMeasure();
    musicTimer=setInterval(musicMeasure,6000);
  }
}
function playCue(kind,tier) {
  if (!gameAudio || !audioOptions.effects || document.hidden || gameAudio.state!=="running") return;
  if (kind==="find") {
    note(effectsChannel,106,0,.16,.21,"triangle",52,.008);
    note(effectsChannel,70,.10,.19,.16,"triangle",35,.008);
    const root=[392,494,587,698,330][tier] ?? 330;
    note(effectsChannel,root,.08,.27,.21);
    note(effectsChannel,root*1.5,.18,.33,.16);
  } else if (kind==="finish") {
    [261.63,329.63,392,523.25].forEach((pitch,index)=>note(effectsChannel,pitch,index*.12,.65,.21));
  } else if (kind==="reject" || kind==="skip") {
    note(effectsChannel,kind==="reject"?180:115,0,.12,.16,"sine",86,.02);
  } else if (kind==="round") {
    note(effectsChannel,349,0,.16,.14);
  }
}
function showAudioMenu() {
  const controls=element("div","");
  controls.className="audio-options";
  for (const key of Object.keys(audioOptions)) {
    const label=element("label","");
    const input=element("input","");
    input.type="checkbox";
    input.checked=audioOptions[key];
    input.onchange=()=>{
      audioOptions[key]=input.checked;
      try { localStorage.setItem(audioStorage,JSON.stringify(audioOptions)); } catch { /* Use current settings. */ }
      if (input.checked) activateAudio();
      else refreshMusic();
    };
    label.append(input,element("span",words()[key]));
    controls.append(label);
  }
  modal(words().sound,controls);
}
function prepareAudio() {
  document.addEventListener("visibilitychange",refreshMusic);
}
