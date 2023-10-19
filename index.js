const canvas = document.querySelector("#draw");
const ctx = canvas.getContext("2d");
/* Sets canvas to window size */
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.strokeStyle = "#BADA55";
/* Can also be bevel or square to change shape of line */
ctx.lineJoin = "round";
ctx.lineCap = "round";

ctx.lineWidth = 100;
/* These will blend the colors */
/* ctx.globalCompositeOperation = "lighter";
ctx.globalCompositeOperation = "multiply"; */

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
/* Allows the thickness of the line to vary */
let direction = true;

function draw(e) {
  if (!isDrawing) return;
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  [lastX, lastY] = [e.offsetX, e.offsetY];
  /* Allows for color change */
  hue++;
  if (ctx.lineWidth >= 100 || ctx.lineWidth <= 10) {
    /* Changes whether line gets thicker or thinner */
    direction = !direction;
  }
  if (direction) {
    ctx.lineWidth++;
  } else {
    ctx.lineWidth--;
  }
}

canvas.addEventListener("mousedown", (e) => {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", () => (isDrawing = false));
canvas.addEventListener("mouseout", () => (isDrawing = false));
