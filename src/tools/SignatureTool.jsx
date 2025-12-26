import * as fabric from "fabric";

export function typedSignature(canvas, name) {
  if (!canvas) return;

  const text = new fabric.Text(name, {
    left: 120,
    top: 200,
    fontFamily: "cursive",
    fontSize: 28,
    fill: "black",
  });

  canvas.add(text);
}

export function startDraw(canvas) {
  if (!canvas) return;
  canvas.isDrawingMode = true;
  canvas.freeDrawingBrush.width = 2;
  canvas.freeDrawingBrush.color = "black";
}

export function stopDraw(canvas) {
  if (!canvas) return;
  canvas.isDrawingMode = false;
}
