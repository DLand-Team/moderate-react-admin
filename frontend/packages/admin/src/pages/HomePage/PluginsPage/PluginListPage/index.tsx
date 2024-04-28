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
		<Row gutter={[16, 26]}>
			{pluginList.map((item) => {
				return (
					<Col key={item.gitee} span={6}>
						<PluginCard data={item} />
					</Col>
				);
			})}
		</Row>
	);
};

export default PluginListPage;
