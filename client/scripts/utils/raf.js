const RAF = {

  ticker: null,

};

RAF.init = function init() {
  
  Happens(this);

};

RAF.start = function start() {

  this.ticker = window.requestAnimationFrame(this.tick.bind(this));

};

RAF.stop = function stop() {

  window.cancelAnimationFrame(this.ticker);
  
  this.ticker = null;

};

RAF.tick = function tick(time) {

  this.ticker = window.requestAnimationFrame(this.tick.bind(this));

  this.emit('tick', time);

};

RAF.init();

export default RAF;