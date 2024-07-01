import React, { useEffect, useState, MouseEventHandler } from "react";
import classNames from "classnames";
import { Graph, StringExt } from "@antv/x6";
import { Tree } from "antd";
import { DownOutlined } from "@ant-design/icons";
import type { DataNode } from "antd/es/tree";
import { useModel } from "../../../hooks/useModel";
import ELNode from "../../../model/node";
import { getIconByType } from "../../../cells";
import styles from "./index.module.scss";

interface IProps {
	flowGraph: Graph;
}

const TreeNodeTitle: React.FC<{
	model: ELNode;
	onClick: MouseEventHandler<HTMLDivElement>;
}> = ({ model, onClick }) => {
	const { id, type } = model;
	return (
		<div
			className={classNames(styles.liteflowEditorOutlineTitle)}
			onClick={onClick}
		>
			<span>{id ? `${id} : ${type}` : type}</span>
		</div>
	);
};

const Outline: React.FC<IProps> = (props) => {
	const { flowGraph } = props;
	const model = useModel();
	const initialkeys: string[] = [];
	const [treeData, setTreeData] = useState<DataNode[]>(
		model ? [transformer(model, initialkeys)] : [],
	);
	const [expandedKeys, setExpandedKeys] = useState<string[]>(initialkeys);

	function transformer(currentModel: ELNode, keys: string[]): DataNode {
		const handleClick = () => {
			flowGraph.cleanSelection();
			flowGraph.select(currentModel.getNodes());
			// flowGraph.centerCell(currentModel.getNodes()[0]);
			flowGraph.positionCell(currentModel.getNodes()[0], "left", {
				padding: { left: 240 },
			});
			flowGraph.trigger("model:select", currentModel);
		};
		const key = `${currentModel.type}-${StringExt.uuid()}`;
		keys.push(key);
		const node: DataNode = {
			title: <TreeNodeTitle model={currentModel} onClick={handleClick} />,
			key,
			icon: (
				<div
					className={styles.liteflowEditorOutlineIcon}
					onClick={handleClick}
				>
					<img
						className={styles.liteflowEditorOutlineImage}
						src={getIconByType(currentModel.type)}
					/>
				</div>
			),
		};
		node.children = [];
		if (currentModel.condition) {
			node.children.push(transformer(currentModel.condition, keys));
		}
		if (currentModel.children) {
			node.children = node.children.concat(
				currentModel.children.map((item) => transformer(item, keys)),
			);
		}
		return node;
	}

	useEffect(() => {
		const handleModelChange = () => {
			const model = useModel();
			if (model) {
				const keys: string[] = [];
				setTreeData([transformer(model, keys)]);
				setExpandedKeys(keys);
				return;
			}
			setTreeData([]);
		};
		flowGraph.on("model:change", handleModelChange);
		return () => {
			flowGraph.off("model:change", handleModelChange);
		};
	}, [flowGraph, setTreeData]);

	return (
		<div className={styles.liteflowEditorOutlineContainer}>
			<Tree
				blockNode
				showIcon
				showLine={{ showLeafIcon: false }}
				switcherIcon={<DownOutlined />}
				expandedKeys={expandedKeys}
				selectedKeys={[]}
				treeData={treeData}
				style={{
					height: "100vh",
          width:'100%'
				}}
			/>
		</div>
	);
};

export default Outline;
