export default function BrickCollision(ballProps, brickProps) {
    
  // mesure the axis-distance from ball to center of brick
  var distX = Math.abs(ballProps.x - brickProps.x - brickProps.width / 2);
  var distY = Math.abs(ballProps.y - brickProps.y - brickProps.height / 2);

  //logic for no collision
  if (
    distX > brickProps.width + ballProps.rad ||
    distY > brickProps.height + ballProps.rad
  ) {
    return {
      hit: false,
    };
  }

  // collision logic for x axis here we return axis y because when ball hit brick on x axis then we chage the y-direction of ball
  if (distX < brickProps.width / 2 - ballProps.rad) {
    return {
      hit: true,
      axis: "Y",
    };
  }

  //collision logic for y axishere we return axis y because when ball hit brick on y axis then we chage the x-direction of ball
  if (distY < brickProps.height / 2 - ballProps.rad) {
    return {
      hit: true,
      axis: "X",
    };
  }

  //collision logic for corner here we apply pythagorous theorem
  var dx = distX - brickProps.width / 2;
  var dy = distY - brickProps.height / 2;

  return {
    hit: dx * dx + dy * dy <= ballProps.rad * ballProps.rad,
    axis: "X",
  };
}
