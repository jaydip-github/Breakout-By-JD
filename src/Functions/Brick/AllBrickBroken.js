import ResetBallPosition from "../Ball/ResetBallPosition";
export default function AllBrickBroken(allBricks,ballProps,brickProps,paddleProps,player){

        let total=0;
        for (let i=0; i<allBricks.length;i++){
            if(allBricks[i].broke===true){
                total++;
            }
        }

        if(total===allBricks.length){
            player.level++;
            ResetBallPosition(ballProps,paddleProps)
            brickProps.y=50;
            ballProps.speed+=0.5;
        }
} 