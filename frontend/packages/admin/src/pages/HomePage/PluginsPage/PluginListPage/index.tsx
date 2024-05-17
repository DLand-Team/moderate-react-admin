import { Col, Row } from "antd";
import { useEffect } from "react";
import { useFlat } from "src/service";
import PluginCard from "../components/card";

const PluginListPage = () => {
	const { getPluginListAct, pluginList } = useFlat("devStore");
	useEffect(() => {
		getPluginListAct();
	}, []);

	return (
		<Row gutter={[16, 26]} wrap={true}>
			{pluginList.map((item) => {
				return (
					<Col xs={24} sm={12} md={8} lg={8} xl={6} key={item.gitee}>
						<PluginCard data={item} />
					</Col>
				);
			})}
		</Row>
	);
};

export default PluginListPage;
