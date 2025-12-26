import { PDFDocument, rgb } from "pdf-lib";

export async function exportPdf(file, canvases) {
  const buffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(buffer);
  const pages = pdfDoc.getPages();

  pages.forEach((page, index) => {
    const canvas = canvases[index + 1];
    if (!canvas) return;

    canvas.getObjects().forEach((obj) => {
      if (obj.text) {
        page.drawText(obj.text, {
          x: obj.left,
          y: page.getHeight() - obj.top,
          size: obj.fontSize || 12,
          color: rgb(0, 0, 0),
        });
      }
    });
  });

  return await pdfDoc.save();
}
