export default function PaddleHit(ballProps, paddleProps) {
  // logic for ball axis parameter is between paddle parameter.
  if (
    ballProps.x < paddleProps.x + paddleProps.width &&
    ballProps.x > paddleProps.x &&
    ballProps.y + ballProps.rad > paddleProps.y &&
    ballProps.y < paddleProps.y + paddleProps.height
  ) {
    // here we measure distance from ball to center of paddle
    let collidePoint = ballProps.x - (paddleProps.x + paddleProps.width / 2);

    // then divide by half width so it return us value between -1 to 1. ex: if we devide any random number between -100 to 100 by 100 so it's result between -1 to 1.
    collidePoint = collidePoint / (paddleProps.width / 2);

    
    // turn ratio into angle  so it give us angle between 0 to 60 because we divide pi/3.
    let angle = (collidePoint * Math.PI) / 3;

    
    // here we have angle and speed so we caluclate dx and dy based on sin and cos
    // in deep: here we have hypotenuse and angle so we find adjacent as dy and opposite as xy .here triangle generated between ball and paddle is vertical right angle triangle.
    

    // here we change dy to -dy because when ball hit paddle basically ball goes to up not down
    ballProps.dx = ballProps.speed * Math.sin(angle);
    ballProps.dy = -ballProps.speed * Math.cos(angle);
  }
}
