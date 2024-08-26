import React, { forwardRef, useEffect } from "react";
import * as S from "./Canvas.styles";

type CanvasProps = React.DetailedHTMLProps<
  React.CanvasHTMLAttributes<HTMLCanvasElement>,
  HTMLCanvasElement
> & {
  draw: (context: CanvasRenderingContext2D) => void;
};

const Canvas = forwardRef<HTMLCanvasElement, CanvasProps>(
  ({ draw, ...props }, canvasReF) => {
    useEffect(() => {
      if (!canvasReF) {
        return;
      }

      const canvas = (canvasReF as React.RefObject<HTMLCanvasElement>).current;

      if (!canvas) {
        return;
      }

      const context = canvas.getContext("2d");
      if (!context) {
        return;
      }

      draw(context);
      return () => context.clearRect(0,0, window.innerWidth, 400)
    }, [draw, canvasReF]);

    if (!canvasReF) {
      return null;
    }
    return <S.Canvas width={400} height={200} ref={canvasReF} {...props} />;
  }
);

export default Canvas;
