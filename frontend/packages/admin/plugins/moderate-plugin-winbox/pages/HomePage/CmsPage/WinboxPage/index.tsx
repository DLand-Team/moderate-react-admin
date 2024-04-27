import { Button } from "antd";
import { useFlat } from "src/service";

const WinboxPage = () => {
  const { addWinBox } = useFlat("appStore");
  return (
    <div>
      <Button
        onClick={() => {
          addWinBox({
            content: (
              <div
                style={{
                  background: "#e9ecf0",
                  width: "100%",
                  height: "100%",
                  color: "black",
                }}>
                Test
              </div>
            ),
          });
        }}>
        Show winbox
      </Button>
    </div>
  );
};

export default WinboxPage;
