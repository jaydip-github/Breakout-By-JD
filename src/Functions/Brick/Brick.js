export default function renderBrick(level, allBricks, canvas, brickProps) {
  brickProps.width = canvas.width / 5 - 10;

  // some time allbrick is undifined then return empty array 
  let newBricks = [];
  if (!allBricks) {
    return [];
  }

  // level wise brick generated logic like in level 1 if 5 brick is already generated then retunt nothing so 6th brick is not generated
  if (allBricks.length >= 5  * level) {
    return;
  }

  // create all single brick and push into newbricks array then return it.
  for (let i = 0; i < 5 * level; i++) {
    let Brickpiece = new singleBrick(
      brickProps.x + brickProps.width,
      brickProps.y,
      brickProps.width,
      brickProps.height,
      brickProps.colors
    );
    newBricks.push(Brickpiece);

    // validation for arrangement of brick
    brickProps.x += brickProps.width + 5;
    if (brickProps.x + brickProps.width >= canvas.width) {
      brickProps.x = 15;
      brickProps.y += brickProps.height + 5;
    }
  }
  return newBricks;
}

class singleBrick {
  constructor(x, y, w, h, c) {
    this.x = x - w;
    this.y = y;
    this.width = w;
    this.height = h;
    this.colors = c;
    this.broke = false;
  }
  drawBrick(ctx) {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = this.broke ? "rgba(19, 73, 89, 0)" : this.colors[1];

    ctx.strokeStyle = this.broke ? "rgba(19, 73, 89, 0)" : "transparent";
    ctx.lineWidth = 5;
    
    ctx.fill();
    ctx.strokeRect(this.x, this.y, this.width, this.height);
  }
}
