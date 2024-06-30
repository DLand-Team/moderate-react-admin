import {
	Button,
	Card,
	DescriptionsProps,
	Drawer,
	Form,
	Modal,
	Skeleton,
} from "antd";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import InfoCard from "src/components/infoCard";
import TablePart from "src/pages/HomePage/TemplatePage/RulePage/components/tablePart";
import { AppHelper, useFlat } from "src/service";
import { AddItemDrawerType } from "src/service/stores/ruleStore/model";
import MarketEditPage from "../../MarketPage/MarketEditPage";
import PosEditPage from "../../PosPage/PosEditPage";
import { TopPartForm } from "./components/topForm";
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
		setIsDetail,
	} = useFlat(["ruleStore", "detail"]);
	useEffect(() => {
		setIsDetail(true);
		initCurrentDataAct({
			id,
		});
		return () => {
			setIsDetail(false);
			setCurrentRuleData(null);
		};
	}, []);
	const { t } = useTranslation(["rule"]);
	const { posList, queryPostListAct } = useFlat("posStore", {
		posList: "IN",
	});
	const { marketList, queryMarkettListAct } = useFlat("marketStore", {
		marketList: "IN",
	});
	const { list: sortList, queryListAct } = useFlat("sortStore", {
		list: "IN",
	});
	const { list: filterList, queryListAct: queryFilterListAct } = useFlat(
		"filterStore",
		{
			list: "IN",
		},
	);
	useEffect(() => {
		queryPostListAct();
		queryMarkettListAct();
		queryListAct();
		queryFilterListAct();
	}, []);
	const items: DescriptionsProps["items"] = [
		{
			label: t`rulePage_ruleName`,
			children: currentData?.ruleName || (
				<Skeleton.Input block={true} active={true} />
			),
			span: { xl: 4, xxl: 4 },
		},
		{
			label: t`rulePage_originMarket`,
			children: currentData ? (
				marketList
					.filter((item) => {
						return item.marketType === 0;
					})
					.find((item) => {
						return item.id == currentData!?.oriMarketId;
					})?.marketName
			) : (
				<Skeleton.Input block={true} active={true} />
			),
			span: 3,
		},
		{
			label: t`rulePage_destinationMarket`,
			span: 1,
			children: currentData ? (
				currentData?.desMarketId
			) : (
				<Skeleton.Input block={true} active={true} />
			),
		},
		{
			label: t`rulePage_pos`,
			span: 3,
			children: currentData ? (
				posList.find((item) => {
					return item.id == currentData!.posId;
				})?.posName
			) : (
				<Skeleton.Input block={true} active={true} />
			),
		},
		{
			label: t`rulePage_applyProduct`,
			span: 2,
			children: currentData ? (
				[
					[1, "ISHOP"],
					[2, "DSHOP"],
				].find((item) => {
					return item[0] == currentData?.applyProduct;
				})?.[1]
			) : (
				<Skeleton.Input block={true} active={true} />
			),
		},
		{
			label: t`rulePage_effectDateRange`,
			span: 4,
			children: currentData ? (
				currentData?.effectStartDate ? (
					`${dayjs(currentData?.effectStartDate).format("YYYY-MM-DD")}~${dayjs(
						currentData?.effectEndDate,
					).format("YYYY-MM-DD")}`
				) : (
					""
				)
			) : (
				<Skeleton.Input block={true} active={true} />
			),
		},
		{
			label: t`rulePage_sortItem`,
			span: 3,
			children: currentData ? (
				sortList.find((item) => {
					return String(item.id) == String(currentData!.sortItemId);
				})?.sortItemName
			) : (
				<Skeleton.Input block={true} active={true} />
			),
		},
		{
			label: t`rulePage_filterItem`,
			span: 2,
			children: currentData ? (
				filterList.find((item) => {
					return String(item.id) == String(currentData!.filterItemId);
				})?.filterItemName
			) : (
				<Skeleton.Input block={true} active={true} />
			),
		},
		{
			label: t`rulePage_sequenceNo`,
			span: 2,
			children: currentData ? (
				currentData?.sequenceNo
			) : (
				<Skeleton.Input block={true} active={true} />
			),
		},
		{
			label: t`rulePage_active`,
			span: 1,
			children: currentData ? (
				currentData?.status ? (
					"true"
				) : (
					"false"
				)
			) : (
				<Skeleton.Input block={true} active={true} />
			),
		},
		{
			label: t`rulePage_backupResult`,
			span: 2,
			children: currentData ? (
				currentData?.backupResult ? (
					"true"
				) : (
					"false"
				)
			) : (
				<Skeleton.Input block={true} active={true} />
			),
		},
		{
			label: t`rulePage.comment`,
			span: 12,
			children: currentData ? (
				currentData?.comment
			) : (
				<Skeleton.Input block={true} active={true} />
			),
		},
	];
	return (
		<div className="ruleEditContent">
			{/* 无id，则为添加，直接显示 */}
			{/* 有id，则为修改，为了回显ok，保证数据获得再显示 */}
			<>
				<Card
					style={{
						marginBottom: "12px",
					}}
				>
					<InfoCard items={items}></InfoCard>
				</Card>
				<Card
					style={{
						minHeight: "300px",
						marginBottom: "30px",
					}}
				>
					<TablePart branchName="detail"></TablePart>
				</Card>
			</>
			<div className="btnTable">
				<Button
					onClick={async () => {
						await formRef.validateFields();
						const values = formRef.getFieldsValue();
						Modal.info({
							content: JSON.stringify(values),
						});
						values.effectStartDate = values.effectDateData![0];
						values.effectEndDate = values.effectDateData![1];
						delete values.effectDateData;
						const newData = {
							...values,
							cpdRuleItinerarys: itineraryList,
						};
						// 转换生效日期范围
						await (!id
							? addAct(newData)
							: updateAct({ ...currentData, ...newData }));
						// message.success({
						//   content: t`rulePage_succeed`,
						// });
						// AppHelper.closeTabByPath();
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
