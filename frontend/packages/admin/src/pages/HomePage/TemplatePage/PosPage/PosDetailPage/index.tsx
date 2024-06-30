import { Button, Card, Skeleton } from "antd";
import { DescriptionsItemType } from "antd/es/descriptions";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import InfoCard from "src/components/infoCard";
import { AppHelper, useFlat } from "src/service";
import PosItemsTable from "./components/tablePart";
import "./index.scss";

const PosDetailPage = ({
	handleCancel,
}: {
	isSub?: boolean;
	handleCancel?: () => void;
}) => {
	// 第一步：通过路由信息判断是否是编辑

	let [searchParams] = useSearchParams();
	const id = searchParams.get("id");
	const { currentData, getCurrentDetailAct, setCurrentPosData } = useFlat(
		"posStore",
		{
			currentData: "IN",
		},
	);
	useEffect(() => {
		getCurrentDetailAct({
			id,
		});
		return () => {
			setCurrentPosData(null);
		};
	}, []);
	const { t } = useTranslation(["pos"]);
	const items: DescriptionsItemType[] = [
		{
			label: t`posPage.posName`,
			children: currentData ? (
				currentData?.posName
			) : (
				<Skeleton.Input block={true} active={true} />
			),
			span: 4,
		},
		{
			label: t`posPage.comment`,
			children: currentData ? (
				currentData?.comment
			) : (
				<Skeleton.Input block={true} active={true} />
			),
			span: 4,
		},
	];
	return (
		<div className="posEditContent">
			<>
				<Card
					style={{
						marginBottom: "12px",
					}}
				>
					<InfoCard items={items}></InfoCard>
				</Card>
				<div
					style={{
						position: "relative",
						height: "60px",
					}}
				>
					<div className="btnTable">
						<Button
							onClick={() => {
								if (handleCancel) {
									handleCancel();
								} else {
									AppHelper.closeTabByPath();
								}
							}}
						>
							{t`posPage.edit`}
						</Button>
					</div>
				</div>

				<Card
					style={{
						marginBottom: "30px",
					}}
				>
					<PosItemsTable></PosItemsTable>
				</Card>
			</>
		</div>
	);
};
export default PosDetailPage;
