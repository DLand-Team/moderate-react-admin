import { DeleteOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { Button, Popover } from "antd";
import { Fragment, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { EditTable } from "src/common/hooks/editTable";
import { useFlat } from "src/service";
import { Connection } from "src/service/stores/ruleStore/model";
import { connectionItem } from "src/shapes";
import columnsCreater from "./columnsCreater";
import "./index.scss";

const connection = (
	props: React.PropsWithChildren<{
		data: Connection[];
		position: number;
		branchName: string;
	}>,
) => {
	const { isDetail: isJustShow } = useFlat("ruleStore", {
		isDetail: "IN",
	});
	const { data = [], position, children, branchName } = props;
	const { t } = useTranslation("rule");
	const { updateConnectionAct, addConnectionAct, deleteConnectionByPosAct } =
		useFlat(["ruleStore", branchName]);
	const { queryMarkettListAct } = useFlat("marketStore");
	useEffect(() => {
		queryMarkettListAct({
			pageNum: 0,
			pageSize: 100,
		});
	}, []);

	let handleCreate = async () => {
		let newCon = { ...connectionItem(), position };
		addConnectionAct(newCon);
	};
	return (
		<div className="connection">
			<div className="connectionTile">
				{`${t("rulePage_connection")}${position}`}
				{!isJustShow && (
					<Button
						disabled={position == 1}
						type="link"
						icon={<DeleteOutlined />}
						style={{
							display: "flex",
							alignItems: "center",
						}}
						onClick={() => {
							deleteConnectionByPosAct({ position });
						}}
					></Button>
				)}
				{!isJustShow && (
					<Fragment>
						<Popover
							content={
								<div
									style={{
										display: "flex",
										alignItems: "center",
									}}
								>
									<InfoCircleOutlined />
									{t("rulePage_warn_deleteCon")}
								</div>
							}
						>
							{/* <Icon className="titleBtn" type="question-circle" /> */}
							<InfoCircleOutlined />
						</Popover>
					</Fragment>
				)}
			</div>
			<EditTable
				tableOptions={{
					scroll: {
						x: "1000px",
					},
				}}
				columnCreater={columnsCreater}
				values={data}
				handleValuesChange={(changedData) => {
					updateConnectionAct(changedData);
				}}
			/>
			{!isJustShow && (
				<Button
					style={{
						margin: "12px 0px",
					}}
					onClick={handleCreate}
				>
					add
				</Button>
			)}
			{children}
		</div>
	);
};

export default connection;
