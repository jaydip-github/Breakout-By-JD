export default (canvas, ctx, paddleProps) => {
  class Paddle {
    constructor(x) {
      this.x = x;
      this.y = canvas.height-30;
      this.height = 20;
      this.width = paddleProps.width;
      this.color = ["red", "#FF6600"];
    }

    move() {
      ctx.beginPath();
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.fillStyle = this.broke ? "white" : this.color[1];
      ctx.strokeStyle = this.broke ? "white" : "red";
      ctx.lineWidth = 1;
      ctx.fillStyle = this.broke ? "white" : this.color[1];
      ctx.shadowBlur = 0;
      ctx.shadowColor = "blue";
      ctx.fill();
      ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
  }

  let paddle=new Paddle(paddleProps.x);
  paddle.move();
  // validation for paddle
  if(paddleProps.x<=0){
      paddleProps.x=1;
  }else if(paddleProps.x + paddleProps.width >= canvas.width){
      paddleProps.x=canvas.width - paddleProps.width-2;
  }
};
  