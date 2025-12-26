import { Document, Page } from "react-pdf";
import { useState, useRef } from "react";
import AnnotationLayer from "./AnnotationLayer";

export default function PdfViewer({ file }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [numPages, setNumPages] = useState(0);
  const [pageSize, setPageSize] = useState({ width: 0, height: 0 });
  const pageRef = useRef(null);

  const handlePageRender = () => {
    if (pageRef.current) {
      const rect = pageRef.current.getBoundingClientRect();
      setPageSize({ width: rect.width, height: rect.height });
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-4 mb-4">
        <button
          disabled={currentPage <= 1}
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
        >
          Prev
        </button>
        <span>
          Page {currentPage} / {numPages || "-"}
        </span>
        <button
          disabled={currentPage >= numPages}
          onClick={() => setCurrentPage((p) => Math.min(numPages, p + 1))}
        >
          Next
        </button>
      </div>

      <div className="relative">
        <div ref={pageRef}>
          <Document
            file={file}
            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
          >
            <Page
              pageNumber={currentPage}
              width={600}
              onRenderSuccess={handlePageRender}
            />
          </Document>
        </div>

        {pageSize.width > 0 && pageSize.height > 0 && (
          <AnnotationLayer
            pdfWidth={pageSize.width}
            pdfHeight={pageSize.height}
          />
        )}
      </div>
    </div>
  );
}
