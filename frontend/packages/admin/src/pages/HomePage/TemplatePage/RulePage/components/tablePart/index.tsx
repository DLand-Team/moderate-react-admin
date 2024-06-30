import { Col, Row } from "antd";
import { useFlat } from "src/service";
import { Itinenarary } from "../itinenarary";
import SliderMenu from "../sliderMenu";

const TablePart = ({ branchName = "" }: { branchName?: string }) => {
	const { targetRankId, targetItineraryId } = useFlat([
		"ruleStore",
		branchName,
	]);
	const handleUpdateRankList = () => {};

	return (
		<>
			<Row>
				<Col span={5}>
					<SliderMenu branchName={branchName} isJustShow={false} />
				</Col>
				<Col span={19}>
					<Itinenarary
						branchName={branchName}
						isJustShow={false}
						handleUpdateRankList={handleUpdateRankList}
						targetRankId={targetRankId}
						targetItineraryId={targetItineraryId}
						carrierList={[]}
						carrierFamilyList={[]}
					/>
				</Col>
			</Row>
		</>
	);
};

export default TablePart;
