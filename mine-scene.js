"use strict";

// Distance is expressed in shaft coordinates and projected onto the current viewport.
class MineScene {
  static unitsPerPoint = 4.2;
  static finds = [
    {minimum:10, inset:0,    stone:"#657d79", light:"#c1d2bb", core:"#eef3d5", size:7,  shards:5},
    {minimum:25, inset:0,    stone:"#a47855", light:"#e7ba83", core:"#ffdfa7", size:10, shards:9},
    {minimum:55, inset:.27,  stone:"#348778", light:"#87dfc4", core:"#ddffdb", size:15, shards:16},
    {minimum:85, inset:.35,  stone:"#7861a6", light:"#c6a0f7", core:"#f3e3ff", size:19, shards:24},
    {minimum:120,inset:.43,  stone:"#b7753d", light:"#ffd078", core:"#fff4bc", size:23, shards:33}
  ];
  static impact = .71;
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
      const find = MineScene.finds.findLast(tier => gained >= tier.minimum);
      const duration = Math.min(3500, 1130+Math.sqrt(distance)*75+(find?.inset ? 510 : 0));
      this.startJourney(now,duration,find);
    } else {
      this.journey = null;
      this.position = target;
      this.lead = 0;
      this.zoom = 1;
    }
    this.render(now);
    this.requestFrame();
  }

  startJourney(started,duration,find) {
    this.journey = {
      started,duration,find,from:this.position,distance:this.target-this.position,
      fromLead:this.lead,fromZoom:this.zoom
    };
  }

  afterJourney(action) {
    if (this.journey) this.journey.onArrival = action;
    else action();
  }

  ease(value) {
    const t = Math.max(0,Math.min(1,value));
    return t*t*(3-2*t);
  }

  updatePosition(time) {
    if (!this.journey) return;
    const {from,started,duration,distance,find,fromLead,fromZoom} = this.journey;
    const fraction = this.motion.matches ? 1 : Math.min(1,Math.max(0,(time-started)/duration));
    const progress = this.travelProgress(fraction,find);
    this.position = from + distance*progress;
    this.lead = fromLead*(1-this.ease(fraction/.34)) + Math.sin(Math.PI*progress)*Math.min(34,distance*.12);
    if (find?.inset) {
      const wide = 1-find.inset*(this.mobile ? .88 : 1);
      this.zoom = fromZoom+(wide-fromZoom)*this.ease(fraction/.28)+(1-wide)*this.ease((fraction-.77)/.23);
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

  travelProgress(fraction,find) {
    const starting = find?.inset ? .09 : .02;
    return this.ease((fraction-starting)/(.54-starting));
  }

  requestFrame() {
    if (this.frame || this.motion.matches) return;
    this.frame = requestAnimationFrame(time => this.frameStep(time));
  }

  frameStep(time) {
    this.frame = null;
    const journey = this.journey;
    this.updatePosition(time);
    this.render(time);
    if (!this.journey) journey?.onArrival?.();
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

  trace(points) {
    const ctx = this.context;
    ctx.beginPath();
    points.forEach(([x,y],index) => {
      if (index) ctx.lineTo(Math.round(x),Math.round(y));
      else ctx.moveTo(Math.round(x),Math.round(y));
    });
    ctx.closePath();
  }

  shape(color,points) {
    const ctx = this.context;
    this.trace(points);
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

  layerAt(depth) {
    return Math.max(0,this.thresholds.findLastIndex(limit => depth>=limit));
  }

  transitionRadius(layer) {
    const boundary = this.thresholds[layer];
    const above = boundary-this.thresholds[layer-1];
    const below = (this.thresholds[layer+1] ?? Infinity)-boundary;
    return Math.min(76,above*.38,below*.38);
  }

  paletteAt(depth) {
    const layer = this.layerAt(depth);
    const nearPrevious = layer>0 && depth<this.thresholds[layer]+this.transitionRadius(layer);
    const next = nearPrevious ? layer : layer+1;
    if (next>=this.thresholds.length) return MineScene.palettes[layer];
    const radius = this.transitionRadius(next);
    const start = this.thresholds[next]-radius;
    if (depth<=start) return MineScene.palettes[layer];
    const mix = this.ease((depth-start)/(2*radius));
    return MineScene.palettes[next-1].map((color,index) => {
      const nextColor = MineScene.palettes[next][index];
      const channels = [1,3,5].map(channel => {
        const a = Number.parseInt(color.slice(channel,channel+2),16);
        const b = Number.parseInt(nextColor.slice(channel,channel+2),16);
        return Math.round(a+(b-a)*mix);
      });
      return `rgb(${channels.join(",")})`;
    });
  }

  wallPaint() {
    const ctx = this.context;
    const top = this.cameraY;
    const span = this.viewHeight/this.scale;
    const stops = [0,1];
    for (let layer=1;layer<this.thresholds.length;layer++) {
      const center = this.thresholds[layer];
      const radius = this.transitionRadius(layer);
      for (const blend of [-1,-.66,-.33,0,.33,.66,1]) {
        const offset = (center+radius*blend-top)/span;
        if (offset>0 && offset<1) stops.push(offset);
      }
    }
    const gradients = Array.from({length:3},() => ctx.createLinearGradient(0,0,0,this.viewHeight));
    for (const offset of stops.sort((a,b)=>a-b)) {
      const palette = this.paletteAt(top+offset*span);
      gradients.forEach((gradient,i) => gradient.addColorStop(offset,palette[i]));
    }
    return gradients;
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
    const paint = this.wallPaint();
    ctx.fillStyle = paint[0];
    ctx.fillRect(0,0,width,height);
    const darkness = ctx.createLinearGradient(0,0,0,height);
    darkness.addColorStop(0,"#0b152000");
    darkness.addColorStop(1,"#0b1520");
    ctx.fillStyle = darkness;
    ctx.fillRect(0,0,width,height);
    const core = this.screenY(this.thresholds.at(-1));
    const coreFade = this.ease((height+45-core)/145);
    if (coreFade>0) {
      const coreLight = (.55+Math.sin(time/1700)*.12)*coreFade;
      this.glow("#dd834e",this.center,Math.max(0,core)+86,154,coreLight);
    }
    for (const side of [-1,1]) this.drawWall(side,time,paint);
  }

  drawWall(side,time,paint) {
    const ctx = this.context;
    const start = Math.max(0,Math.floor(this.cameraY/4)*4);
    const end = Math.ceil((this.cameraY+this.viewHeight/this.scale)/4)*4;
    if (start>=end) return;
    const outside = side<0 ? 0 : this.viewWidth;
    const lip = [];
    for (let depth=start;depth<=end;depth+=4) {
      lip.push([this.wallEdge(depth,side),this.screenY(depth)]);
    }
    ctx.save();
    this.trace([[outside,this.screenY(start)],...lip,[outside,this.screenY(end)]]);
    ctx.clip();
    ctx.fillStyle = paint[1];
    ctx.fillRect(0,0,this.viewWidth,this.viewHeight);
    this.shape(paint[2],[...lip,...lip.map(([x,y])=>[x+side*8,y]).reverse()]);
    this.rows(76,(depth,index)=>this.wallDetails(depth,index,side,time,paint));
    ctx.restore();
  }

  wallDetails(depth,index,side,time,paint) {
    const ctx = this.context;
    if (this.screenY(depth+76)<-40 || this.screenY(depth)>this.viewHeight+40) return;
    const outside = side<0 ? 0 : this.viewWidth;
    const seam = depth+14 + this.hash(index,side+107)*32;
    const palette = this.paletteAt(seam);
    const [shadow,,stone,edge,bright] = palette;
    const y = this.screenY(seam);
    const ledge = this.wallEdge(seam,side);
    const reach = 45+this.hash(index,side+94)*58;
    ctx.globalAlpha = .78;
    this.shape(paint[0],[[outside,y-23],[ledge+side*reach,y-19],[ledge+side*35,y-1],[ledge,y+7],[ledge+side*8,y+14],[ledge+side*51,y+11],[outside,y+30]]);
    ctx.globalAlpha = .5;
    this.shape(paint[2],[[outside,y-23],[ledge+side*reach,y-19],[ledge+side*35,y-1],[ledge,y+7],[ledge+side*15,y-5],[ledge+side*38,y-9],[outside,y-32]]);
    ctx.globalAlpha = 1;
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
    if ((index+Number(side>0)*5)%13===6 && this.layerAt(depth)<4 && fossil?.complete && fossil.naturalWidth) {
      ctx.globalAlpha = .47;
      ctx.drawImage(fossil,Math.round(ledge+(side<0 ? -66 : 10)),Math.round(y-18),56,38);
      ctx.globalAlpha = 1;
    }
    if (depth>0 && (index+Number(side<0)*2)%3===0) {
      const inset = 13+this.hash(index,side+33)*18;
      this.decorateRock(seam,ledge+side*inset,y,index,side,time,palette);
    }
    if (this.layerAt(seam)===8) {
      const crust = Math.min(96,reach);
      this.shape("#966044",[[ledge+side*9,y+34],[ledge+side*26,y+28],[ledge+side*crust,y+31],[ledge+side*(crust+61),y+26],[ledge+side*(crust+72),y+30],[ledge+side*crust,y+34],[ledge+side*28,y+31]]);
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

  decorateRock(depth,x,y,index,side,time,palette) {
    const layer = this.layerAt(depth);
    const ctx = this.context;
    const choice = this.hash(index,side+73);
    ctx.save();
    ctx.translate(x,y);
    ctx.scale(side,1);
    if (layer===0 || (layer===1 && choice>.25)) this.rootVein(index,time);
    else if (layer<=2 || (layer===3 && choice>.7)) this.dripstone(index,time,palette);
    else if (layer<=5) this.mineralPocket(index,time,palette,choice);
    else this.heatFissure(index,time,layer===8);
    ctx.restore();
  }

  rootVein(index,time) {
    const reach = 36+this.hash(index,74)*15;
    this.shape("#303630",[[0,-15],[9,-12],[16,-3],[reach,-1],[reach-9,5],[21,5],[10,-2]]);
    this.shape("#816955",[[0,-17],[13,-12],[23,-4],[reach,-4],[reach-2,-1],[20,0],[9,-10]]);
    this.shape("#5a6b4f",[[4,-9],[13,-7],[20,0],[reach,-2],[reach-7,4],[18,4],[9,-4]]);
    for (const [dx,stem] of [[13,6],[reach-12,8],[reach-6,3]]) {
      this.block("#638065",dx,1-stem,1,stem);
      this.block("#a6b67d",dx-2,1-stem,5,1);
    }
    const clock = time/2750+index*.82;
    const glint = time/440+index;
    for (let segment=4;segment>=0;segment--) {
      const x = 22+Math.sin(clock-segment*.23)*10;
      const y = Math.sin(glint-segment*.7)*1.2;
      this.block("#344d47",x-2,y-4,5,4);
      this.block(segment%2 ? "#83a47c" : "#aec285",x-2,y-4,4,2);
      if (!segment) this.block("#273835",x+Math.sign(Math.cos(clock)),y-4,1,1);
    }
    const px = reach-8+Math.cos(time/1900+index)*7;
    const py = -11+Math.sin(time/1600+index)*4;
    const shine = .36+.28*Math.sin(time/620+index);
    this.glow("#c6ce92",px,py,7,shine*.5);
    const ctx = this.context;
    ctx.globalAlpha = shine;
    this.block("#e7e1b1",px,py,1,1);
    ctx.globalAlpha = 1;
  }

  dripstone(index,time,palette) {
    const [shadow,base,stone,edge] = palette;
    const width = 36 + Math.floor(this.hash(index,134)*13);
    const ctx = this.context;

    ctx.globalAlpha = .79;
    this.shape(shadow,[[1,-13],[7,-19],[19,-24],[width-8,-22],[width,-15],
      [width-6,-11],[width-2,-4],[width-10,5],[28,9],[12,12],[3,6],[7,-2]]);
    ctx.globalAlpha = 1;
    this.shape(stone,[[1,-13],[7,-19],[19,-24],[width-8,-22],[width,-15],
      [width-11,-18],[20,-18],[10,-13],[4,-6]]);
    this.shape(base,[[3,6],[11,5],[16,7],[26,4],[width-9,1],[width-2,-4],
      [width-10,5],[28,9],[12,12]]);

    const mainTip = -2 + Math.floor(this.hash(index,58)*4);
    const rightTip = -8-Math.floor(this.hash(index,108)*6);
    for (const [x,top,tip,half,lean] of [[12,-17,-10,4,-2],[22,-19,mainTip,6,1],[34,-18,rightTip,5,3]]) {
      this.shape(stone,[[x-half,top],[x+half,top-1],[x+half-1,top+5],[x+lean,tip],
        [x+lean-2,tip-2],[x-3,top+7]]);
      ctx.globalAlpha = .52;
      this.shape(edge,[[x-3,top],[x,top],[x+lean,tip],[x+lean-2,tip-2],[x-1,top+6]]);
      ctx.globalAlpha = 1;
    }

    ctx.globalAlpha = .57;
    this.block(edge,11,7,5,1);
    this.block(edge,21,6,4,1);
    this.block(stone,30,5,5,1);
    ctx.globalAlpha = 1;
    const phase = (time/1850+this.hash(index,111))%1;
    if (phase<.32) {
      ctx.globalAlpha = .72*(1-this.ease(phase/.32));
      const y = mainTip+1+((phase/.32)**2)*(6-mainTip);
      this.block("#a2c1ba",23,y,1,2);
      ctx.globalAlpha = 1;
    }
  }

  mineralPocket(index,time,palette,choice) {
    const [shadow,base,stone,edge,bright] = palette;
    if (choice<.43) {
      this.shape(shadow,[[1,-5],[14,-15],[30,-11],[45,-14],[49,-3],[43,10],[26,12],[8,7]]);
      this.shape(edge,[[7,-2],[14,-10],[27,-7],[43,-10],[43,-1],[38,6],[25,7],[10,4]]);
      this.shape(base,[[13,-2],[24,-5],[40,-7],[36,3],[25,5],[17,3]]);
      this.shape(bright,[[20,1],[26,-4],[35,-4],[30,2]]);
    } else {
      for (const [x,tip,height,width] of [[10,7,14,6],[23,19,23,8],[37,41,17,7]]) {
        const y = 7+this.hash(index+x,81)*5;
        this.shape(shadow,[[x-width,y],[tip-4,y-height],[tip+3,y-height],[x+width,y-3],[x+4,y+4]]);
        this.shape(edge,[[x-width+2,y],[tip-1,y-height+2],[tip+1,y-height+2],[x+1,y+1]]);
        this.shape(stone,[[tip+1,y-height+2],[x+width-1,y-3],[x+4,y+3],[x+1,y+1]]);
      }
    }
    const glow = .5+.5*Math.sin(time/870+index*1.7);
    const x = choice<.43 ? 29 : 22;
    const y = choice<.43 ? -2 : -11;
    this.glow(bright,x,y,18,glow*.26);
    if (glow>.54) {
      const ctx = this.context;
      ctx.globalAlpha = (glow-.54)*1.6;
      this.block(bright,x-2,y,5,1);
      this.block(bright,x,y-2,1,5);
      ctx.globalAlpha = 1;
    }
  }

  heatFissure(index,time,core) {
    const far = (core ? 65 : 45)+this.hash(index,29)*20;
    const glow = core ? "#ffcf79" : "#e6844f";
    const pulse = .58+.27*Math.sin(time/980+index);
    this.shape(core ? "#824d3e" : "#643d39",[[1,1],[13,-5],[24,-2],[36,-11],[far,-12],[far-4,-5],[40,-4],[28,6],[14,4]]);
    this.shape(glow,[[1,0],[14,-3],[25,0],[36,-8],[far-2,-10],[far-5,-8],[38,-6],[25,3],[14,-1]]);
    this.glow(glow,25,0,core ? 49 : 33,pulse*.36);
    const ctx = this.context;
    for (let j=0;j<(core ? 7 : 4);j++) {
      const phase = (time/(1100+j*100)+this.hash(index*8+j,51))%1;
      const x = 12+this.hash(index*8+j,88)*27+Math.sin(phase*4+j)*6;
      ctx.globalAlpha = (1-phase)*pulse;
      this.block(glow,x,-3-phase*(16+j*3),j%3===0 ? 2 : 1,1);
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

  miningFrame(time) {
    const find = this.journey?.find;
    if (!find) return null;
    const phase = (time-this.journey.started)/this.journey.duration;
    return {find,phase,x:this.center+72,y:this.screenY(this.target)-5};
  }

  drawVein(frame) {
    const {x,y,find,phase} = frame;
    if (y>this.viewHeight+45 || y< -45) return;
    const wall = Math.max(x+4,this.wallEdge(this.target,1));
    const width = find.size;
    const breaking = this.ease((phase-MineScene.impact)/.1);
    const ctx = this.context;
    ctx.save();
    ctx.globalAlpha = 1-this.ease((phase-.91)/.09);
    this.shape("#212a2d",[[x-3,y+13],[x+7,y-10],[wall+11,y-18],[wall+18,y+11],[x+6,y+19]]);
    this.shape("#4c514c",[[x-2,y+9],[x+10,y-8],[wall+11,y-15],[wall+7,y-2],[x+7,y+12]]);
    this.block(find.stone,x-3,y+4,11,3);
    ctx.restore();
    if (breaking>=1) return;
    const light = (1-breaking)*this.ease((phase-.17)/.38);
    this.glow(find.light,x,y,22+width*1.3,light*.44);
    ctx.save();
    ctx.translate(x,y);
    ctx.scale(1-.3*breaking,1-.59*breaking);
    ctx.globalAlpha = 1-breaking;
    this.shape(find.stone,[[-10,0],[-4,-width],[5,-width*.7],[8,-4],[5,9],[-4,7]]);
    this.shape(find.light,[[-10,0],[-4,-width],[-1,-width*.72],[-2,3],[-4,7]]);
    this.shape(find.core,[[-10,0],[-4,-width],[-3,-width*.64],[-6,0]]);
    if (find.minimum>=25) {
      this.shape(find.stone,[[0,2],[7,-width*.85],[14,-width*.55],[13,7],[7,11]]);
      this.shape(find.light,[[4,4],[7,-width*.85],[10,-width*.52],[8,5]]);
    }
    if (find.inset) {
      this.shape(find.core,[[2,-3],[5,-12],[8,-5],[5,1]]);
    }
    if (find.minimum===120) {
      this.shape(find.light,[[2,-width],[9,-width-6],[14,-width+1],[9,-width+5]]);
      this.block(find.core,8,-width,3,2);
    }
    ctx.restore();
  }

  drawPickaxe(frame) {
    const {x,y,phase} = frame;
    if (phase<.45 || phase>=.96) return;
    const liftY = this.screenY(this.position);
    const ctx = this.context;
    const reach = 34;
    const angleAtImpact = -.26;
    const poses = [
      [.45,20,13,1.18], [.54,22,1,-.75], [.63,16,-16,-1.91],
      [MineScene.impact,x-10-this.center-reach*Math.cos(angleAtImpact),y-liftY-reach*Math.sin(angleAtImpact),angleAtImpact],
      [.78,27,5,.04], [.89,22,5,.7], [.96,20,13,1.18]
    ];
    const next = poses.findIndex(([time])=>time>phase);
    const first = poses[next-1];
    const second = poses[next];
    const t = this.ease((phase-first[0])/(second[0]-first[0]));
    const [handX,handY,angle] = first.slice(1).map((value,index)=>value+(second[index+1]-value)*t);
    const wristX = this.center+handX;
    const wristY = liftY+handY;
    const shoulderX = this.center+13;
    const shoulderY = liftY+4;
    const elbowX = shoulderX+(wristX-shoulderX)*.62+3;
    const elbowY = shoulderY+(wristY-shoulderY)*.63+5;
    const opacity = this.ease((phase-.45)/.065)*(1-this.ease((phase-.891)/.069));
    ctx.save();
    ctx.globalAlpha = opacity;
    ctx.lineJoin = "round";
    for (const [color,width] of [["#192528",7],["#a8654d",5],["#ddab75",2]]) {
      ctx.beginPath();
      ctx.moveTo(shoulderX,shoulderY);
      ctx.lineTo(elbowX,elbowY);
      ctx.lineTo(wristX,wristY);
      ctx.strokeStyle = color;
      ctx.lineWidth = width;
      ctx.stroke();
    }
    ctx.translate(wristX,wristY);
    ctx.rotate(angle);
    this.block("#293036",-7,-2,36,4);
    this.block("#98684a",-6,-1,35,2);
    this.block("#e4b47a",-4,-1,32,1);
    this.shape("#344147",[[23,-3],[26,-9],[30,-10],[28,-3],[30,0],[34,0],[31,4],[26,4],[25,1]]);
    this.shape("#a9bab0",[[25,-3],[27,-8],[29,-9],[28,-3],[30,0],[34,0],[31,3],[27,3]]);
    this.block("#e3cc9b",26,-2,4,1);
    this.block("#d3a272",-3,-3,5,5);
    this.block("#f3cf9b",-2,-2,3,3);
    ctx.restore();
  }

  rewardBurst(frame) {
    const {find,x,y,phase} = frame;
    if (phase<MineScene.impact) return;
    const ctx = this.context;
    const age = this.ease((phase-MineScene.impact)/(1-MineScene.impact));
    const pulse = this.ease(age/.14)*(1-age);
    const fade = 1-this.ease((phase-.9)/.1);
    const width = find.size*4;
    this.glow(find.light,x-8,y,28+width,pulse*(find.inset ? .58 : .34));
    if (find.minimum>=85) {
      for (let ring=0;ring<(find.minimum===120 ? 2 : 1);ring++) {
        const wave = Math.max(0,age-ring*.14);
        if (wave===0) continue;
        const radius = 8+wave*(width+23-ring*18);
        ctx.globalAlpha = pulse*(ring ? .32 : .63);
        ctx.beginPath();
        for (let step=0;step<=8;step++) {
          const angle = step*Math.PI/4;
          const dx = x-8+Math.cos(angle)*radius;
          const dy = y+Math.sin(angle)*radius*.67;
          if (step) ctx.lineTo(dx,dy);
          else ctx.moveTo(dx,dy);
        }
        ctx.strokeStyle = ring ? find.light : find.core;
        ctx.lineWidth = ring ? 1 : 2;
        ctx.stroke();
      }
    }
    if (find.minimum===120) {
      ctx.globalAlpha = pulse*.30;
      for (let ray=0;ray<8;ray++) {
        const angle = ray*Math.PI/4+.22*age;
        const short = 12+age*20;
        const long = 18+age*(100+ray%2*25);
        this.shape(find.core,[[x-10+Math.cos(angle)*short,y+Math.sin(angle)*short],[x-10+Math.cos(angle-.06)*long,y+Math.sin(angle-.06)*long*.72],[x-10+Math.cos(angle+.06)*long,y+Math.sin(angle+.06)*long*.72]]);
      }
    }
    for (let i=0;i<find.shards;i++) {
      const flight = Math.max(0,age-this.hash(i,214)*.2);
      const angle = this.hash(i,211)*Math.PI*2;
      const speed = .36+this.hash(i,99)*.64;
      const dx = x-10+Math.cos(angle)*speed*flight*width*1.8;
      const dy = y+Math.sin(angle)*speed*flight*width+flight*flight*23;
      const glow = this.ease(flight/.12)*(1-flight);
      const color = i%3 ? find.light : find.core;
      ctx.globalAlpha = glow*fade;
      if (find.inset && i%4===0) {
        this.block(color,dx-1,dy-4,2,8);
        this.block(color,dx-4,dy-1,8,2);
        this.block(find.core,dx-1,dy-1,2,2);
      } else {
        this.shape(color,[[dx,dy-3],[dx+2,dy],[dx,dy+3],[dx-2,dy]]);
      }
    }
    ctx.globalAlpha = 1;
  }

  drawLift(time) {
    const ctx = this.context;
    const x = this.center;
    const y = this.screenY(this.position);
    const rocking = this.motion.matches ? 0 : Math.sin(time/385)*.013;
    const phase = this.journey ? (time-this.journey.started)/this.journey.duration : 1;
    const speed = Math.sin(Math.PI*this.travelProgress(phase,this.journey?.find));
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
    const find = this.miningFrame(now);
    if (find) this.drawVein(find);
    this.drawLift(now);
    if (find) {
      this.drawPickaxe(find);
      this.rewardBurst(find);
    }
    this.context.restore();
  }
}
