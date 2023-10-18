import { CardTemplate } from "./cardTemplate";
import { useFlatInject } from "@/common/hooks";
import { Col, Row, Space } from "antd";
import { useMemo } from "react";

export const CardContainer = () => { 
  const { platformStatisticsData } = useFlatInject("helloPageStore")[0];
  
  const data = useMemo(() => {
    return platformStatisticsData.length > 0 ? platformStatisticsData : [];
   }, [platformStatisticsData]);
  
  return (
    <Row justify="space-between" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
      <Col span={12}>
        <CardTemplate data={data} title="Users" description="description" />
      </Col>
      <Col span={12}>
        <CardTemplate data={data} title="Partners" description="description" />
      </Col>
      <Col span={8}>
        <CardTemplate data={data} title="Enquiries" description="description" />
      </Col>
        <Col span={8}>
          <CardTemplate data={data} title="Visits" description="description" />
        </Col>
        <Col span={8}>
          <CardTemplate data={data} title="Opportunities" description="description" />
        </Col>
    </Row>
    )
  
}