import { PlusOutlined } from "@ant-design/icons";
import { Button, Typography, message } from "antd";
import { useTranslation } from "react-i18next";
import { EditTable, Wrapper } from "src/components/editTable";
import { UUID } from "src/common/utils";
import { useFlat } from "src/service";
import type { MarketItem } from "src/service/stores/marketStore/model";
import columnsCreater from "./columnsCreater";
import { ROUTE_ID } from "src/router";
import { useActive } from "src/common/hooks";
import { MarketItemCreater } from "src/shapes/market";

const WrapperComp: Wrapper<MarketItem> = ({
	children,
	editingKey,
	dataList,
	edit,
	branchName,
}) => {
	const { t } = useTranslation(["market"]);
	const { t: commonT } = useTranslation(["common"]);
	const {
		currentData,
		setCurrentMarketData,
		setMarketItemtablePageNum,
		setIsEditing,
	} = useFlat(["marketStore", branchName], {
		currentData: "IN",
	});
	const isDetail = branchName == ROUTE_ID.MarketDetailPage;
	return (
		<>
			{children}
			{!isDetail && (
				<Button
					style={{
						marginTop: "30px",
					}}
					onClick={() => {
						if (editingKey) {
							message.warning({
								content: commonT`blog.editing`,
							});
							return;
						}
						const newData = MarketItemCreater({
							uid: UUID(),
						});
						const neList = [...dataList, newData];
						edit(newData);
						setMarketItemtablePageNum(Math.ceil(neList.length / 5));
						setCurrentMarketData({
							...currentData!,
							cpdMarketItems: neList,
						});
						setIsEditing(true);
					}}
					icon={<PlusOutlined />}
					type="dashed"
				>
					{t`marketPage.addLine`}
				</Button>
			)}
		</>
	);
};

const MarketItemsTable = ({ branchName }: { branchName: string }) => {
	const {
		currentData,
		setCurrentMarketData,
		marketItemtablePageNum,
		setMarketItemtablePageNum,
	} = useFlat(["marketStore", branchName], {
		currentData: "IN",
		marketItemtablePageNum: "IN",
	});
	const { t } = useTranslation(["market"]);
	useActive({
		onActive() {
			setMarketItemtablePageNum(1);
		},
	});
	return (
		<>
			<Typography
				style={{
					fontSize: "16px",
					marginBottom: "30px",
				}}
			>
				{t("marketPage.itemlistTile")}
			</Typography>
			<EditTable<MarketItem>
				tableOptions={{
					pagination: {
						current: marketItemtablePageNum,
						onChange(page) {
							setMarketItemtablePageNum(page);
						},
					},
				}}
				columnCreater={(props) => {
					return columnsCreater(props, { branchName });
				}}
				values={currentData?.cpdMarketItems || []}
				Wrapper={(props) => {
					return <WrapperComp {...props} branchName={branchName} />;
				}}
				handleValuesChange={({ allData }) => {
					setCurrentMarketData({
						...currentData!,
						cpdMarketItems: allData,
					});
				}}
			/>
		</>
	);
};

export default MarketItemsTable;
