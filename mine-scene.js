"use strict";

// Distance is expressed in shaft coordinates and projected onto the current viewport.
class MineScene {
  static unitsPerPoint = 4.2;
  static rewards = [
    {minimum:55, inset:.14, glow:"#92dfb4", white:"#d6ffe3", particles:14},
    {minimum:85, inset:.19, glow:"#d8b3f3", white:"#f7e5ff", particles:20},
    {minimum:120,inset:.24, glow:"#ffc36f", white:"#fff0b8", particles:26}
  ];
  static palettes = [
    ["#1b292f","#263c42","#395055","#746557","#b9b991"],
    ["#1d252f","#363437","#51473f","#876651","#e6ae7a"],
    ["#222131","#373145","#544450","#936f83","#ead0ef"],
    ["#152932","#234047","#3e5853","#678e80","#b5e0c6"],
    ["#20283c","#313e58","#4a556c","#7786a5","#c9e3ff"],
    ["#241e35","#3e3350","#564663","#967cab","#d6c9f3"],
    ["#2e2233","#503a4c","#694850","#a67174","#f0bf9e"],
    ["#301d2a","#53332f","#754835","#bd7f54","#ffdba1"],
    ["#3b252b","#5c3b34","#785141","#c98a57","#ffe4a7"]
  ];

  constructor(canvas, depthThresholds) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d", {alpha:false});
    if (!this.context) return;
    this.thresholds = depthThresholds.map(points => points * MineScene.unitsPerPoint);
    this.motion = matchMedia("(prefers-reduced-motion: reduce)");
    this.position = 0;
    this.target = 0;
    this.lead = 0;
    this.zoom = 1;
    this.lift = this.loadImage("shaft-lift.png");
    this.fossil = this.loadImage("buried-fossil.png");
    new ResizeObserver(() => this.resizeCanvas()).observe(canvas);
    this.motion.addEventListener("change", () => {
      cancelAnimationFrame(this.frame);
      this.frameStep(performance.now());
    });
    this.resizeCanvas();
  }

  loadImage(file) {
    const image = new Image();
    image.addEventListener("load", () => this.render(performance.now()));
    image.src = new URL(`art/shaft/${file}`, document.baseURI).href;
    return image;
  }

  resizeCanvas() {
    const {width,height} = this.canvas.getBoundingClientRect();
    if (!width || !height) return;
    this.mobile = width <= 730;
    const pixel = this.mobile ? 1.65 : Math.max(1.85,width / 740);
    this.canvas.width = Math.ceil(width / pixel);
    this.canvas.height = Math.ceil(height / pixel);
    this.context.imageSmoothingEnabled = false;
    this.render(performance.now());
    this.requestFrame();
  }

  moveTo(points, animate) {
    if (!this.context) return;
    const target = points * MineScene.unitsPerPoint;
    if (target === this.target) return;
    const gained = Math.round((target-this.target)/MineScene.unitsPerPoint);
    const now = performance.now();
    this.updatePosition(now);
    this.target = target;
    const distance = target - this.position;
    if (animate && distance>0 && !this.motion.matches) {
      const reward = MineScene.rewards.findLast(tier => gained >= tier.minimum);
      const duration = Math.min(2350,590+Math.sqrt(distance)*74)+(reward ? 340 : 0);
      this.startJourney(now,duration,reward);
    } else {
      this.journey = null;
      this.position = target;
      this.lead = 0;
      this.zoom = 1;
    }
    this.render(now);
    this.requestFrame();
  }

  startJourney(started,duration,reward) {
    this.journey = {
      started,duration,reward,from:this.position,distance:this.target-this.position,
      fromLead:this.lead,fromZoom:this.zoom
    };
  }

  finishReveal() {
    if (!this.journey?.reward) return;
    const now = performance.now();
    this.updatePosition(now);
    if (this.journey) this.startJourney(now,440);
  }

  ease(value) {
    const t = Math.max(0,Math.min(1,value));
    return t*t*(3-2*t);
  }

  updatePosition(time) {
    if (!this.journey) return;
    const {from,started,duration,distance,reward,fromLead,fromZoom} = this.journey;
    const fraction = this.motion.matches ? 1 : Math.min(1,Math.max(0,(time-started)/duration));
    const progress = this.ease(reward ? (fraction-.12)/.73 : fraction);
    this.position = from + distance*progress;
    this.lead = fromLead*(1-this.ease(fraction/.34)) + Math.sin(Math.PI*progress)*Math.min(34,distance*.12);
    if (reward) {
      const wide = 1-reward.inset*(this.mobile ? .82 : 1);
      this.zoom = fromZoom+(wide-fromZoom)*this.ease(fraction/.32)+(1-wide)*this.ease((fraction-.71)/.29);
    } else {
      this.zoom = fromZoom+(1-fromZoom)*this.ease(fraction);
    }
    if (fraction === 1) {
      this.position = this.target;
      this.lead = 0;
      this.zoom = 1;
      this.journey = null;
    }
  }

  requestFrame() {
    if (this.frame || this.motion.matches) return;
    this.frame = requestAnimationFrame(time => this.frameStep(time));
  }

  frameStep(time) {
    this.frame = null;
    this.updatePosition(time);
    this.render(time);
    this.requestFrame();
  }

  hash(index,seed) {
    let value = Math.imul(index ^ seed,0x45d9f3b);
    value = Math.imul(value ^ (value >>> 16),0x45d9f3b);
    return ((value ^ (value >>> 16)) >>> 0)/4294967296;
  }

  ridge(value,span,seed) {
    const index = Math.floor(value/span);
    const fraction = value/span-index;
    const previous = this.hash(index,seed);
    return previous+(this.hash(index+1,seed)-previous)*fraction;
  }

  shape(color,points) {
    const ctx = this.context;
    ctx.beginPath();
    points.forEach(([x,y],index) => {
      if (index) ctx.lineTo(Math.round(x),Math.round(y));
      else ctx.moveTo(Math.round(x),Math.round(y));
    });
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
  }

  block(color,x,y,width,height) {
    this.context.fillStyle = color;
    this.context.fillRect(Math.round(x),Math.round(y),width,height);
  }

  glow(color,x,y,radius,strength) {
    const ctx = this.context;
    const light = ctx.createRadialGradient(x,y,1,x,y,radius);
    light.addColorStop(0,color);
    light.addColorStop(1,"transparent");
    ctx.globalAlpha = strength;
    ctx.fillStyle = light;
    ctx.fillRect(x-radius,y-radius,radius*2,radius*2);
    ctx.globalAlpha = 1;
  }

  paletteAt(depth) {
    const layer = Math.max(0,this.thresholds.findLastIndex(limit => depth>=limit));
    return MineScene.palettes[layer];
  }

  screenY(depth) {
    return (depth-this.cameraY)*this.scale;
  }

  wallEdge(depth,side) {
    const seed = side<0 ? 51 : 73;
    const gap = 58+this.ridge(depth,113,seed)*27+this.ridge(depth,29,seed+3)*9;
    return this.center + side*Math.round(gap/2)*2;
  }

  rows(spacing,draw,offset=0) {
    const first = Math.max(0,Math.floor((this.cameraY-offset)/spacing)-1);
    const last = Math.ceil((this.cameraY+this.viewHeight/this.scale-offset)/spacing)+1;
    for (let i=first;i<=last;i++) draw(i*spacing+offset,i);
  }

  earth(time) {
    const ctx = this.context;
    const width = this.viewWidth;
    const height = this.viewHeight;
    const palette = this.paletteAt(this.position);
    const darkness = ctx.createLinearGradient(0,0,0,height);
    darkness.addColorStop(0,palette[0]);
    darkness.addColorStop(1,"#0b1520");
    ctx.fillStyle = darkness;
    ctx.fillRect(0,0,width,height);
    this.rows(76,(depth,index) => {
      this.wall(depth,index,-1,time);
      this.wall(depth,index,1,time);
    });
  }

  wall(depth,index,side,time) {
    const ctx = this.context;
    const width = this.viewWidth;
    const height = this.viewHeight;
    const top = this.screenY(depth);
    const bottom = this.screenY(depth+76);
    if (bottom<0 || top>height) return;
    const outside = side<0 ? 0 : width;
    const [shadow,base,stone,edge,bright] = this.paletteAt(depth+38);
    const lip = [];
    for (let row=0;row<=76;row+=4) {
      lip.push([this.wallEdge(depth+row,side),this.screenY(depth+row)]);
    }
    this.shape(base,[[outside,top],...lip,[outside,bottom]]);
    const seam = depth+14 + this.hash(index,side+107)*32;
    const y = this.screenY(seam);
    const ledge = this.wallEdge(seam,side);
    const reach = 45+this.hash(index,side+94)*58;
    this.shape(shadow,[[outside,y-23],[ledge+side*reach,y-19],[ledge+side*35,y-1],[ledge,y+7],[ledge+side*8,y+14],[ledge+side*51,y+11],[outside,y+30]]);
    ctx.globalAlpha = .6;
    this.shape(stone,[[outside,y-23],[ledge+side*reach,y-19],[ledge+side*35,y-1],[ledge,y+7],[ledge+side*15,y-5],[ledge+side*38,y-9],[outside,y-32]]);
    ctx.globalAlpha = 1;
    this.shape(stone,[...lip,...lip.map(([x,y])=>[x+side*8,y]).reverse()]);
    this.wallTexture(depth,index,side,shadow,stone,edge);
    ctx.globalAlpha = 1;
    if ((index+Number(side>0))%4===1 && depth>76) {
      const x = ledge+side*(21+this.hash(index,99)*15);
      const rise = 8+Math.round(this.hash(index,212)*10);
      this.shape(shadow,[[x-7,y+9],[x-5,y-2],[x+2,y-rise-4],[x+7,y-3],[x+9,y+8]]);
      this.shape(edge,[[x-5,y+6],[x-4,y-2],[x+2,y-rise],[x+2,y+2],[x,y+8]]);
      this.shape(stone,[[x+2,y-rise],[x+6,y-3],[x+7,y+7],[x,y+8],[x+2,y+2]]);
      this.block(bright,x+1,y-3,1,5);
      this.glow(bright,x,y,19,.12);
    }
    const fossil = this.fossil;
    if (side<0 && index%14===6 && fossil?.complete && fossil.naturalWidth) {
      ctx.globalAlpha = .47;
      ctx.drawImage(fossil,Math.round(ledge-66),Math.round(y-18),56,38);
      ctx.globalAlpha = 1;
    }
    if (depth>=76 && (index+Number(side<0)*2)%4===0) {
      this.alcove(ledge+side*32,y,index,side,time);
    }
  }

  wallTexture(depth,index,side,shadow,stone,edge) {
    const ctx = this.context;
    const detailCount = this.mobile ? 18 : 26;
    for (let j=0;j<detailCount;j++) {
      const seed = index*37+j;
      const worldY = depth+this.hash(seed,side+91)*73;
      const x = this.wallEdge(worldY,side)+side*(10+this.hash(seed,side+43)*Math.min(184,this.canvas.width*.56));
      const y = this.screenY(worldY);
      const length = 2+Math.floor(this.hash(seed,side+124)*9);
      ctx.globalAlpha = .21+this.hash(seed,side+38)*.24;
      this.block(j%3===0 ? edge : shadow,x,y,length,j%5===0 ? 2 : 1);
      if (j%4===0) this.block(stone,x-2,y+3,length*.7,1);
      if (j%9===0) {
        this.shape(edge,[[x-9,y+3],[x-4,y-3],[x+1,y-5],[x+13,y-6],[x+4,y-4],[x,y-3],[x-3,y]]);
        this.block(shadow,x+1,y-4,13,1);
      }
    }
    ctx.globalAlpha = 1;
  }

  alcove(x,y,index,side,time) {
    const ctx = this.context;
    const warm = index%3===0;
    const moss = warm ? "#877652" : "#4a7063";
    const herb = warm ? "#c9a567" : "#8eb58a";
    this.shape("#17252b",[[x-27,y+5],[x-24,y-8],[x-17,y-13],[x+12,y-13],[x+22,y-7],[x+26,y+5],[x+17,y+9],[x-19,y+10]]);
    this.shape(moss,[[x-27,y+6],[x-17,y+4],[x+19,y+4],[x+27,y+6],[x+18,y+10],[x-20,y+10]]);
    this.block(herb,x-15,y+5,7,1);
    this.block(herb,x+10,y+5,11,1);
    for (const [dx,stem] of [[-21,5],[-16,8],[16,8],[23,4]]) {
      this.block(moss,x+dx,y-stem+5,1,stem+2);
      this.block(herb,x+dx-2,y-stem+4,5,2);
    }

    const t = time/2700+index*.81+side;
    const direction = Math.cos(t)>=0 ? 1 : -1;
    const head = x+Math.sin(t)*13;
    const wriggle = time/370+index;
    const headY = y+Math.sin(wriggle)*.95-1;
    for (let j=4;j>=0;j--) {
      const segmentX = x+Math.sin(t-j*.22)*13;
      const segmentY = y+Math.sin(wriggle-j*.82)*.95-(j===0 ? 1 : 0);
      this.block("#233637",segmentX-2,segmentY,5,5);
      this.block(j%2 ? moss : herb,segmentX-2,segmentY,4,3);
      this.block("#e0dc9f",segmentX-1,segmentY,2,1);
    }
    this.block("#1e3535",head+direction,headY+1,1,1);

    for (let j=0;j<2;j++) {
      const orbit = time/(1800+j*520)+index+j*1.6;
      const px = x+Math.sin(orbit)*13+(j-1)*8;
      const py = y-10+Math.cos(orbit*.83)*4;
      const shine = .21+.29*(.5+.5*Math.sin(time/510+index+j));
      this.glow(herb,px,py,6,shine*.36);
      ctx.globalAlpha = shine;
      this.block("#e1d79b",px,py,1,1);
    }
    ctx.globalAlpha = 1;
  }

  driftingDust(time) {
    const ctx = this.context;
    this.rows(39,(depth,index)=>{
      if (depth<30) return;
      for (let j=0;j<3;j++) {
        const seed = index*3+j;
        const x = this.center+(this.hash(seed,85)-.5)*155+Math.sin(time/2500+seed)*5;
        const y = this.screenY(depth+this.hash(seed,42)*31)+Math.sin(time/1750+seed)*4;
        ctx.globalAlpha = .16 + (.5+.5*Math.sin(time/930+seed))*.2;
        this.block(j%3 ? "#91a9a6" : "#d3ad7d",x,y,j===0 ? 1.5 : 1,1);
      }
    },14);
    ctx.globalAlpha = 1;
  }

  surface(time) {
    const ctx = this.context;
    const width = this.viewWidth;
    const height = this.viewHeight;
    const ground = this.screenY(0);
    if (ground< -9) return;
    const sky = ctx.createLinearGradient(0,0,0,Math.max(1,ground));
    sky.addColorStop(0,"#102637");
    sky.addColorStop(1,"#3a5456");
    ctx.fillStyle = sky;
    ctx.fillRect(0,0,width,ground+3);
    const moonX = this.center-81;
    const moonY = ground-98*this.scale;
    this.glow("#e4c58a",moonX,moonY,34,.16);
    this.shape("#dfc899",[[moonX-7,moonY-6],[moonX-4,moonY-9],[moonX+6,moonY-7],[moonX+9,moonY-2],[moonX+7,moonY+5],[moonX+1,moonY+8],[moonX-5,moonY+6],[moonX-9,moonY+1]]);
    for (let i=0;i<33;i++) {
      const x = this.hash(i,182)*width;
      const y = ground-(10+this.hash(i,181)*height*.7);
      ctx.globalAlpha = .18+this.hash(i,147)*.48;
      this.block("#e4d6b1",x,y,i%9===0 ? 2 : 1,1);
    }
    ctx.globalAlpha = 1;
    for (const [index,color] of ["#2d4652","#243c47","#1b323c"].entries()) {
      const peaks = [];
      for (let x=-6;x<=width+6;x+=6) {
        const amplitude = (this.ridge(x,81,44+index*91)+this.ridge(x,25,23+index*19)*.28);
        peaks.push([x,ground-(12+amplitude*(47-index*7))*this.scale]);
      }
      this.shape(color,[...peaks,[width+6,ground+6],[-6,ground+6]]);
    }
    for (let i=0;i<Math.ceil(width/21);i++) {
      const x = i*21+this.hash(i,109)*11;
      const y = ground-2;
      const size = 5+this.hash(i,210)*15;
      if (Math.abs(x-this.center)>64) {
        this.shape("#1c3039",[[x,y-size],[x-4,y-size*.48],[x-2,y-size*.48],[x-7,y],[x+7,y],[x+3,y-size*.48],[x+4,y-size*.48]]);
      }
    }
    const left = this.wallEdge(0,-1);
    const right = this.wallEdge(0,1);
    this.platform(left-66,ground,66);
    this.platform(right,ground,65);
    this.beamFrame(this.center,ground-35,96);
    this.flame(left-18,ground-13,time,17);
    this.flame(right+16,ground-13,time,23);
  }

  platform(x,y,width) {
    this.block("#201e24",x,y,width,10);
    this.block("#6e5547",x,y,width,6);
    this.block("#b08a63",x,y,width,2);
    this.block("#3e3432",x,y+7,width,2);
    for (let step=3;step<width;step+=9) this.block("#8d6850",x+step,y+2,1,4);
  }

  beamFrame(x,y,width) {
    this.block("#182128",x-width/2-3,y-6,width+6,12);
    this.block("#58463d",x-width/2,y-3,width,6);
    this.block("#977659",x-width/2+2,y-4,width-4,2);
    for (const side of [-1,1]) {
      const post = x+side*(width/2-4);
      this.block("#1a2227",post-5,y,10,38);
      this.block("#655247",post-2,y,4,34);
      this.block("#ae8965",post+1,y+5,1,24);
    }
  }

  rails(time) {
    const height = this.viewHeight;
    const x = this.center;
    const start = Math.max(0,this.screenY(-34));
    const leg = 42;
    this.rows(56,(depth,index)=>{
      const y = this.screenY(depth);
      if (y< -16 || y>height+16) return;
      this.block("#18242a",x-leg-15,y-3,leg*2+30,7);
      this.block("#514c44",x-leg-13,y-2,leg*2+26,4);
      this.block("#8b7257",x-leg-11,y-2,leg*2+22,1);
      for (const side of [-1,1]) {
        const guide = x+side*leg;
        const rock = this.wallEdge(depth,side)+side*6;
        this.shape("#2e2c2f",[[guide,y-4],[rock,y-8],[rock,y-1],[guide,y+4]]);
        this.block("#aa8965",guide,y-4,3,3);
        const joint = guide+(rock-guide)*.64;
        this.block("#484340",joint-2,y-5,4,4);
        this.block("#897259",joint-1,y-4,2,1);
      }
      if (index%2===1) {
        const side = index%4===1 ? -1 : 1;
        const tx = this.wallEdge(depth,side)+side*4;
        this.flame(tx,y-8,time,index);
      }
    });
    for (const side of [-1,1]) {
      const guide = x+side*leg;
      const length = Math.max(0,height-start+1);
      this.block("#17252c",guide-4,start,8,length);
      this.block("#495b5a",guide-2,start,4,length);
      this.block("#a59172",guide+1,start,1,length);
    }
  }

  flame(x,y,time,index) {
    const ctx = this.context;
    const pulse = .78+Math.sin(time/115+index*2)*.13+Math.sin(time/67+index*3)*.08;
    this.glow("#ff8c43",x,y,37+pulse*8,.22+pulse*.32);
    this.block("#21252b",x-4,y+4,8,7);
    this.block("#925945",x-2,y+3,4,5);
    const bend = Math.round(Math.sin(time/151+index)*2);
    const tip = 5+Math.round(pulse*3);
    this.shape("#c85536",[[x-4,y+2],[x-4,y-3],[x+bend,y-tip-1],[x+4,y-3],[x+4,y+2],[x,y+4]]);
    this.shape("#ffb25a",[[x-2,y+2],[x-3,y-2],[x+bend,y-tip],[x+2,y-3],[x+3,y+1],[x,y+3]]);
    this.block("#ffe5a6",x-1,y-3,2,4);
    if (this.motion.matches) return;
    for (let i=0;i<3;i++) {
      const age = (time/1150+this.hash(index*3+i,77))%1;
      ctx.globalAlpha = (1-age)*.8;
      this.block("#fbbb70",x+(i-1)*8*age+bend,y-5-age*15,1,1);
    }
    ctx.globalAlpha = 1;
  }

  rewardLight(time) {
    const journey = this.journey;
    if (!journey?.reward) return;
    const ctx = this.context;
    const {started,duration,reward} = journey;
    const progress = (time-started)/duration;
    const shine = this.ease(progress/.23)*(1-this.ease((progress-.65)/.35));
    const x = this.center;
    const y = this.screenY(this.position)-7;
    this.glow(reward.glow,x,y,130,shine*.28);
    this.glow(reward.white,x,y-22,51,shine*.18);
    for (let i=0;i<reward.particles;i++) {
      const age = (progress-.06-this.hash(i,131)*.32)/.6;
      if (age<0 || age>=1) continue;
      const side = i%2 ? 1 : -1;
      const spread = .43+this.hash(i,115)*.57;
      const sx = x+side*(18+this.ease(age)*spread*111);
      const sy = y+(this.hash(i,117)-.53)*37-age*(22+spread*57)+age*age*16;
      const alpha = this.ease(age/.13)*(1-this.ease((age-.48)/.52));
      ctx.globalAlpha = alpha*.89;
      if (i%5===0) {
        this.block(reward.glow,sx-1,sy-4,2,8);
        this.block(reward.glow,sx-4,sy-1,8,2);
        this.block(reward.white,sx-1,sy-1,2,2);
      } else {
        this.shape(i%3 ? reward.glow : reward.white,[[sx,sy-3],[sx+2,sy],[sx,sy+3],[sx-2,sy]]);
      }
    }
    ctx.globalAlpha = 1;
  }

  drawLift(time) {
    const ctx = this.context;
    const x = this.center;
    const y = this.screenY(this.position);
    const rocking = this.motion.matches ? 0 : Math.sin(time/385)*.013;
    const speed = this.journey ? Math.sin(Math.PI*(time-this.journey.started)/this.journey.duration) : 0;
    const lean = rocking + Math.sin(this.position*.26)*.008*Math.max(0,speed);
    const cableStart = Math.max(0,this.screenY(-34));
    const cableLength = Math.max(0,y-18-cableStart);
    this.block("#151d23",x-10,cableStart,3,cableLength);
    this.block("#a58a63",x-9,cableStart,1,cableLength);
    this.block("#4c493e",x+8,cableStart,2,cableLength);
    const cone = ctx.createLinearGradient(x,y-18,x+25,y+93);
    cone.addColorStop(0,"#ffdda667");
    cone.addColorStop(1,"#e7aa5900");
    this.shape(cone,[[x-3,y-18],[x+7,y-14],[x+60,y+91],[x-35,y+91]]);
    this.glow("#ffbf70",x,y-17,36,.27);
    this.glow("#efb87b",x+9,y+32,44,.2);
    for (const side of [-1,1]) {
      const shoe = x+side*42;
      this.block("#131f27",shoe-4,y+7,8,20);
      this.block("#8b876f",shoe-3,y+9,6,16);
      for (const offset of [10,21]) {
        this.block("#c2aa7a",shoe-2,y+offset,4,3);
      }
    }
    if (speed>.33) {
      for (let i=0;i<6;i++) {
        const age = (time/400+i/6)%1;
        ctx.globalAlpha = speed*.73*(1-age);
        this.block(i%2 ? "#f4ae68" : "#ffda92",x+(i%2 ? -42 : 42)+(i-2)*age*4,y+23-age*(17+i*5),1,2);
      }
      ctx.globalAlpha = 1;
    }
    ctx.save();
    ctx.translate(x,y);
    ctx.rotate(lean);
    if (this.lift.complete && this.lift.naturalWidth) ctx.drawImage(this.lift,-44,-30);
    ctx.restore();
  }

  render(time) {
    const {width,height} = this.canvas;
    if (!width || !height) return;
    const zoom = this.zoom;
    this.viewWidth = width/zoom;
    this.viewHeight = height/zoom;
    this.center = Math.round(this.viewWidth*(this.mobile ? .459 : .261));
    this.scale = height/300;
    this.cameraY = this.position-this.viewHeight*(this.mobile ? .545 : .575)/this.scale-this.lead;
    const now = this.motion.matches ? 0 : time;
    this.context.save();
    this.context.scale(zoom,zoom);
    this.earth(now);
    this.surface(now);
    this.rails(now);
    this.driftingDust(now);
    this.rewardLight(now);
    this.drawLift(now);
    this.context.restore();
  }
}
