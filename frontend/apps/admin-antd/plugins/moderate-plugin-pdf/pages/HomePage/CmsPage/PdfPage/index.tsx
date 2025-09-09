import { Button, Modal } from "antd";
import PdfPreview from "plugins/moderate-plugin-pdf/common/components/pdfPreview";
import { useState } from "react";

const PdfPage = () => {
  const [isShowPdf, setIsShowPdf] = useState(false);
  return (
    <div>
      <Button
        onClick={() => {
          setIsShowPdf(!isShowPdf);
        }}
      >
        Show Pdf
      </Button>
      <Modal
        style={{
          display: "flex",
          justifyContent: "center",
        }}
        onCancel={() => {
          setIsShowPdf(false);
        }}
        open={isShowPdf}
      >
        <PdfPreview pdfUrl="/demo.pdf" />
      </Modal>
    </div>
  );
};

export default PdfPage;
