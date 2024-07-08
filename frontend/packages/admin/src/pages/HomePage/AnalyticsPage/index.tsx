import { Chart } from "@antv/g2";
import { useEffect, useRef } from "react";
import { UUID } from "src/common/utils";
import data from "./mock.json";

const LineChartCard = () => {
	const domIdRef = useRef(UUID());
	useEffect(() => {
		const chart = new Chart({
			container: domIdRef.current,
			autoFit: true,
		});
		chart.legend(false);
		chart.axis(false);
		chart
			.data(data)
			.encode("x", "month")
			.encode("y", "temperature")
			.encode("color", "city")
			.scale("x", {
				range: [0, 1],
			})
			.scale("y", {
				nice: true,
			})
			.style("lineWidth", 110);

		chart
			.line()
			.style("shape", "smooth")
			.style("lineWidth", 5);
		chart.render();
	}, []);
	return (
		<div>
			123as
			<div
				style={{
					width: "200px",
					height: "150px",
				}}
				id={domIdRef.current}
			></div>
		</div>
	);
};

const AnalyticsPage = () => {
	return (
		<div>
			<LineChartCard />
		</div>
	);
};

export default AnalyticsPage;
