export default function ResetBallPosition(ballProps, paddleProps) {
  
  // reset ball logic
  ballProps.x = paddleProps.x+paddleProps.width/2;
  ballProps.y = paddleProps.y;
  

}
