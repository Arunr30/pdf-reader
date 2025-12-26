import React, { useRef, useState, useEffect } from "react";

export default function AnnotationLayer({ pdfWidth, pdfHeight }) {
  const canvasRef = useRef(null);
  const [mode, setMode] = useState("text");
  const [isDrawing, setIsDrawing] = useState(false);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = pdfWidth;
    canvas.height = pdfHeight;

    const ctx = canvas.getContext("2d");
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.strokeStyle = "black";
    ctx.font = "16px Arial";
    ctx.fillStyle = "black";
  }, [pdfWidth, pdfHeight]);

  const handleMouseDown = (e) => {
    if (mode !== "draw") return;
    setIsDrawing(true);
    const ctx = canvasRef.current.getContext("2d");
    const rect = canvasRef.current.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing || mode !== "draw") return;
    const ctx = canvasRef.current.getContext("2d");
    const rect = canvasRef.current.getBoundingClientRect();
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
  };

  const handleMouseUp = () => {
    if (mode === "draw") setIsDrawing(false);
  };

  const handleClick = (e) => {
    if ((mode === "text" || mode === "signature") && inputValue) {
      const ctx = canvasRef.current.getContext("2d");
      const rect = canvasRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      ctx.fillText(inputValue, x, y);
      setInputValue("");
    }
  };

  return (
    <div style={{ position: "relative", width: pdfWidth, height: pdfHeight }}>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 20,
          display: "flex",
          gap: "8px",
        }}
      >
        <button
          onClick={() => setMode("text")}
          style={{ background: mode === "text" ? "#a0c4ff" : "#ddd" }}
        >
          Text
        </button>
        <button
          onClick={() => setMode("signature")}
          style={{ background: mode === "signature" ? "#a0c4ff" : "#ddd" }}
        >
          Signature
        </button>
        <button
          onClick={() => setMode("draw")}
          style={{ background: mode === "draw" ? "#a0c4ff" : "#ddd" }}
        >
          Draw
        </button>

        {(mode === "text" || mode === "signature") && (
          <input
            type="text"
            placeholder={mode === "text" ? "Enter text" : "Enter signature"}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            style={{ padding: "4px" }}
          />
        )}
      </div>

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 10,
          pointerEvents: "auto",
        }}
        onClick={handleClick}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      />
    </div>
  );
}
