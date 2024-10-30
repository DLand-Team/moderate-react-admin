import { Button, Card } from "antd";
import { useTranslation } from "react-i18next";
import { useCurrentRoute } from "src/common/hooks";
import InfoCard from "src/components/infoCard";
import { ROUTE_ID } from "src/router";
import { appHelper, dpChain, routerHelper } from "src/service";
import { AddItemDrawerType } from "src/service/stores/ruleStore/model";
import { EditViewProps } from "../../../MarketPage/views/editView";
import PosItemsTable from "../../components/posItemsTable";
import styles from "./style.module.scss";
import useDetailConfig from "./useDetailConfig";

/* Main */
const DetailView = ({
	branchName = "",
	id,
	isSub,
	handleCancel,
}: EditViewProps) => {
	const { t: commonT } = useTranslation("common");
	const detailConfig = useDetailConfig(branchName);
	const currentRoute = useCurrentRoute();
	return (
		<div className={styles.container}>
			<div className={styles.btnTable}>
				<Button
					onClick={async () => {
						if (isSub) {
							dpChain([
								"ruleStore",
								currentRoute.id,
							]).setIsAddItemDrawerFlag({
								flag: true,
								type: AddItemDrawerType.pos_edit,
								id: id!,
							});
						} else {
							routerHelper.jumpTo(ROUTE_ID.PosEditPage, {
								search: {
									id,
								},
							});
						}
					}}
					style={{ marginRight: 10 }}
					type="primary"
				>
					{commonT`edit`}
				</Button>
				<Button
					onClick={() => {
						if (handleCancel) {
							handleCancel();
						} else {
							appHelper.closeTabByPath();
						}
					}}
				>
					{commonT`cancel`}
				</Button>
			</div>
			<>
				<Card className={styles.infoCard}>
					<InfoCard items={detailConfig}></InfoCard>
				</Card>
				<Card className={styles.posItemsTableCard}>
					<PosItemsTable branchName={branchName} />
				</Card>
			</>
		</div>
	);
};

export default DetailView;
