import { Card } from "antd";
import type { ReactNode } from "react";

const { Meta } = Card;

const App: React.FC = (props: { children: ReactNode }) => (
  <Card
    hoverable
    style={{ width: 400 }}
    cover={
      <img
        alt="example"
        src="https://s1.imagehub.cc/images/2022/10/27/c1ede234aeb41d1a0216fe5bc4d1c642aad1eed8.jpg942w_531h_progressive.webp"
      />
    }
  >
    {props.children}
  </Card>
);

export default App;
