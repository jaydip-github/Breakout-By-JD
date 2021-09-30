import ResetBallPosition from "./Ball/ResetBallPosition";
export default function MakeBoundary(ballProps, canvas, player, paddleProps) {

  // down side wall
  if (ballProps.y + ballProps.rad > canvas.height) {
    player.lives--;
    ResetBallPosition(ballProps,paddleProps);
  }

  // up side wall
  if (ballProps.y - ballProps.rad < 0) {
    ballProps.dy *= -1;
  }

  if (
    // right side wall
    ballProps.x + ballProps.rad > canvas.width ||

    // left side wall
    ballProps.x - ballProps.rad < 0
  ) {
    ballProps.dx *= -1;
  }
}
