export function BallMovement(ballProps, ctx) {
  let data = new Ball(ballProps.x, ballProps.y, ballProps.rad);
  data.draw(ctx);

  // ball movement logic

  ballProps.x += ballProps.dx;
  ballProps.y += ballProps.dy;
}

class Ball {
  constructor(x, y, rad) {
    this.x = x;
    this.y = y;
    this.rad = rad;
  }
  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.arc(this.x, this.y, this.rad, 0, 2 * Math.PI);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    
    ctx.fill();
    ctx.stroke();
  }
}
