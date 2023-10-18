import { useFlatInject } from "@/common/hooks";
import { useEffect, useState } from "react";
import ColumnChart from "./components/columnChart/opportunityColumnChart";
import PlatformColumnChart from "./components/columnChart/platformColumnChart";
import styles from "./helloPage.module.scss";
import { Col, Row, Select, Space } from "antd";
import { CardContainer } from "./components/card/cardContainer";

const HelloPage = () => {
	const { queryOpportunityACT, queryPlatformACT } =
		useFlatInject("helloPageStore")[0];

	const [timeRange, SetTimeRange] = useState("all");

	useEffect(() => {
		queryOpportunityACT({
			opportunity_ids: [],
			order: {},
		});
		queryPlatformACT({
			created_at: [timeRange, new Date().toISOString()],
			order: {},
		});
	}, [timeRange]);

	const TimeRangeSelector = () => {
		const filterOption = (
			input: string,
			option: { label: string; value: string },
		) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

		return (
			<div>
				<Select
					showSearch
					placeholder="Select a time range"
					optionFilterProp="children"
					onChange={(value: string) => {
						switch (value) {
							case "7":
								// get the date 7 days ago
								const date7 = new Date();
								date7.setDate(date7.getDate() - 7);
								console.log(date7);
								SetTimeRange(date7.toString());
								break;
							case "30":
								// get the date 30 days ago
								const date30 = new Date();
								date30.setDate(date30.getDate() - 30);
								console.log(date30);
								SetTimeRange(date30.toString());
								break;
							case "90":
								// get the date 90 days ago
								const date90 = new Date();
								date90.setDate(date90.getDate() - 90);
								console.log(date90);
								SetTimeRange(date90.toString());
								break;
							case "all":
								SetTimeRange("2023-08-28 02:37:00.021");
								break;

							default:
								break;
						}
					}}
					filterOption={filterOption}
					defaultValue={"all"}
					options={[
						{
							value: "7",
							label: "Last 7 days",
						},
						{
							value: "30",
							label: "Last Month",
						},
						{
							value: "90",
							label: "Last 3 Months",
						},
						{
							value: "all",
							label: "All Time",
						},
					]}
				/>
			</div>
		);
	};

	return (
		<div className={styles.content}>
			<Space
				direction="vertical"
				size={"middle"}
				style={{ display: "flex" }}
			>
				<Row justify={"end"}>
					<Col span={8}></Col>
					<Col span={8}></Col>
					<Col span={8}>
						<TimeRangeSelector />
					</Col>
				</Row>
				<CardContainer />
				<PlatformColumnChart />
			</Space>
		</div>
	);
};

export default HelloPage;
