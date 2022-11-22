import "react";
import { Card, Col, Row } from "antd";

export default () => (
  <div>
    <Row gutter={16}>
      <Col span={8}>
        <Card hoverable title="React 18" bordered={false}>
          <div>代码更简洁</div>
          <div>性能更好</div>
          <div>api更多，可以更好的组织代码</div>
        </Card>
      </Col>
      <Col span={8}>
        <Card hoverable title="Antd 5" bordered={false}>
          <div>主题自定义更高效容易</div>
          <div>组件更好看</div>
          <div>优化更好</div>
        </Card>
      </Col>
      <Col span={8}>
        <Card hoverable title="Mobx" bordered={false}>
          <div>响应式</div>
          <div>简单易用</div>
          <div>代码简洁</div>
        </Card>
      </Col>
    </Row>
  </div>
);
