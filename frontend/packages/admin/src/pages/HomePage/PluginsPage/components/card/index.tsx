import {
	DownloadOutlined,
	EllipsisOutlined,
	GithubOutlined,
	CheckOutlined,
} from "@ant-design/icons";
import { Avatar, Card, Modal, Tooltip, message } from "antd";
import React from "react";
import { useFlat } from "src/service";
import { Plugin } from "src/service/stores/devStore/model";

const { Meta } = Card;

const PluginCard: React.FC<{ data: Plugin }> = ({ data }) => {
	const { setIsShowMdDrawer } = useFlat("appStore");
	const { addPluginAct, getPluginAct } = useFlat("devStore");
	const { cover, name, author, desc, gitee, isInstalled } = data;
	const { name: authorName, avatar } = author;
	const [messageApi, contextHolder] = message.useMessage();
	return (
		<Card
			style={{ width: 300, boxShadow: "0 0 8px rgba(0, 0, 0, 0.1)" }}
			cover={<img height={"160px"} alt="example" src={cover} />}
			onClick={async () => {
				await getPluginAct({
					url: gitee,
				});
				setIsShowMdDrawer(true);
			}}
			actions={[
				<div
					onClick={(e) => {
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
					<EllipsisOutlined key="ellipsis" />
					<div>更多</div>
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
