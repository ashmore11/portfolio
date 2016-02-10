const RAF = {

  ticker: null,

  init: function init() {

    Happens(this);

  },

  start: function start() {

    this.ticker = window.requestAnimationFrame(this.tick.bind(this));

  },

  stop: function stop() {

    window.cancelAnimationFrame(this.ticker);

    this.ticker = null;

  },

  tick: function tick(time) {

    this.ticker = window.requestAnimationFrame(this.tick.bind(this));

    this.emit('tick', time);

  },

};

RAF.init();

export default RAF;
