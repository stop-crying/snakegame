import React, { useEffect, useState } from "react";
import useInteval from "../utils/useInterval";
import createSnakeMovement, { willSnakeHitTheFood } from "./movement";
import randomPosition from "../utils/randomPosition";

export interface Position {
  x: number;
  y: number;
}

export enum Direction {
  UP,
  DOWN,
  LEFT,
  RIGHT,
}

const movement_speed = 75;
interface useGameLogicArc {
  canvasWidth?: number;
  canvasHeight?: number;
}

const useGameLogic = ({ canvasHeight, canvasWidth }: useGameLogicArc) => {
  const [direction, setDirection] = useState<Direction>();
  const [snakeBody, setSnakeBody] = useState<Position[]>([
    {
      x: 0,
      y: 0,
    },
  ]);

  const [foodPosition, setFoodPosition] = useState<Position | undefined>();

  const snakeHeadPos = snakeBody[snakeBody.length - 1];

  const { moveDown, moveLeft, moveRight, moveUp } = createSnakeMovement();

  useEffect(() => {
    if (!canvasHeight || !canvasWidth) {
      return;
    }
    setFoodPosition({
      x: randomPosition({ gridSize: 5, threshold: canvasWidth }),
      y: randomPosition({ gridSize: 5, threshold: canvasHeight }),
    });

    setSnakeBody([
      {
        x: randomPosition({ gridSize: 5, threshold: canvasWidth }),
        y: randomPosition({ gridSize: 5, threshold: canvasHeight }),
      },
    ]);
  }, [canvasHeight, canvasWidth]);

  const onKeyDownHandler = (event: React.KeyboardEvent<HTMLDivElement>) => {
    switch (event.code) {
      case "KeyS":
        if (direction !== Direction.UP) setDirection(Direction.DOWN);
        break;
      case "KeyW":
        if (direction !== Direction.DOWN) setDirection(Direction.UP);
        break;
      case "KeyA":
        if (direction !== Direction.RIGHT) setDirection(Direction.LEFT);
        break;
      case "KeyD":
        if (direction !== Direction.LEFT) setDirection(Direction.RIGHT);
        break;
    }
  };

  const moveSnack = () => {
    let snakeBodyAfterMoverment: Position[] | undefined;
    switch (direction) {
      case Direction.UP:
        if (snakeHeadPos.y > 0) {
          snakeBodyAfterMoverment = moveUp(snakeBody);
        } else if (canvasWidth && snakeHeadPos.x > canvasWidth / 2) {
          setDirection(Direction.LEFT);
        } else {
          setDirection(Direction.RIGHT);
        }

        break;
      case Direction.DOWN:
        if (canvasHeight && snakeHeadPos.y < canvasHeight - 5) {
          snakeBodyAfterMoverment = moveDown(snakeBody);
        } else if (canvasWidth && snakeHeadPos.x > canvasWidth / 2) {
          setDirection(Direction.LEFT);
        } else {
          setDirection(Direction.RIGHT);
        }
        break;
      case Direction.LEFT:
        if (snakeHeadPos.x > 0) {
          snakeBodyAfterMoverment = moveLeft(snakeBody);
        } else if (canvasHeight && snakeHeadPos.y < canvasHeight / 2) {
          setDirection(Direction.DOWN);
        } else {
          setDirection(Direction.UP);
        }
        break;
      case Direction.RIGHT:
        if (canvasWidth && snakeHeadPos.x < canvasWidth - 5) {
          snakeBodyAfterMoverment = moveRight(snakeBody);
        } else if (canvasHeight && snakeHeadPos.y < canvasHeight / 2) {
          setDirection(Direction.DOWN);
        } else {
          setDirection(Direction.UP);
        }
        break;
    }

    if (
      direction !== undefined &&
      foodPosition &&
      willSnakeHitTheFood({
        foodPosition,
        snakeHeadPos,
        direction,
      })
    ) {
      setSnakeBody([
        ...snakeBodyAfterMoverment!,
        { x: foodPosition.x, y: foodPosition.y },
      ]);
      setFoodPosition({
        x: randomPosition({ threshold: canvasWidth!, gridSize: 5 }),
        y: randomPosition({ threshold: canvasHeight!, gridSize: 5 }),
      });
    } else if (snakeBodyAfterMoverment) setSnakeBody(snakeBodyAfterMoverment);
  };

  useInteval(moveSnack, movement_speed);

  return { snakeBody, onKeyDownHandler, foodPosition };
};

export default useGameLogic;
