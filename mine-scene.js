"use strict";

// The camera, rails and wheel contact points share the same world coordinates.
class MineScene {
  static layerLength = 225;
  static palettes = [
    ["#102b3a","#355153","#2c3635","#404742","#79725b","#e1bf7b"],
    ["#182633","#3c4446","#2a292e","#524441","#896958","#e1b788"],
    ["#241f32","#4a3b4e","#2b2535","#524352","#9d7886","#eac7e4"],
    ["#122b31","#355657","#193234","#385a53","#668b7c","#a9d6b8"],
    ["#192b40","#344e6a","#24334b","#374864","#747d9c","#c2dffc"],
    ["#29213a","#53405c","#382c47","#594468","#94779e","#cdc0f5"],
    ["#312130","#62444c","#3f2d37","#65424b","#ac7567","#ffd2a4"],
    ["#331f27","#70452d","#402b2b","#774a35","#bc7a51","#ffd59a"],
    ["#442631","#805433","#493236","#7c4e43","#cb8955","#ffe1a0"]
  ];

  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d", {alpha:false});
    if (!this.context) return;
    this.motion = matchMedia("(prefers-reduced-motion: reduce)");
    this.position = 0;
    this.target = 0;
    this.lead = 0;
    this.sprite = new Image();
    this.sprite.addEventListener("load", () => this.render(performance.now()));
    this.sprite.src = new URL("art/shaft/rail-cart.png", document.baseURI).href;
    this.fossil = new Image();
    this.fossil.addEventListener("load", () => this.render(performance.now()));
    this.fossil.src = new URL("art/shaft/buried-fossil.png", document.baseURI).href;
    this.resize = new ResizeObserver(() => this.resizeCanvas());
    this.resize.observe(canvas);
    this.motion.addEventListener("change", () => {
      cancelAnimationFrame(this.frame);
      this.frameStep(performance.now());
    });
    this.resizeCanvas();
  }

  resizeCanvas() {
    const bounds = this.canvas.getBoundingClientRect();
    if (!bounds.width || !bounds.height) return;
    this.mobile = bounds.width <= 730;
    const pixel = this.mobile ? 1.65 : Math.max(1.9, bounds.width / 710);
    this.canvas.width = Math.ceil(bounds.width / pixel);
    this.canvas.height = Math.ceil(bounds.height / pixel);
    this.context.imageSmoothingEnabled = false;
    this.render(performance.now());
    this.requestFrame();
  }

  moveTo(travel, animate) {
    if (!this.context) return;
    const target = travel * MineScene.layerLength;
    if (target === this.target) return;
    const now = performance.now();
    this.updatePosition(now);
    this.target = target;
    const distance = target - this.position;
    if (animate && distance > 0 && !this.motion.matches) {
      this.journey = {from:this.position, started:now, duration:Math.min(1550, 750 + distance * 1.4), distance};
    } else {
      this.journey = null;
      this.position = target;
      this.lead = 0;
    }
    this.render(now);
    this.requestFrame();
  }

  updatePosition(time) {
    if (!this.journey) return;
    const {from,started,duration,distance} = this.journey;
    const fraction = this.motion.matches ? 1 : Math.min(1, Math.max(0, (time - started) / duration));
    const progress = fraction * fraction * (3 - 2 * fraction);
    this.position = from + distance * progress;
    this.lead = Math.sin(Math.PI * fraction) * Math.min(this.mobile ? 12 : 28, distance / 4);
    if (fraction === 1) {
      this.position = this.target;
      this.journey = null;
      this.lead = 0;
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

  hash(index, seed) {
    let value = Math.imul(index ^ seed, 0x45d9f3b);
    value = Math.imul(value ^ (value >>> 16), 0x45d9f3b);
    return ((value ^ (value >>> 16)) >>> 0) / 4294967296;
  }

  ridge(x, size, seed) {
    const section = Math.floor(x / size);
    const fraction = x / size - section;
    const before = this.hash(section, seed);
    return before + (this.hash(section + 1, seed) - before) * fraction;
  }

  grade(x) {
    return x * .31 + Math.sin(x / 95) * 7 + Math.sin(x / 41) * 2.5;
  }

  rail(x) {
    return this.railOrigin + this.grade(x + this.cameraX);
  }

  forTrackItems(spacing, draw) {
    const first = Math.floor(this.cameraX / spacing) - 1;
    const width = this.canvas.width;
    for (let index = first; index <= first + Math.ceil(width / spacing) + 2; index++) {
      draw(index * spacing - this.cameraX, index);
    }
  }

  blend(a, b, fraction) {
    const channels = [1,3,5].map(i => {
      const lo = parseInt(a.slice(i,i+2),16);
      const hi = parseInt(b.slice(i,i+2),16);
      return Math.round(lo + (hi - lo) * fraction);
    });
    return `rgb(${channels.join(",")})`;
  }

  shape(color, points) {
    const ctx = this.context;
    ctx.beginPath();
    points.forEach(([x,y], index) => {
      if (index) ctx.lineTo(Math.round(x),Math.round(y));
      else ctx.moveTo(Math.round(x),Math.round(y));
    });
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
  }

  face(color, x, y, width, height) {
    this.context.fillStyle = color;
    this.context.fillRect(Math.round(x),Math.round(y),width,height);
  }

  wash(color, x, y, size, strength) {
    const ctx = this.context;
    const glow = ctx.createRadialGradient(x,y,1,x,y,size);
    glow.addColorStop(0,color);
    glow.addColorStop(1,"transparent");
    ctx.globalAlpha = strength;
    ctx.fillStyle = glow;
    ctx.fillRect(x-size,y-size,size*2,size*2);
    ctx.globalAlpha = 1;
  }

  skyline(color, offset, baseline, size, height, seed, ceiling = false) {
    const points = [];
    const width = this.canvas.width;
    for (let x = -5; x < width + 8; x += 5) {
      const wx = x + offset;
      const y = baseline + (ceiling ? 1 : -1) * (this.ridge(wx,size,seed) * height + this.ridge(wx,size/3,seed+1) * height * .3);
      points.push([x, Math.round(y / 2) * 2]);
    }
    const edge = ceiling ? 0 : this.canvas.height + 1;
    points.push([width+8,edge],[-5,edge]);
    this.shape(color,points);
  }

  backdrop(colors, surface, time) {
    const ctx = this.context;
    const {width,height} = this.canvas;
    const [high,low,shade,rock,edge,gem] = colors;
    const gradient = ctx.createLinearGradient(0,0,0,height);
    gradient.addColorStop(0,high);
    gradient.addColorStop(.66,low);
    gradient.addColorStop(1,shade);
    ctx.fillStyle = gradient;
    ctx.fillRect(0,0,width,height);
    const offset = this.cameraX * .26;
    this.skyline(high,offset*.5,height*.67,118,height*.29,23);
    this.skyline(shade,offset,height*.78,85,height*.27,28);
    if (surface > 0) {
      ctx.globalAlpha = surface * .85;
      const moonX = width * .19 - offset * .12;
      const moonY = height * .29;
      this.shape("#d4be89", [[moonX-8,moonY-8],[moonX+4,moonY-10],[moonX+10,moonY-4],[moonX+10,moonY+4],[moonX+4,moonY+9],[moonX-5,moonY+9],[moonX-10,moonY+4],[moonX-10,moonY-4]]);
      for (let i = 0; i < 45; i++) {
        const x = this.hash(i,39) * width;
        const y = this.hash(i,40) * height * .62;
        ctx.globalAlpha = surface * (.16 + .36 * this.hash(i,61));
        this.face("#d0c8a7",x,y, i % 8 === 0 ? 2 : 1, 1);
      }
      ctx.globalAlpha = surface * .9;
      this.forTrackItems(21, (x, i) => {
        const wx = (i*21)*.68 - offset;
        const left = ((wx % (width+50))+(width+50))%(width+50)-20;
        const y = Math.max(height*.55,this.rail(left)+15);
        const size = 8 + this.hash(i,33)*16;
        this.shape("#162d32",[[left,y-size],[left-3,y-size*.59],[left-2,y-size*.59],[left-size*.28,y-2],[left+size*.3,y-2],[left+3,y-size*.59],[left+4,y-size*.59]]);
      });
      ctx.globalAlpha = 1;
    }
    const cave = 1 - surface;
    if (cave > 0) {
      ctx.globalAlpha = cave;
      this.skyline(rock,offset,height*.12,110,height*.24,45,true);
      this.skyline(shade,offset*1.5,height*.045,83,height*.19,71,true);
      const wallOffset = offset * 1.3;
      const first = Math.floor(wallOffset / 98) - 1;
      for (let i = first; i <= first+Math.ceil(width/98)+2; i++) {
        const x = i*98 + this.hash(i,87)*24 - wallOffset;
        const size = .64 + this.hash(i,24)*.8;
        const top = height*.11;
        const end = top+height*.19*size;
        this.shape(shade,[[x-26,0],[x+38,0],[x+21,top*.8],[x+16,top],[x+15,top+8],[x+9,end-10],[x+2,end],[x-4,end-6],[x-7,top+9],[x-16,top+2],[x-16,top-4]]);
        ctx.globalAlpha = cave * .32;
        this.shape(edge,[[x-18,0],[x+10,0],[x+4,top*.62],[x+5,top+6],[x+2,end-3],[x-4,end-6],[x-7,top+9],[x-16,top+2]]);
        ctx.globalAlpha = cave * .21;
        const seam = top+height*(.22+this.hash(i,37)*.23);
        this.shape(edge,[[x-48,seam+19],[x-21,seam+15],[x-6,seam+4],[x+9,seam+4],[x+26,seam-8],[x+57,seam-9],[x+38,seam-5],[x+29,seam-3],[x+15,seam+9],[x-5,seam+9],[x-18,seam+19]]);
        this.shape(shade,[[x-49,seam+18],[x-22,seam+14],[x-7,seam+3],[x+8,seam+3],[x+26,seam-10],[x+57,seam-9],[x+25,seam-6],[x+7,seam+5],[x-7,seam+5],[x-22,seam+17]]);
        ctx.globalAlpha = cave;
      }
      ctx.globalAlpha = cave * .29;
      this.forTrackItems(14,(x,i) => {
        const y = height * (.11 + this.hash(i,93) * .65);
        const span = 3 + Math.floor(this.hash(i,173)*7);
        this.face(i%4===0 ? gem : edge,x,y,span,i%6===0 ? 2 : 1);
      });
      ctx.globalAlpha = 1;
    }
    if (this.motion.matches) return;
    for (let i = 0; i < 18; i++) {
      const x = ((this.hash(i,53)*width - this.cameraX*.08 + Math.sin(time/2200+i)*4) % width + width) % width;
      const y = ((this.hash(i,54)*height - time/(230+i*11)) % height + height) % height;
      ctx.globalAlpha = .1 + .2 * this.hash(i,1);
      this.face(gem,x,y,i%5===0 ? 2 : 1,1);
    }
    ctx.globalAlpha = 1;
  }

  rockBed(colors, surface) {
    const ctx = this.context;
    const {width,height} = this.canvas;
    const [, ,shade,rock,edge,gem] = colors;
    const top = x => this.rail(x) + 23 + Math.floor(this.ridge(x+this.cameraX,31,22)*12);
    const profile = [];
    for (let x = -8; x <= width+8; x += 5) profile.push([x,top(x)]);
    this.shape(rock,[...profile,[width+9,height],[-8,height]]);
    this.shape(shade,[...profile.map(([x,y])=>[x,y+9]),[width+9,height],[-8,height]]);
    ctx.globalAlpha = .71;
    this.forTrackItems(6,(x,i)=>{
      const y = top(x) + 5 + this.hash(i,48)*33;
      const length = 2 + Math.floor(this.hash(i,67)*13);
      this.face(i%3===0 ? rock : edge, x, y, length, i%8===0 ? 3 : 2);
    });
    ctx.globalAlpha = 1;
    this.forTrackItems(91,(x,i) => {
      const y = top(x)+14;
      const h = (1-surface*.75)*(10+this.hash(i,87)*15);
      if (h < 8 || y > height+15) return;
      this.shape(shade,[[x-8,y+7],[x-7,y-6],[x+1,y-h-2],[x+7,y-8],[x+9,y+6]]);
      this.shape(gem,[[x-4,y+3],[x-5,y-6],[x+1,y-h],[x+2,y-3],[x,y+4]]);
      this.shape(edge,[[x+1,y-h],[x+5,y-7],[x+7,y+4],[x,y+4],[x+2,y-3]]);
      this.face(gem,x+1,y-2,1,4);
    });
    const fossil = this.fossil;
    if (surface === 0 && fossil?.complete && fossil.naturalWidth) {
      this.forTrackItems(340,(x,i) => {
        const y = top(x)+4;
        if (i % 3 !== 1 || y > height) return;
        ctx.globalAlpha = .6;
        ctx.drawImage(fossil, Math.round(x-29), Math.round(y), 58, 39);
        ctx.globalAlpha = 1;
      });
    }
  }

  supports(surface) {
    const ctx = this.context;
    const height = this.canvas.height;
    this.forTrackItems(44,(x,i)=>{
      const y = this.rail(x);
      if (y< -70 || y>height+5) return;
      const slant = i % 2 ? 3 : -3;
      this.shape("#172127",[[x-11,y+3],[x+12,y+4],[x+17+slant,y+46],[x-16+slant,y+46]]);
      this.shape("#51382f",[[x-9,y+5],[x-4,y+6],[x-7+slant,y+39],[x-13+slant,y+42]]);
      this.shape("#4a352f",[[x+6,y+5],[x+10,y+5],[x+14+slant,y+42],[x+9+slant,y+42]]);
      this.shape("#705044",[[x-10,y+30],[x+10,y+14],[x+11,y+18],[x-10,y+35]]);
      this.face("#ac825c",x-10,y+11,3,2);
      this.face("#8f7154",x+8,y+14,2,2);
    });
    ctx.globalAlpha = 1 - surface*.48;
    this.forTrackItems(161,(x,i) => {
      const y = this.rail(x)+9;
      if (y<12 || y>height+70) return;
      const top = y-69 - this.hash(i,84)*11;
      this.shape("#191f26",[[x-23,y+20],[x-19,top+6],[x-12,top-3],[x+20,top-3],[x+29,top+6],[x+33,y+22],[x+24,y+22],[x+20,top+8],[x-11,top+8],[x-15,y+17]]);
      this.shape("#644d40",[[x-19,y+14],[x-15,top+7],[x-10,top],[x+19,top],[x+24,top+5],[x+29,y+19],[x+26,y+18],[x+20,top+7],[x-11,top+7],[x-15,y+14]]);
      this.face("#b28761",x-10,top+2,27,1);
      this.face("#8d7357",x-13,y-10,2,3);
      this.face("#8d7357",x+20,y-28,2,3);
    });
    ctx.globalAlpha = 1;
  }

  tracks() {
    const ctx = this.context;
    const width = this.canvas.width;
    this.forTrackItems(11,x=>{
      const y = this.rail(x);
      this.shape("#33292a",[[x-4,y-4],[x+6,y-2],[x+5,y+9],[x-6,y+7]]);
      this.shape("#8d6952",[[x-4,y-3],[x+5,y-1],[x+3,y+5],[x-6,y+4]]);
      this.face("#b68a61",x-4,y-3,5,1);
    });
    const lines = [[5,5,"#222a2d"],[4,2,"#786c62"],[1,5,"#16232a"],[0,3,"#645d59"],[-1,1,"#c6a87d"]];
    for (const [offset,lineWidth,color] of lines) {
      ctx.beginPath();
      for (let x = -5; x <= width+5; x+=5) {
        const y = this.rail(x)+offset;
        if (x === -5) ctx.moveTo(x,y);
        else ctx.lineTo(x,y);
      }
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
      ctx.stroke();
    }
  }

  torches(time) {
    const ctx = this.context;
    this.forTrackItems(161,(post,i) => {
      const x = post + (i % 2 ? -17 : 23);
      const y = this.rail(post) - 28 - this.hash(i,9)*13;
      if (y < -30 || y > this.canvas.height+40) return;
      const flicker = .72 + Math.sin(time/97+i*5)*.12 + Math.sin(time/61+i*3)*.11;
      this.wash("#ed893c",x,y,38+flicker*9,.25+flicker*.35);
      this.wash("#e89a52",x,this.rail(x)+1,36,.12+flicker*.09);
      this.face("#1e2026",x-2,y+7,8,5);
      this.shape("#452d30",[[x-5,y+1],[x+3,y+1],[x+3,y+6],[x-1,y+13],[x-3,y+12],[x-1,y+5],[x-4,y+5]]);
      this.face("#9a5941",x-2,y+3,4,2);
      const shift = Math.round(Math.sin(time/125+i*3)*2);
      const tip = 5 + Math.round(flicker*4);
      this.shape("#bf5034",[[x-4,y+2],[x-5,y-3],[x+shift,y-tip-2],[x+4,y-4],[x+5,y-1],[x+2,y+3]]);
      this.shape("#ffaf59",[[x-3,y+1],[x-3,y-3],[x+shift,y-tip],[x+2,y-4],[x+3,y],[x+1,y+2]]);
      this.face("#ffe4a1",x-1,y-3,2,4);
      if (this.motion.matches) return;
      for (let j = 0; j < 4; j++) {
        const life = (time/970 + this.hash(i*4+j,14)) % 1;
        ctx.globalAlpha = (1-life)*.85;
        this.face(j%2 ? "#ffd182" : "#df8a5c",x+(j-1)*life*9+shift,y-7-life*17,1,1);
      }
      ctx.globalAlpha = 1;
    });
  }

  wheel(x,y,angle) {
    const ctx = this.context;
    ctx.save();
    ctx.translate(x,y);
    ctx.rotate(angle);
    this.shape("#121c24",[[-6,-3],[-3,-5],[3,-5],[5,-3],[5,3],[3,5],[-3,5],[-5,3]]);
    this.shape("#80918a",[[-4,-2],[-2,-4],[2,-4],[4,-2],[4,2],[2,4],[-2,4],[-4,2]]);
    this.face("#303940",-3,-3,6,6);
    this.face("#687978",-3,-1,6,2);
    this.face("#687978",-1,-3,2,6);
    this.face("#deaf79",-1,-1,2,2);
    ctx.restore();
  }

  cart(time) {
    const ctx = this.context;
    const x = this.anchorX + this.lead;
    // Project each axle from its own contact point to keep both wheels on bends.
    const axle = contact => {
      const grade = (this.rail(contact+1) - this.rail(contact-1))/2;
      const slope = Math.atan(grade);
      return [contact+5*Math.sin(slope),this.rail(contact)-5*Math.cos(slope)];
    };
    const rear = axle(x - 16);
    const front = axle(x + 16);
    const centerX = (rear[0]+front[0])/2;
    const centerY = (rear[1]+front[1])/2;
    const angle = Math.atan2(front[1]-rear[1],front[0]-rear[0]);
    const phase = this.journey ? Math.max(0,(time-this.journey.started)/this.journey.duration) : 0;
    const rolling = this.journey ? Math.sin(Math.PI*phase) : 0;
    const sway = this.motion.matches ? 0 : Math.sin(time/344)*.014 + Math.sin(this.position/2.6)*.017*rolling;
    const lean = angle + sway + rolling * .026;
    ctx.save();
    ctx.translate(centerX,centerY);
    ctx.rotate(lean);
    const beam = ctx.createLinearGradient(0,0,135,0);
    beam.addColorStop(0,"#ffe4a557");
    beam.addColorStop(1,"#ffb45700");
    this.shape(beam,[[3,-28],[139,-55],[139,-7],[3,-22]]);
    this.wash("#ffbd73",2,-22,39,.24);
    ctx.restore();
    if (rolling > .2) {
      for (let i = 0; i < 8; i++) {
        const life = (time/360+i/8)%1;
        ctx.globalAlpha = Math.max(0,rolling*(1-life));
        this.face(i%3===0 ? "#ffcf73" : "#d19069",rear[0]-life*27,rear[1]+4-life*(3+(i%4)*3),i%3===0 ? 2 : 1,1);
      }
      ctx.globalAlpha = 1;
    }
    const rotation = (this.position / 5) % (Math.PI*2);
    this.wheel(rear[0],rear[1],rotation);
    this.wheel(front[0],front[1],rotation);
    ctx.save();
    ctx.translate(centerX,centerY);
    ctx.rotate(lean);
    if (this.sprite.complete && this.sprite.naturalWidth) ctx.drawImage(this.sprite,-36,-39);
    ctx.restore();
  }

  render(time) {
    const {width,height} = this.canvas;
    if (!width || !height) return;
    this.anchorX = width * (this.mobile ? .45 : .273);
    this.anchorY = height * (this.mobile ? .63 : .645);
    this.cameraX = this.position - this.anchorX - this.lead;
    this.railOrigin = this.anchorY - this.grade(this.cameraX + this.anchorX);
    const pathDepth = this.position / MineScene.layerLength;
    const palette = Math.min(pathDepth,MineScene.palettes.length-1);
    const lower = Math.floor(palette);
    const first = MineScene.palettes[lower];
    const second = MineScene.palettes[lower+1] ?? first;
    const colors = first.map((color,i) => this.blend(color,second[i],palette-lower));
    const surface = Math.max(0,1-pathDepth*1.7);
    const animationTime = this.motion.matches ? 0 : time;
    this.backdrop(colors,surface,animationTime);
    this.rockBed(colors,surface);
    this.supports(surface);
    this.tracks();
    this.torches(animationTime);
    this.cart(animationTime);
  }
}
