import { DeleteOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { Button, Popover } from "antd";
import { Fragment, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { EditTable } from "src/common/hooks/editTable";
import { ROUTE_ID } from "src/router/name";
import { useFlat } from "src/service";
import { Connection } from "src/service/stores/ruleStore/model";
import { connectionItem } from "src/shapes";
import columnsCreater from "./columnsCreater";
import styles from "./style.module.scss";

const connection = (
	props: React.PropsWithChildren<{
		data: Connection[];
		position: number;
		branchName: string;
	}>,
) => {
	const { data = [], position, children, branchName } = props;
	const isJustShow = branchName == ROUTE_ID.RuleDetailPage;
	const { t } = useTranslation("rule");
	const { t: commonT } = useTranslation("common");
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
		<div className={styles.container}>
			<div className={styles.connectionTile}>
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
							<InfoCircleOutlined />
						</Popover>
					</Fragment>
				)}
				{!isJustShow && (
					<Button
						style={{
							margin: "12px 0px",
							position: "absolute",
							right: 0,
						}}
						onClick={handleCreate}
					>
						{`${commonT("add")} ${t("connectItem")}`}
					</Button>
				)}
			</div>
			<EditTable
				tableOptions={{
					scroll: {
						x: "100%",
					},
				}}
				columnCreater={(props) => {
					return columnsCreater(props, { branchName });
				}}
				values={data}
				handleValuesChange={(changedData) => {
					updateConnectionAct(changedData);
				}}
			/>

			{children}
		</div>
	);
};

export default connection;
