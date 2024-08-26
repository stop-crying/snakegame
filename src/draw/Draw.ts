import { Position } from "../component/useGameLogix";

interface DrawProps {
  ctw: CanvasRenderingContext2D;
  snakeBody: Position[];
  foodPosition?: Position;
}

const SEGMENT_SIZE = 5;

const Draw = ({ ctw, snakeBody, foodPosition }: DrawProps) => {
  if (foodPosition) {
    ctw.fillStyle = "rgb(0,200,0)";
    ctw.fillRect(foodPosition?.x, foodPosition?.y, SEGMENT_SIZE, SEGMENT_SIZE);
  }
  ctw.fillStyle = "rgb(200,0,0";
  snakeBody.forEach((segment) =>
    ctw.fillRect(segment.x, segment.y, SEGMENT_SIZE, SEGMENT_SIZE)
  );
};
export default Draw;
