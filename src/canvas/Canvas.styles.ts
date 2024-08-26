import style from "styled-components";

export const Canvas = style.canvas`
    border: 10px solid black;
    width : 800px;
    height : 400px;
    box-sizing: border-box;
    border-image-slice : 1;
    border-image-source : linear-gradient(to right, red, blue);
    

`;
