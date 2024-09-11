import { DeleteOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { Button, Modal, Popover, message } from "antd";
import { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { EditTable } from "src/components/editTable";
import { ROUTE_ID } from "src/router";
import { useFlat } from "src/service";
import type { Connection } from "src/service/stores/ruleStore/model";
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
	const {
		conByPosList,
		updateConnectionAct,
		addConnectionAct,
		deleteConnectionByPosAct,
		deleteSegmentByPosAct,
	} = useFlat(["ruleStore", branchName]);
	const { queryMarkettListAct } = useFlat("marketStore");
	useEffect(() => {
		queryMarkettListAct({
			pageNum: 0,
			pageSize: 100,
		});
	}, []);

	let handleCreate = async (newCon: Connection) => {
		addConnectionAct(newCon);
	};
	const [page, setPage] = useState(1);
	return (
		<div className={styles.container}>
			<EditTable
				Wrapper={({ children, edit }) => {
					return (
						<>
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
											if (
												conByPosList
													.slice(-1)?.[0]
													?.slice(-1)?.[0].position ==
												position
											) {
												Modal.confirm({
													title: commonT`blog.modalDeleteTitle`,
													content: commonT`blog.modalDeleteContent`,
													onOk: async () => {
														deleteConnectionByPosAct(
															{
																position,
															},
														);
														if (position == 1) {
															deleteSegmentByPosAct(
																{
																	position: 1,
																},
															);
															deleteSegmentByPosAct(
																{
																	position: 2,
																},
															);
														} else {
															deleteSegmentByPosAct(
																{
																	position:
																		position +
																		1,
																},
															);
														}
													},
													okText: commonT`blog.Yes`,
													cancelText: commonT`blog.No`,
												});
											} else {
												message.warning({
													content: t(
														"rulePage_warn_deleteCon",
													),
												});
											}
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
													{t(
														"rulePage_warn_deleteCon",
													)}
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
										onClick={() => {
											let newCon = {
												...connectionItem(),
												position,
											};
											setPage(
												Math.ceil(
													(data.length + 1) / 5,
												),
											);
											edit(newCon);
											handleCreate(newCon);
										}}
									>
										{`${commonT("add")} ${t(
											"connectItem",
										)}`}
									</Button>
								)}
							</div>
							{children}
						</>
					);
				}}
				tableOptions={{
					scroll: {
						x: "100%",
					},
					pagination: {
						current: page,
						onChange(page) {
							setPage(page);
						},
					},
				}}
				columnCreater={(props) => {
					return columnsCreater(props, { branchName });
				}}
				values={data}
				handleValuesChange={({ changedData }) => {
					updateConnectionAct(changedData);
				}}
			/>
			{children}
		</div>
	);
};

export default connection;
