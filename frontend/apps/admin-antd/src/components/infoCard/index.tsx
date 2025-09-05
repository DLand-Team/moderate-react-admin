import { Descriptions } from "antd";
import { DescriptionsItemType } from "antd/es/descriptions";
const InfoCard = ({ items }: { items: DescriptionsItemType[] }) => {
	return (
		<Descriptions
			bordered
			labelStyle={{
				width: "200px",
			}}
			contentStyle={{
				fontWeight: "bold",
			}}
			column={{ xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4 }}
			items={items}
		/>
	);
};

export default InfoCard;
