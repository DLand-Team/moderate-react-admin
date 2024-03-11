import { useFlatInject } from "@/common/hooks";
import { Column, Line } from "@ant-design/plots";
import { Card } from "antd";
import dayjs from "dayjs";
import { sortBy } from "lodash";
import { useEffect, useMemo, useState } from "react";

const PlatformColumnChart = () => {
	const { platformStatisticsData } = useFlatInject("helloPageStore")[0];

	const chartData = useMemo(() => {
		return platformStatisticsData.length > 0
			? generateColumnChartData(platformStatisticsData)
			: [];
	}, [platformStatisticsData]);

	const config = {
		data: chartData,
		xField: "date",
		yField: "number",
		seriesField: "type",
		isGroup: true,
		xAxis: {
			label: {
				autoRotate: false,
			},
		},
		slider: {
			start: 0.1,
			end: 0.2,
		},
	};

	return (
		<Card hoverable title={"Platform statistics overtime"}>
			<Line {...config} />
		</Card>
	);
};

export default PlatformColumnChart;

const generateColumnChartData = (data) => {
	let user = [],
		partner = [],
		enquiry = [],
		opportunity = [],
		visit = [];

	for (let item of data) {
		user.push({
			date: dayjs(item.created_at).format("YYYY-MM-DD"),
			number: item.user_count,
			type: "user",
		});

		partner.push({
			date: dayjs(item.created_at).format("YYYY-MM-DD"),
			number: item.partner_count,
			type: "partner",
		});

		enquiry.push({
			date: dayjs(item.created_at).format("YYYY-MM-DD"),
			number: item.enquiry_count,
			type: "enquiry",
		});

		opportunity.push({
			date: dayjs(item.created_at).format("YYYY-MM-DD"),
			number: item.opportunity_count,
			type: "opportunity",
		});

		visit.push({
			date: dayjs(item.created_at).format("YYYY-MM-DD"),
			number: item.visit_count,
			type: "visit",
		});
	}

	return sortBy(
		[...user, ...partner, ...enquiry, ...opportunity, ...visit],
		["date", "type"],
	);
};
