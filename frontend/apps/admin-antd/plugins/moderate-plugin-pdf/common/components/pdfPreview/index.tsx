import { useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
//@ts-ignore
import { DocumentCallback } from "react-pdf/dist/cjs/shared/types";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "./Sample.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const options = {
  cMapUrl: "/cmaps/",
  standardFontDataUrl: "/standard_fonts/",
};

const maxWidth = 800;

export default function PdfPreview({ pdfUrl }: { pdfUrl: string }) {
  const [numPages, setNumPages] = useState<number>();
  const [containerWidth] = useState<number>();

  function onDocumentLoadSuccess({
    numPages: nextNumPages,
  }: DocumentCallback): void {
    ref.current?.();
    setNumPages(nextNumPages);
  }
  const ref = useRef<any>();

  return (
    <div className="Example">
      <div className="Example__container">
        <div className="Example__container__document">
          <Document
            file={pdfUrl}
            onLoadError={() => {
              ref.current?.();
            }}
            onLoadSuccess={onDocumentLoadSuccess}
            options={options}
          >
            {Array.from(new Array(numPages), (_, index) => (
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                width={
                  containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth
                }
              />
            ))}
          </Document>
        </div>
      </div>
    </div>
  );
}
