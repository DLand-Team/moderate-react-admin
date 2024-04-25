import { Button } from "antd";
import { useState } from "react";

const WinboxPage = () => {
  const [isShowPdf, setIsShowPdf] = useState(false);
  return (
    <div>
      <Button
        onClick={() => {
          setIsShowPdf(!isShowPdf);
        }}>
        Show winbox
      </Button>
    </div>
  );
};

export default WinboxPage;
