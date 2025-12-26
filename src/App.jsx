import { useState } from "react";
import Login from "./auth/Login";
import PdfViewer from "./pdf/PdfViewer";
import { addText } from "./tools/TextTool";
import { typedSignature, startDraw, stopDraw } from "./tools/SignatureTool";
import { exportPDF } from "./utils/exportPDF.js";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [file, setFile] = useState(null);
  const [canvases, setCanvases] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  if (!loggedIn) return <Login onLogin={() => setLoggedIn(true)} />;

  const canvas = canvases[currentPage];

  return (
    <div className="p-4">
      {/* File selection */}
      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files[0])}
      />

      {file && (
        <>
          {/* Annotation controls */}
          <div className="flex gap-2 my-3 flex-wrap">
            <button
              className="bg-blue-500 text-white px-3 py-1"
              onClick={() => addText(canvas)}
            >
              Add Text
            </button>

            <button
              className="bg-purple-500 text-white px-3 py-1"
              onClick={() => typedSignature(canvas, "Arunvasu")}
            >
              Typed Signature
            </button>

            <button
              className="bg-orange-500 text-white px-3 py-1"
              onClick={() => startDraw(canvas)}
            >
              Draw
            </button>

            <button
              className="bg-gray-600 text-white px-3 py-1"
              onClick={() => stopDraw(canvas)}
            >
              Stop Draw
            </button>

            <button
              className="bg-green-600 text-white px-3 py-1"
              onClick={async () => {
                const bytes = await exportPDF(file, canvases);
                const blob = new Blob([bytes], { type: "application/pdf" });
                const link = document.createElement("a");
                link.href = URL.createObjectURL(blob);
                link.download = "final.pdf";
                link.click();
              }}
            >
              Export
            </button>
          </div>

          {/* PDF viewer */}
          <PdfViewer
            file={file}
            currentPage={currentPage}
            setPage={setCurrentPage}
            onCanvasReady={(page, canvas) =>
              setCanvases((prev) => ({ ...prev, [page]: canvas }))
            }
          />
        </>
      )}
    </div>
  );
}
