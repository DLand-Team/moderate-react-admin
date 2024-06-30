import { Button, Card, Drawer, Form, message } from "antd";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useBeforeUnload, useSearchParams } from "react-router-dom";
import FilterModalForm from "src/pages/HomePage/TemplatePage/FilterPage/FilterListPage/components/modalForm/modalForm";
import SortModalForm from "src/pages/HomePage/TemplatePage/SortPage/SortListPage/components/modalForm/modalForm";
import { AppHelper, useFlat } from "src/service";
import { AddItemDrawerType } from "src/service/stores/ruleStore/model";
import MarketEditPage from "../../MarketPage/MarketEditPage";
import PosEditPage from "../../PosPage/PosEditPage";
import TablePart from "../components/tablePart";
import TopForm, { TopPartForm } from "../components/topForm";
import "./index.scss";

const Page = () => {
	// 第一步：通过路由信息判断是否是编辑
	const [formRef] = Form.useForm<TopPartForm>();
	let [searchParams] = useSearchParams();
	const id = searchParams.get("id");
	const {
		addAct,
		updateAct,
		itineraryList,
		initCurrentDataAct,
		currentData,
		setCurrentRuleData,
		isAddItemDrawerFlag,
		setIsAddItemDrawerFlag,
		addItemType,
	} = useFlat(["ruleStore", "add"]);
	useBeforeUnload(() => {
		AppHelper.closeTabByPath();
	});
	useEffect(() => {
		initCurrentDataAct({
			id,
		});
		return () => {
			setCurrentRuleData(null);
		};
	}, []);
	const { t } = useTranslation(["rule"]);
	return (
		<div className="ruleEditContent">
			<FilterModalForm />
			<SortModalForm />
			{/* 无id，则为添加，直接显示 */}
			{/* 有id，则为修改，为了回显ok，保证数据获得再显示 */}
			{(!id || (id && currentData)) && (
				<>
					<Card
						style={{
							marginBottom: "12px",
						}}
					>
						<TopForm branchName={"add"} formRef={formRef}></TopForm>
					</Card>
					<Card
						style={{
							minHeight: "300px",
							marginBottom: "30px",
						}}
					>
						<TablePart branchName={"add"}></TablePart>
					</Card>
				</>
			)}
			<div className="btnTable">
				<Button
					onClick={async () => {
						await formRef.validateFields();
						const values = formRef.getFieldsValue();
						values.effectStartDate =
							values.effectDateData![0].toString();
						values.effectEndDate =
							values.effectDateData![1].toString();
						delete values.effectDateData;
						const newData = {
							...values,
							cpdRuleItinerarys: itineraryList,
						};
						// 转换生效日期范围
						await (!id
							? addAct(newData)
							: updateAct({ ...currentData, ...newData }));
						message.success({
							content: t`rulePage_succeed`,
						});
						AppHelper.closeTabByPath();
					}}
					style={{ marginRight: 10 }}
					type="primary"
				>
					{t`rulePage_save`}
				</Button>
				<Button
					onClick={() => {
						AppHelper.closeTabByPath();
					}}
				>
					{t`rulePage_cancel`}
				</Button>
			</div>
			<Drawer
				width={"40%"}
				onClose={() => {
					setIsAddItemDrawerFlag({
						flag: false,
						type: "",
					});
				}}
				open={isAddItemDrawerFlag}
				title={
					addItemType == AddItemDrawerType.market
						? t("add_market")
						: t("add_pos")
				}
			>
				{AddItemDrawerType.market === addItemType && (
					<MarketEditPage
						isSub={true}
						handleCancel={() => {
							setIsAddItemDrawerFlag({
								flag: false,
								type: "",
							});
						}}
					/>
				)}
				{AddItemDrawerType.pos === addItemType && (
					<PosEditPage
						handleCancel={() => {
							setIsAddItemDrawerFlag({
								flag: false,
								type: "",
							});
						}}
					/>
				)}
			</Drawer>
		</div>
	);
};
export default Page;
