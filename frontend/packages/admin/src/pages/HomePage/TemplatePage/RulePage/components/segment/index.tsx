import { Button, Collapse } from "antd";
import { useTranslation } from "react-i18next";
import { EditTable } from "src/common/hooks/editTable";
import { useFlat } from "src/service";
import { segmentItem } from "src/shapes";
import columnCreater from "./columnCreater";

const { Panel } = Collapse;

const SegmentItem = (props: any) => {
	const { data, position = "1", branchName } = props;
	const { isDetail, updateSegmentAct, addSegmentAct } = useFlat(
		["ruleStore", branchName],
		{
			isDetail: "IN",
		},
	);
	const { t: commonT } = useTranslation("common");
	const { t } = useTranslation("rule");
	return (
		<Collapse
			style={{
				marginBottom: "12px",
			}}
		>
			<Panel header={`${t("rulePage_segment")} ${position}`} key="1">
				<EditTable
					tableOptions={{
						scroll: {
							x: "100%",
						},
					}}
					handleValuesChange={(data) => {
						updateSegmentAct(data);
					}}
					values={data}
					columnCreater={columnCreater}
				/>
				{!isDetail && (
					<Button
						onClick={() => {
							const newData = { ...segmentItem(), position };
							addSegmentAct(newData);
						}}
					>
						{commonT("add")}
					</Button>
				)}
			</Panel>
		</Collapse>
	);
};

export default SegmentItem;
