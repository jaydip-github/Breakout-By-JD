import React, { useEffect, useState } from "react";
import "../css/Canvas.css";
import data from "../data";

import { BallMovement } from "../Functions/Ball/BallMovement";
import MakeBoundary from "../Functions/MakeBoundary";
import paddleMovement from "../Functions/Paddle/paddleMovement";
import renderBrick from "../Functions/Brick/Brick";
import BrickCollision from "../Functions/Brick/BrickCollision";
import PaddleHit from "../Functions/Paddle/PaddleHit";
import PlayerStats from "../Functions/PlayerStats";
import AllBrickBroken from "../Functions/Brick/AllBrickBroken";
import ResetBallPosition from "../Functions/Ball/ResetBallPosition";

// here we go for breakout

let allBricks = [];
let { ballProps, paddleProps, brickProps, player } = data;

function Canvas() {
  const [keyboard, newkeyboard] = useState(false);
  const [mouse, newmouse] = useState(true);

  useEffect(() => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    const renderGame = () => {
      paddleProps.y = canvas.height - 30;

      // function for Create and render brick wise level
      let brickSet = renderBrick(player.level, allBricks, canvas, brickProps);

      // if brick set is not empty and return some brick so we store in all brick array
      if (brickSet && brickSet.length > 0) {
        allBricks = brickSet;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // function for player stats

      PlayerStats(canvas, ctx, player);

      //use map for render a brick
      allBricks.map((brick) => {
        return brick.drawBrick(ctx);
      });

      //function for moving ball
      BallMovement(ballProps, ctx);

      // function for pass the level
      AllBrickBroken(allBricks, ballProps, brickProps, paddleProps, player);

      //logic for game over
      if (player.lives === 0) {
        alert("game over");
        player.lives = 5;
        player.level = 1;
        player.score = 0;
        allBricks.length = 0;
        brickProps.y = 50;
        ResetBallPosition(ballProps, paddleProps);
      }

      // make a boundary for ball
      MakeBoundary(ballProps, canvas, player, paddleProps);

      // here we store return value of func.. in variable.then we run for loop function for every brick and check brick is hited and broken
      let brickCollisionResult;
      for (let i = 0; i < allBricks.length; i++) {
        brickCollisionResult = BrickCollision(ballProps, allBricks[i]);
        if (brickCollisionResult.hit && !allBricks[i].broke) {
          if (brickCollisionResult.axis === "X") {
            ballProps.dx *= -1;
            allBricks[i].broke = true;
          } else if (brickCollisionResult.axis === "Y") {
            ballProps.dy *= -1;
            allBricks[i].broke = true;
          }
          player.score += 10;
        }
      }

      // function for paddle
      paddleMovement(canvas, ctx, paddleProps);

      // fuction for when ball hit paddle
      PaddleHit(ballProps, paddleProps);

      //it called function when animation change
      requestAnimationFrame(renderGame);
    };
    renderGame();
  }, []);

  // we use useeffect because of access of dom and performance of programm
  useEffect(() => {
    let canvas = document.getElementById("canvas");
    let mouseicon = document.getElementById("mouse");
    let keyboardicon = document.getElementById("keyboard");

    // logic for keyboard
    if (!mouse && keyboard) {
      canvas.style.pointerEvents = "none";
      mouseicon.style.color = "#000000";
      keyboardicon.style.color = "#62e462";

      window.onkeydown = (event) => {
        if (
          event.key === "ArrowRight" &&
          paddleProps.x + paddleProps.width < window.innerWidth - 20 - 5
        ) {
          paddleProps.x += 30;
        }
        if (event.key === "ArrowLeft" && paddleProps.x > 1) {
          paddleProps.x -= 30;
        }
      };
    }
    // disable keyboard when mouse is enable
    if (mouse && !keyboard) {
      canvas.style.pointerEvents = "auto";
      mouseicon.style.color = "#62e462";
      keyboardicon.style.color = "#000000";

      window.onkeydown = (e) => {
        if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
          return;
        }
      };
    }
  }, [mouse, keyboard]);

  // function for mousemove on canvas
  const isMouseEnable = (e) => {
    // logic for mouse arrow with paddle
    // paddle movement for half screen
    if (e.clientY > 350) {
      // this validation prevent from paddle lagging in left and right side of wall
      if (e.clientX > 55 && e.clientX < window.innerWidth - 55) {
        document.getElementById("canvas").style.cursor = "pointer";
        paddleProps.x = e.clientX - paddleProps.width / 2 - 10;
      }
    } else {
      document.getElementById("canvas").style.cursor = "auto";
    }
  };

  // some style for control icon
  const animateIconOver = (e) => {
    e.target.classList.add("bx-tada", "bx-flip-horizontal");
  };
  const animateIconOut = (e) => {
    e.target.classList.remove("bx-tada", "bx-flip-horizontal");
  };

  return (
    <>
      <div className="control_div">
        <p>Control</p>
        <div className="icon_div">
          <i
            className="bx bxs-mouse-alt"
            id="mouse"
            onMouseOver={animateIconOver}
            onMouseOut={animateIconOut}
            onClick={() => {
              newkeyboard(false);
              newmouse(true);
            }}
          ></i>
          <i
            id="keyboard"
            className="bx bxs-keyboard"
            onMouseOver={animateIconOver}
            onMouseOut={animateIconOut}
            onClick={() => {
              newmouse(false);
              newkeyboard(true);
            }}
          ></i>
        </div>
      </div>
      <canvas
        id="canvas"
        height="500px"
        width={window.innerWidth - 20}
        onMouseMove={isMouseEnable}
      ></canvas>
    </>
  );
}

export default Canvas;
