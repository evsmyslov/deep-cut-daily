"use strict";

const audioStorage="rare-below-audio";
const audioOptions={music:true,effects:true};
const audioVolume={music:75,effects:75};
try {
  const saved=JSON.parse(localStorage.getItem(audioStorage));
  for (const key of Object.keys(audioOptions)) {
    if (typeof saved?.[key]==="boolean") audioOptions[key]=saved[key];
    const volume=saved?.volume?.[key];
    if (Number.isFinite(volume)) audioVolume[key]=Math.min(100,Math.max(0,Math.round(volume)));
  }
} catch { /* Audio can run without saved settings. */ }

let gameAudio, musicChannel, effectsChannel, musicBuffer, musicSource;
let musicRequested=false;
const chipRate=22050;
const beat=60/88;
const bassLine=[45,41,48,43,45,41,50,43,45,41,48,43,45,41,50,43];
const melody=[
  [69,72,76,74,72,69,null,67], [65,null,69,72,69,67,65,null],
  [67,72,76,null,74,72,67,69], [71,null,74,79,76,74,71,null],
  [69,72,76,81,79,76,74,72], [69,null,65,69,72,74,72,null],
  [74,77,81,null,77,76,74,72], [71,null,67,71,74,72,71,null],
  [69,null,76,74,72,null,69,67], [65,69,72,69,null,67,65,null],
  [67,72,76,79,76,null,74,72], [71,74,79,null,76,74,71,null],
  [72,76,81,null,79,76,72,69], [65,null,69,72,76,72,69,null],
  [74,77,81,84,81,77,76,74], [71,74,79,76,74,72,71,67]
];
const pitchOf=midi=>440*Math.pow(2,(midi-69)/12);

function chipLoop(context) {
  const frames=Math.round(melody.length*4*beat*chipRate);
  const buffer=context.createBuffer(1,frames,chipRate);
  const samples=buffer.getChannelData(0);
  function voice(midi,offset,duration,level,wave) {
    if (midi===null) return;
    const start=Math.round(offset*beat*chipRate);
    const count=Math.round(duration*beat*chipRate);
    const cycle=pitchOf(midi)/chipRate;
    for (let i=0;i<count;i++) {
      const phase=i*cycle%1;
      const edge=Math.min(1,i/90,(count-i)/1100);
      const signal=wave==="triangle" ? 1-4*Math.abs(phase-.5) : phase<.25 ? .75 : -.25;
      samples[(start+i)%frames]+=signal*level*edge;
    }
  }
  melody.forEach((notes,bar)=>{
    const start=bar*4;
    notes.forEach((midi,i)=>voice(midi,start+i/2,.43,.24,"pulse"));
    const root=bassLine[bar];
    const third=[41,48,43].includes(root) ? 4 : 3;
    [0,7,12,7].forEach((step,i)=>voice(root+step,start+i,.99,.42,"triangle"));
    [0,third,7,third,0,third,7,12].forEach((step,i)=>voice(root+12+step,start+i/2,.48,.12,"pulse"));
  });
  return buffer;
}

function activateAudio(startMusic=true) {
  if (startMusic) musicRequested=true;
  const Audio=window.AudioContext ?? window.webkitAudioContext;
  if (!Audio || (!audioOptions.music && !audioOptions.effects)) return;
  try {
    if (!gameAudio) {
      gameAudio=new Audio();
      musicChannel=gameAudio.createGain();
      effectsChannel=gameAudio.createGain();
      musicChannel.gain.value=0;
      effectsChannel.gain.value=audioOptions.effects ? audioVolume.effects*.0029 : 0;
      musicChannel.connect(gameAudio.destination);
      effectsChannel.connect(gameAudio.destination);
    }
    if (gameAudio.state!=="running") gameAudio.resume().catch(()=>{});
    refreshAudio();
  } catch { /* A device without Web Audio still plays the game. */ }
}

function note(output,frequency,delay,length,volume,type="square",end=frequency,attack=.008) {
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
function refreshAudio() {
  if (!gameAudio) return;
  const time=gameAudio.currentTime;
  const musicPlaying=musicRequested && audioOptions.music;
  musicChannel.gain.setTargetAtTime(musicPlaying && !document.hidden ? audioVolume.music*.0018 : 0,time,.08);
  effectsChannel.gain.setTargetAtTime(audioOptions.effects ? audioVolume.effects*.0029 : 0,time,.02);
  if (musicPlaying && audioVolume.music>0 && !musicSource) {
    musicBuffer ??= chipLoop(gameAudio);
    musicSource=gameAudio.createBufferSource();
    musicSource.buffer=musicBuffer;
    musicSource.loop=true;
    musicSource.connect(musicChannel);
    musicSource.start();
  } else if (!musicPlaying && musicSource) {
    musicSource.stop(time+.16);
    musicSource=null;
  }
}
function playCue(kind,tier) {
  if (!gameAudio || !audioOptions.effects || !audioVolume.effects || document.hidden) return;
  if (gameAudio.state!=="running" && kind!=="click") return;
  if (kind==="click") {
    note(effectsChannel,670,0,.047,.23,"square",465,.003);
  } else if (kind==="find") {
    const reduced=window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const [first,second]=reduced ? [0,.08] : [.288,.72];
    note(effectsChannel,190,first,.07,.19,"square",100);
    note(effectsChannel,136,second,.09,.14,"square",76);
    const root=[392,494,587,698,330][tier] ?? 330;
    [1,1.25,1.5].forEach((ratio,index)=>note(effectsChannel,root*ratio,second+.08+index*.06,.09,.21-index*.03));
  } else if (kind==="finish") {
    [261.63,329.63,392,523.25].forEach((pitch,index)=>note(effectsChannel,pitch,index*.09,index===3 ? .32 : .13,.19));
  } else if (kind==="reject") {
    note(effectsChannel,247,0,.082,.18,"square",220);
    note(effectsChannel,147,.09,.12,.16,"square",111);
  } else if (kind==="skip") {
    note(effectsChannel,190,0,.12,.16,"triangle",66);
  } else if (kind==="round") {
    note(effectsChannel,349,0,.054,.12);
    note(effectsChannel,523,.065,.079,.12);
  }
}
function saveAudio() {
  try { localStorage.setItem(audioStorage,JSON.stringify({...audioOptions,volume:audioVolume})); }
  catch { /* Use current settings if storage is unavailable. */ }
}
function showAudioMenu() {
  const controls=element("div","");
  controls.className="audio-options";
  for (const key of Object.keys(audioOptions)) {
    const group=element("div","");
    group.className="audio-channel";
    const label=element("label",words()[key]);
    const toggle=element("input","");
    toggle.type="checkbox";
    toggle.checked=audioOptions[key];
    toggle.onchange=()=>{
      audioOptions[key]=toggle.checked;
      saveAudio();
      if (toggle.checked) activateAudio(key==="music");
      else refreshAudio();
    };
    label.prepend(toggle);
    const range=element("input","");
    range.type="range";
    range.id=`volume-${key}`;
    range.min="0";
    range.max="100";
    range.value=audioVolume[key];
    range.setAttribute("aria-label",words()[`${key}Volume`]);
    const value=element("output",`${range.value}%`);
    value.setAttribute("for",range.id);
    range.oninput=()=>{
      audioVolume[key]=Number(range.value);
      value.value=`${range.value}%`;
      if (audioOptions[key]) activateAudio(key==="music");
      else refreshAudio();
    };
    range.onchange=()=>{
      saveAudio();
      if (key==="effects") playCue("click");
    };
    group.append(label,range,value);
    controls.append(group);
  }
  modal(words().sound,controls);
}
function prepareAudio() {
  document.addEventListener("visibilitychange",refreshAudio);
  document.addEventListener("click",event=>{
    const button=event.target.closest?.("button");
    if (!button || button.disabled || !audioOptions.effects || !audioVolume.effects) return;
    activateAudio(false);
    playCue("click");
  },{capture:true});
}
