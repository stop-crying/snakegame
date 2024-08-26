interface randomProps {
  gridSize: number;
  threshold: number;
}

const randomPosition = ({ gridSize = 5, threshold }: randomProps) =>
  Math.floor(Math.random() * (threshold / gridSize)) * gridSize;

export default randomPosition;
