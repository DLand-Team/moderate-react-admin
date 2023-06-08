import { Card } from "antd";
import type { ReactNode } from "react";
import share from '@/assets/imgs/share.png'

const { Meta } = Card;

const App: React.FC = (props: { children: ReactNode }) => (
  <Card
    hoverable
    style={{ width: 400 }}
    cover={
      <img
        alt="example"
        src={share}
      />
    }
  >
    {props.children}
  </Card>
);

export default App;
