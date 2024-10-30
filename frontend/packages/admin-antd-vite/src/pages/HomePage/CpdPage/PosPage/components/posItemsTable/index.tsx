// 用处： 详情，编辑和添加页面下方的table部分
import { PlusOutlined } from "@ant-design/icons";
import { Button, Typography, message } from "antd";
import { useTranslation } from "react-i18next";
import { EditTable, Wrapper } from "src/components/editTable";
import { UUID } from "src/common/utils";
import { useFlat } from "src/service";
import type { PosItem } from "src/service/stores/posStore/model";
import columnsCreater from "./columnsCreater";
import { ROUTE_ID } from "src/router";

const WrapperComp: Wrapper<PosItem> = ({
	children,
	editingKey,
	dataList,
	edit,
	branchName,
}) => {
	const { t } = useTranslation(["pos"]);
	const { t: commonT } = useTranslation(["common"]);
	const {
		setIsEditing,
		currentData,
		setCurrentDetail,
		setPosItemsTablePageNum,
	} = useFlat(["posStore", branchName], {
		currentData: "IN",
	});
	const isDetail = branchName == ROUTE_ID.PosDetailPage;
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
						const newItem = {
							uid: UUID(),
						} as PosItem;
						const nweList = [...dataList, newItem];
						setPosItemsTablePageNum(Math.ceil(nweList.length / 5));
						edit(newItem);
						setCurrentDetail({
							...currentData!,
							cpdPosItems: nweList,
						});
						setIsEditing(true);
					}}
					icon={<PlusOutlined />}
					type="dashed"
				>
					{t`posPage.addLine`}
				</Button>
			)}
		</>
	);
};

const PosItemsTable = ({ branchName }: { branchName: string }) => {
	const {
		posItemsTablePageNum,
		currentData,
		setCurrentDetail,
		setPosItemsTablePageNum,
	} = useFlat(["posStore", branchName], {
		currentData: "IN",
		posItemsTablePageNum: "IN",
	});
	const { t } = useTranslation(["pos"]);
	return (
		<>
			<Typography
				style={{
					fontSize: "16px",
					marginBottom: "30px",
				}}
			>
				{t("posPage.itemListTitle")}
			</Typography>
			<EditTable<PosItem>
				tableOptions={{
					pagination: {
						current: posItemsTablePageNum,
						onChange(page) {
							setPosItemsTablePageNum(page);
						},
					},
				}}
				columnCreater={(props) => {
					return columnsCreater(props, { branchName });
				}}
				values={currentData?.cpdPosItems || []}
				Wrapper={(props) => {
					return <WrapperComp {...props} branchName={branchName} />;
				}}
				handleValuesChange={({ allData }) => {
					setCurrentDetail({
						...currentData!,
						cpdPosItems: allData,
					});
				}}
			/>
		</>
	);
};

export default PosItemsTable;
