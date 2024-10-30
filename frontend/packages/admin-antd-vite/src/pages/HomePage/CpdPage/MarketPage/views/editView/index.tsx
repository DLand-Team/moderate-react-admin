import { Button, Card, Form, message } from "antd";
import { useTranslation } from "react-i18next";
import { ROUTE_ID } from "src/router";
import { appHelper, useFlat } from "src/service";
import DetailForm, { TopPartForm } from "../../components/detailForm";
import MarketItemsTable from "../../components/marketItemTable";
import styles from "./index.module.scss";

export interface EditViewProps {
	isSub?: boolean;
	id?: string | number;
	handleCancel?: () => void;
	branchName?: string;
}

const EditView = ({ handleCancel, branchName = "" }: EditViewProps) => {
	// 第一步：通过路由信息判断是否是编辑
	const [formRef] = Form.useForm<TopPartForm>();
	const { addAct, updateAct, currentData, isEditing } = useFlat(
		["marketStore", branchName],
		{
			isEditing: "IN",
			currentData: "IN",
		},
	);

	const { t } = useTranslation(["market"]);
	const { t: commonT } = useTranslation(["common"]);
	const isLoading = !currentData;
	const isAddPage = branchName == ROUTE_ID.MarketAddPage;

	return (
		<div className={styles.container}>
			<div className={styles.btnTable}>
				<Button
					onClick={async () => {
						if (isEditing) {
							message.warning({
								content: commonT`blog.editing`,
							});
							return;
						}
						if (!currentData?.cpdMarketItems.length) {
							return message.error({
								content: t`marketPage.addOneMarketITEM`,
							});
						}
						await formRef.validateFields();
						await (isAddPage ? addAct() : updateAct());
						message.success({
							content: t`marketPage.succeed`,
						});
						if (handleCancel) {
							handleCancel();
						} else {
							appHelper.closeTabByPath();
						}
					}}
					style={{ marginRight: 10 }}
					type="primary"
				>
					{t`marketPage.save`}
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
					{t`marketPage.cancel`}
				</Button>
			</div>
			{!isLoading && (
				<>
					<Card
						style={{
							marginBottom: "12px",
						}}
					>
						<DetailForm
							branchName={branchName}
							formRef={formRef}
						></DetailForm>
					</Card>
					<Card
						style={{
							marginBottom: "30px",
						}}
					>
						<MarketItemsTable
							branchName={branchName}
						></MarketItemsTable>
					</Card>
				</>
			)}
		</div>
	);
};
export default EditView;
