import { Card } from "antd";
import type { ReactNode } from "react";

const App = (props: { children: ReactNode }) => (
  <Card
    hoverable
    style={{ width: 400 }}
    cover={
      <img
        alt="example"
        src="https://qiniu.moderate.run/Fq6CFNNoQY4UWKSE4XY1sgtpKZv2"
      />
    }
  >
    {props.children}
  </Card>
);

export default App;
