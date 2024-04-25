import { Button, Modal } from "antd";
import PdfPreview from "plugins/moderate-plugin-markdown/common/components/pdfPreview";
import { useState } from "react";

const PdfPage = () => {
  const [isShowPdf, setIsShowPdf] = useState(false);
  return (
    <div>
      <Button
        onClick={() => {
          setIsShowPdf(!isShowPdf);
        }}>
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
        open={isShowPdf}>
        <PdfPreview pdfUrl="/res/docs/%5B%E4%BB%A3%E7%A0%81%E6%95%B4%E6%B4%81%E4%B9%8B%E9%81%93%5D.%28%E7%BE%8E%29%E9%A9%AC%E4%B8%81.%E6%89%AB%E6%8F%8F%E7%89%88.pdf" />
      </Modal>
    </div>
  );
};

export default PdfPage;
