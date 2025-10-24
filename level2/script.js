const DIGIT_MAP = {
  '0': [1,1,1,1,1,1,0],
  '1': [0,1,1,0,0,0,0],
  '2': [1,1,0,1,1,0,1],
  '3': [1,1,1,1,0,0,1],
  '4': [0,1,1,0,0,1,1],
  '5': [1,0,1,1,0,1,1],
  '6': [1,0,1,1,1,1,1],
  '7': [1,1,1,0,0,0,0],
  '8': [1,1,1,1,1,1,1],
  '9': [1,1,1,1,0,1,1]
};

class SevenSegmentDigit{
  constructor(dom){
    this.dom = dom;
    const names = ['a','b','c','d','e','f','g'];
    this.segs = names.map(n => dom.querySelector('.segment.'+n));
  }

  setNumber(n){
    const bits = (n === null) ? [0,0,0,0,0,0,0] : DIGIT_MAP[String(n)];
    this.segs.forEach((s, idx) => {
      s.style.transitionDelay = idx*30+'ms';
      if(bits[idx]) requestAnimationFrame(()=> s.classList.add('on'));
      else requestAnimationFrame(()=> s.classList.remove('on'));
    });
  }
}

class SevenSegmentClock{
  constructor(root){
    this.root = root;
    this.digits = Array.from(root.querySelectorAll('.digit')).map(d => new SevenSegmentDigit(d));
    this.colonDots = [
      document.getElementById('colon-top'),
      document.getElementById('colon-bottom'),
      document.getElementById('colon-top-2'),
      document.getElementById('colon-bottom-2')
    ];
    this._tick();
    setInterval(()=> this._tick(), 1000);
  }

  _tick(){
    const now = new Date();
    const h = now.getHours();
    const m = now.getMinutes();
    const s = now.getSeconds();
    const parts = [Math.floor(h/10), h%10, Math.floor(m/10), m%10, Math.floor(s/10), s%10];
    parts.forEach((p, idx)=> this.digits[idx].setNumber(p));
    const colonOn = (s % 2) === 0;
    this.colonDots.forEach(d => colonOn ? d.classList.add('on') : d.classList.remove('on'));
  }
}

document.addEventListener('DOMContentLoaded', ()=>{
  const clockRoot = document.getElementById('clock');
  new SevenSegmentClock(clockRoot);
});
