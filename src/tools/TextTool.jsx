import * as fabric from "fabric";

export function addText(canvas) {
  if (!canvas) return;

  const text = new fabric.Textbox("Edit me", {
    left: 100,
    top: 100,
    fontSize: 16,
    fill: "black",
  });

  canvas.add(text);
  canvas.setActiveObject(text);
}
