import { Col, Row } from "antd";
import { useActive } from "src/common/hooks";
import { dpChain } from "src/service";
import { Itinenarary } from "../itinenarary";
import RankSliderMenu from "../rankSliderMenu";

const BottomPart = ({ branchName = "" }: { branchName?: string }) => {
	useActive({
		onActive() {
			dpChain("ruleStore").getRuleCarrierListAct(null);
			dpChain("ruleStore").initRuleAct(null);
		},
	});

	return (
		<Row>
			<Col span={5}>
				<RankSliderMenu branchName={branchName} isJustShow={false} />
			</Col>
			<Col span={19}>
				<Itinenarary branchName={branchName} />
			</Col>
		</Row>
	);
};

export default BottomPart;
