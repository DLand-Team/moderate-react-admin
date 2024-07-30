import { Button, Card, Form, message } from "antd";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { appHelper, useFlat } from "src/service";
import DetailForm, { TopPartForm } from "../../components/detailForm";
import MarketItemsTable from "../../components/marketItemTable";
import styles from "./index.module.scss";

export interface EditViewProps {
	isSub?: boolean;
	handleCancel?: () => void;
	branchName?: string;
}

const EditView = ({ handleCancel, branchName = "" }: EditViewProps) => {
	// 第一步：通过路由信息判断是否是编辑
	const [formRef] = Form.useForm<TopPartForm>();
	let [searchParams] = useSearchParams();
	const id = searchParams.get("id");
	const {
		addAct,
		updateAct,
		getCurrentDetailAct,
		currentData,
		setCurrentMarketData,
		getLocationListAct,
		isEditing,
	} = useFlat(["marketStore", branchName]);
	useEffect(() => {
		getCurrentDetailAct({
			id,
		});
		getLocationListAct();
		return () => {
			setCurrentMarketData(null);
		};
	}, []);
	const { t } = useTranslation(["market"]);
	const { t: commonT } = useTranslation(["common"]);

	return (
		<div className={styles.marketEditContent}>
			{(!id || (id && currentData)) && (
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
			<div className={styles.btnTable}>
				<Button
					onClick={async () => {
						if (isEditing) {
							message.warning({
								content: commonT`blog.editing`,
							});
							return;
						}
						await formRef.validateFields();
						await (!id ? addAct() : updateAct());
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
		</div>
	);
};
export default EditView;
