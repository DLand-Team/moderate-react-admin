import { Button, message, theme } from "antd";
import { cloneDeep } from "src/common/utils";
import { useTranslation } from "react-i18next";
import { ROUTE_ID } from "src/router";
import { useFlat } from "src/service";
import { connectionItem, segmentItem } from "src/shapes";
import ConnectionItem from "../connection";
import CategoryEdit from "../flightCategory/categoryEdit";
import CategroyDetail from "../flightCategory/categroyDetail";
import SegmentItem from "../segment";
import styles from "./style.module.scss";

export const Itinenarary = (props: { branchName: string }) => {
	const { branchName } = props;
	const {
		targetRankId,
		targetItineraryId,
		conByPosList,
		segByPosList,
		itByRankList,
		addConnectionAct,
		addSegmentAct,
		isDetail: isJustShow,
	} = useFlat(["ruleStore", branchName]);
	const {
		token: { colorBgLayout },
	} = theme.useToken();
	const { t } = useTranslation("rule");
	let itByRankListTemp = cloneDeep(itByRankList);
	let targetItinerary =
		itByRankListTemp[targetRankId]?.[targetItineraryId] || {};
	const { flightCategory = 1 } = targetItinerary || {};
	//获得指定数据更新后的数据
	let handleConnectionAdd = async () => {
		if (conByPosList.length === 4) {
			return message.warning(`${t("rulePage_maxCount")} 3`);
		}
		let newConPos = conByPosList.length;
		let newSeqPos = segByPosList.length;
		addConnectionAct({
			...connectionItem(),
			position: newConPos,
		});
		addSegmentAct({
			...segmentItem(),
			position: String(newSeqPos),
		});
	};

	const Category =
		branchName == ROUTE_ID.RuleDetailPage ? CategroyDetail : CategoryEdit;

	return (
		<div
			className={styles.container}
			style={{
				background: colorBgLayout,
			}}
		>
			<Category branchName={branchName} />
			{flightCategory === 3 &&
				conByPosList.map((item, index) => {
					return (
						<ConnectionItem
							branchName={branchName}
							position={index}
							data={item}
							key={index}
						>
							{segByPosList.map((item, segIndex) => {
								if (item) {
									if (index === 1) {
										if (segIndex < 3) {
											return (
												<SegmentItem
													branchName={branchName}
													position={String(segIndex)}
													data={item}
													key={segIndex}
												></SegmentItem>
											);
										}
									} else {
										if (segIndex === index + 1) {
											return (
												<SegmentItem
													branchName={branchName}
													position={String(segIndex)}
													data={item}
													key={segIndex}
												></SegmentItem>
											);
										}
									}
								}
							})}
						</ConnectionItem>
					);
				})}
			{!isJustShow && flightCategory === 3 && (
				<Button
					onClick={handleConnectionAdd}
					type="dashed"
					className={styles.addConnectionBtn}
				>
					{`${t("common:add")} ${t("rulePage_connection")}`}
				</Button>
			)}
		</div>
	);
};
