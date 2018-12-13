(function() {
  var canvas = document.getElementById('snow');
  var ctx = canvas.getContext('2d');
  var html = document.querySelector('html');
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;

  var SCALE = canvas.width / 700;
  var particles = [];
  var MAX_PARTICLES = Math.round(100 * SCALE);
  
  var WIND = 0.01;
  var ITER = 0;
  
  var snowColors = ['rgba(179, 218, 241, .5)', 'rgba(203, 227, 241, .6)', 'rgba(227, 236, 241, .4)'];
  
  ctx.fillStyle = 'rgba(179, 218, 241, 0.5)';
  
  // - - - Snow Class - - -
  function Snow() {
    this.color = snowColors[Math.round(rand(2, 1))];
    this.x = rand(canvas.width);
    this.y = rand(canvas.height);
    this.radius = rand(4, 0.1);
    this.xVelocity = rand(1, -0.3);
    this.yVelocity = rand();
  }
  
  Snow.prototype.draw = function() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fill();
  }
  
  Snow.prototype.update = function() {
    if(this.y + this.radius >= canvas.height + 100 || this.x + this.radius >= canvas.width) {
      this.reset();
    }
    this.x += this.xVelocity;
    this.y += this.yVelocity;
    
    // Increase performance by using whole numbers
    this.x = Math.round(this.x);
    this.y = Math.round(this.y);

    this.yVelocity += Math.round(Math.random()) ? 0.001 : -0.0005;

    //this.xVelocity += WIND;
  }
  
  Snow.prototype.reset = function() {
    this.x = rand(canvas.width);
    this.y = 0;
    this.xVelocity = rand(1, -0.3);
    this.yVelocity = rand();
  }

  // - - - Animation Functions - - -
  function init() {
    ctx.filter = 'blur(1px)';
    for(var i = 0; i < MAX_PARTICLES; i++) {
      particles.push(new Snow());
    }
    requestAnimationFrame(updateSnow);
  }
  
  function updateSnow() {
    clearCanvas();
    for(var i = 0; i < MAX_PARTICLES; ++i) {
      particles[i].update();
      particles[i].draw();

    }
    WIND = Math.cos(ITER)/ 500;
    ITER += 0.001;
    requestAnimationFrame(updateSnow);
  }
  
  // - - - Helper Functions - - -
  
  function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  
  function rand(x = 1, y = 1) {
    return Math.random() * x + y;
  }
  
  window.addEventListener('resize', resizeReset);
  window.addEventListener('orientationchange', resizeReset);
  
  function resizeReset() {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    SCALE = canvas.height / 750;
    var prev = MAX_PARTICLES;
    MAX_PARTICLES = Math.round(100 * SCALE);
    if(MAX_PARTICLES > prev) {
      for(var i = 0; i < MAX_PARTICLES - prev; i++) {
        particles.push(new Snow());
      }
    }
  }

  
  init();

})();