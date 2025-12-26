import { fabric } from "fabric";

export function addStamp(canvas, text, color) {
  const rect = new fabric.Rect({
    width: 160,
    height: 60,
    fill: color,
  });

  const label = new fabric.Text(text, {
    fontSize: 16,
    fill: "white",
    originX: "center",
    originY: "center",
  });

  const group = new fabric.Group([rect, label], {
    left: 150,
    top: 150,
  });

  canvas.add(group);
}
