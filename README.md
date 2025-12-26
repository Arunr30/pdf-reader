React PDF Viewer & Annotation

This is a React PDF Viewer with an annotation layer. Users can:

View PDFs page by page

Draw on PDF pages

Add text anywhere on the page

Add a typed signature

Export the annotated PDF

⚠️ Note: This is a work-in-progress. Some features are simplified and may have minor issues.

Features

Upload a PDF from your computer

Annotate each page with text, signature, or freehand drawing

Export the annotated PDF

Each page has its own canvas for annotations

How to Run

Clone the repository:

git clone https://github.com/YourUsername/pdf-reader.git
cd pdf-reader


Install dependencies:

npm install


Start the development server:

npm start


Open in your browser:

http://localhost:3000


Log in (default Login page provided for demo)

Choose a PDF file using the file input

Use the annotation controls to add text, signature, or draw

Export your annotated PDF using the Export button

File Structure (Simplified)
src/
├─ App.jsx               # Main app
├─ pdf/
│  └─ PdfViewer.jsx      # PDF viewer component
├─ tools/
│  ├─ TextTool.js        # Add text utility
│  └─ SignatureTool.js   # Draw / signature utility
├─ utils/
│  └─ exportPDF.js       # Minimal PDF export stub
└─ auth/
   └─ Login.jsx          # Simple login page

Notes

File input is manual — no upload buttons yet

Canvas aligns with PDF pages for annotations

Export uses a minimal stub for now; you can replace it with real PDF export logic later

Works best with modern browsers
