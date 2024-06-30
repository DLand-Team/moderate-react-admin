import { Button, Card, Table, Typography } from "antd";
import { useTranslation } from "react-i18next";
import InfoCard from "src/components/infoCard";
import { AppHelper, useFlat } from "src/service";
import styles from "./style.module.scss";
import useDetailConfig from "./useDetailConfig";
import { ColumnsType } from "antd/es/table";

/* type */
export interface PosDetailViewProps {
	isSub?: boolean;
	handleCancel?: () => void;
	branchName?: string;
}

/* Main */
const DetailView = ({ handleCancel, branchName = "" }: PosDetailViewProps) => {
	const { t } = useTranslation('pos');
	const detailConfig = useDetailConfig(branchName);
	const { currentData } = useFlat(["posStore", branchName], {
		currentData: "IN",
	});
	const columns: ColumnsType = [
		{
			title: t("posPage.posType"),
			dataIndex: "posType",
			key: "posType",
			align: "center",
		},
		{
			title: t("posPage.posInfo"),
			dataIndex: "posInfo",
			key: "posInfo",
			align: "center",
		},
		{
			title: t("posPage.exclude"),
			dataIndex: "exclude",
			key: "exclude",
			align: "center",
		},
		{
			title: t("posPage.weight"),
			dataIndex: "weight",
			key: "weight",
			align: "center",
		},
	];
	return (
		<div className={styles.container}>
			<>
				<Card className={styles.infoCard}>
					<InfoCard items={detailConfig}></InfoCard>
				</Card>
				<Card className={styles.posItemsTableCard}>
					<Typography
						style={{
							fontSize: "16px",
							marginBottom: "30px",
						}}
					>
						{t("pos:posPage.itemListTitle")}
					</Typography>
					<Table
						loading={!currentData}
						columns={columns}
						dataSource={currentData?.cpdPosItems || []}
					/>
				</Card>
			</>
			<div className={styles.btnTable}>
				<Button
					onClick={() => {
						if (handleCancel) {
							handleCancel();
						} else {
							AppHelper.closeTabByPath();
						}
					}}
				>
					{t`common:edit`}
				</Button>
			</div>
		</div>
	);
};

export default DetailView;
