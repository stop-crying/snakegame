import React, { useRef } from "react";
import Canvas from "../canvas/Canvas";
import Draw from "../draw/Draw";
import useGameLogic from "./useGameLogix";
import { GameWrapper } from "./Game.styles";

interface GameProps {}

const Board: React.FC<GameProps> = (props) => {
  const canvasReF = useRef<HTMLCanvasElement>(null);

  const { snakeBody, onKeyDownHandler, foodPosition } = useGameLogic({
    canvasHeight : canvasReF.current?.height,
    canvasWidth : canvasReF.current?.width,
  });
 
  const drawGame = (ctw: CanvasRenderingContext2D) => {
    Draw({ ctw, snakeBody, foodPosition });
  };

  return <GameWrapper tabIndex={0} onKeyDown={onKeyDownHandler}>
    <Canvas ref={canvasReF} draw={drawGame} />
  </GameWrapper>;
};

export default Board;
