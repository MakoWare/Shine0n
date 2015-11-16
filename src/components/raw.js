//'use strict';
var owner = (document._currentScript || document.currentScript).ownerDocument;

class BallController {
  constructor(el) {
    this.el = el;
    this.x = 50;
    this.y = 50;
    this.vx = 0.0;
    this.vy = 0.0;
    this.radius = 50;
    this.setupComponent();
    console.log(window);

    window.addEventListener('deviceorientation', function(eventData) {
      // gamma is the left-to-right tilt in degrees, where right is positive
      this.x += eventData.gamma;

      // beta is the front-to-back tilt in degrees, where front is positive
      this.y += eventData.beta * 2;

      // alpha is the compass direction the device is facing in degrees
      var dir = eventData.alpha
    }.bind(this), false);
  }
  setupComponent() { 
    this.shadow = this.el.createShadowRoot();
    var template = owner.querySelector("#ballTemplate").content.cloneNode(true);
    this.shadow.appendChild(template);
    setInterval(function(){
      this.render();
    }.bind(this), 5);
  }

  updatePosition() {
    //this.x += 5;
    //this.y += 5;
  }
  render() {
    this.updatePosition();
    var canvas = this.shadow.querySelector("#ballCanvas");
    canvas.height = window.innerHeight - 5;
    canvas.width = window.innerWidth;
    var ctx = canvas.getContext("2d");

    ctx.fillStyle = "#ff6f00";
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.radius,0,2*Math.PI, false);
    ctx.fill();
  }
}
class Ball extends HTMLElement {
  createdCallback() {
    this.controller = new BallController(this);
  }
}
document.registerElement('x-ball', Ball);
