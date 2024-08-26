import { Direction, Position } from "./useGameLogix";

const createSnakeMovement = (gridSize = 5) => ({
  moveRight: (snakeBody: Position[]) => {
    const newSnakeBody = [...snakeBody];
    const headPos = newSnakeBody[newSnakeBody.length - 1];
    newSnakeBody.shift();
    return [...newSnakeBody, { ...headPos, x: headPos.x + gridSize }];
  },
  moveLeft: (snakeBody: Position[]) => {
    const newSnakeBody = [...snakeBody];
    const headPos = newSnakeBody[newSnakeBody.length - 1];
    newSnakeBody.shift();
    return [...newSnakeBody, { ...headPos, x: headPos.x - gridSize }];
  },
  moveDown: (snakeBody: Position[]) => {
    const newSnakeBody = [...snakeBody];
    const headPos = newSnakeBody[newSnakeBody.length - 1];
    newSnakeBody.shift();
    return [...newSnakeBody, { ...headPos, y: headPos.y + gridSize }];
  },
  moveUp: (snakeBody: Position[]) => {
    const newSnakeBody = [...snakeBody];
    const headPos = newSnakeBody[newSnakeBody.length - 1];
    newSnakeBody.shift();
    return [...newSnakeBody, { ...headPos, y: headPos.y - gridSize }];
  },
});

interface foodprops {
  foodPosition: Position;
  snakeHeadPos: Position;
  direction: Direction;
}

export const willSnakeHitTheFood = ({
  foodPosition,
  snakeHeadPos,
  direction,
}: foodprops) => {
  switch (direction) {
    case Direction.UP:
      return (
        foodPosition.x === snakeHeadPos.x &&
        snakeHeadPos.y - 5 === foodPosition.y
      );
    case Direction.DOWN:
      return (
        foodPosition.x === snakeHeadPos.x &&
        snakeHeadPos.y + 5 === foodPosition.y
      );
    case Direction.LEFT:
      return (
        foodPosition.y === snakeHeadPos.y &&
        snakeHeadPos.y - 5 === foodPosition.y
      );
    case Direction.RIGHT:
      return (
        foodPosition.y === snakeHeadPos.y &&
        snakeHeadPos.y + 5 === foodPosition.y
      );
  }
};

export default createSnakeMovement;
