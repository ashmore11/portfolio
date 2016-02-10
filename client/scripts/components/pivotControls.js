import Win from 'app/utils/window';
import Camera from 'app/components/camera';
import Scene from 'app/components/scene';

const PivotControls = {

  $el: null,
  scene: null,
  tween: null,
  pos: {
    a: 0,
    x: 0,
  },
  pivot: new THREE.Object3D(),

  init: function init() {

    this.$el = $('#three-viewport');

    Scene.add(this.pivot);

    this.pivot.add(Camera);

    this.bind();

  },

  bind: function bind() {

    this.$el.on('mousemove', this.mouseMove.bind(this));
    this.$el.on('touchstart', this.touchStart.bind(this));
    this.$el.on('touchmove', this.touchMove.bind(this));
    this.$el.on('touchend', this.touchEnd.bind(this));

  },

  unbind: function unbind() {

    this.$el.off('mousemove');
    this.$el.off('touchstart');
    this.$el.off('touchmove');
    this.$el.off('touchend');

  },

  mouseMove: function mouseMove() {

    this.pos.x = event.pageX;
    this.pos.x = this.pos.x - Win.width / 2;
    this.pos.x = this.pos.x * 0.000025;

  },

  touchStart: function touchStart() {

    this.pos.a = event.originalEvent.touches[0].pageX;

  },

  touchMove: function touchMove() {

    this.pos.x = event.originalEvent.touches[0].pageX;
    this.pos.x = this.pos.x - this.pos.a;
    this.pos.x = this.pos.x * -0.000025;

  },

  touchEnd: function touchEnd() {

    const duration = Math.round(Math.abs(this.pos.x * 100000));

    TweenMax.to(this.pos, duration, { x: 0, easing: Sine.easeOut });

  },

  update: function update() {

    this.pivot.rotation.y = this.pivot.rotation.y - this.pos.x;

  },

};

export default PivotControls;
