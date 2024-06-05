import {
	CheckOutlined,
	DownloadOutlined,
	EllipsisOutlined,
	GithubOutlined,
} from "@ant-design/icons";
import { Avatar, Card, Dropdown, Modal, Space, Tooltip, message } from "antd";
import React from "react";
import { useFlat } from "src/service";
import { Plugin } from "src/service/stores/devStore/model";

const { Meta } = Card;

const PluginCard: React.FC<{ data: Plugin }> = ({ data }) => {
	const { setIsShowMdDrawer } = useFlat("appStore");
	const { addPluginAct, loadPluginDetailAct, removePluginAct } =
		useFlat("devStore");
	const { cover, name, author, desc, gitee, isInstalled } = data;
	const { name: authorName, avatar } = author;
	const [messageApi, contextHolder] = message.useMessage();
	return (
		<Card
			style={{ width: "100%", boxShadow: "0 0 8px rgba(0, 0, 0, 0.1)" }}
			cover={
				<img
					height={"160px"}
					alt="example"
					src={cover}
					style={{
						objectFit: "cover",
					}}
				/>
			}
			onClick={async () => {
				await loadPluginDetailAct({
					url: gitee,
				});
				setIsShowMdDrawer(true);
			}}
			actions={[
				<div
					onClick={(e) => {
						if (process.env.NODE_ENV === "production") {
							return message.info("仅支持开发环境中操作～");
						}
						e.stopPropagation();
						if (isInstalled) return;
						messageApi.open({
							type: "loading",
							content: "Action in progress..",
							duration: 0,
						});
						addPluginAct({
							url: gitee,
						}).then(() => {
							messageApi.destroy();
							Modal.confirm({
								content:
									"插件安装成功，点确定刷新页面以显示更新",
								onOk() {
									window.location.reload();
								},
							});
						});
					}}
				>
					{isInstalled ? (
						<CheckOutlined></CheckOutlined>
					) : (
						<DownloadOutlined key="DownloadOutlined" />
					)}
					<div>{isInstalled ? "已安装" : "安装"}</div>
				</div>,
				<div
					onClick={(e) => {
						e.stopPropagation();
						window.open(gitee);
					}}
				>
					<GithubOutlined key="edit" />
					<div>源码</div>
				</div>,
				<div>
					<Dropdown
						menu={{
							items: [
								{
									label: "卸载",
									key: "remove",
								},
							],
							selectable: true,
							defaultSelectedKeys: ["3"],
							onClick: () => {
								if (process.env.NODE_ENV === "production") {
									return message.info(
										"仅支持开发环境中操作～",
									);
								}
								if (
									[
										"moderate-plugin-winbox",
										"moderate-plugin-rive",
									].includes(name)
								) {
									return message.info(
										"核心插件，仅支持手动删除",
									);
								}
								removePluginAct({
									url: gitee,
								});
							},
						}}
					>
						<Space>
							<div>
								<EllipsisOutlined key="ellipsis" />
								<div>更多</div>
							</div>
						</Space>
					</Dropdown>
				</div>,
			]}
		>
			<Meta
				avatar={
					<Tooltip title={authorName} color="#2db7f5">
						<Avatar src={avatar} />
					</Tooltip>
				}
				title={name}
				description={
					<div
						style={{
							height: "40px",
						}}
					>
						{desc}
					</div>
				}
			/>
			{contextHolder}
		</Card>
	);
};

export default PluginCard;
