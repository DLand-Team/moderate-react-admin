import { Graph, Node } from "@antv/x6";
import "@antv/x6-react-shape";
import {
	ConditionTypeEnum,
	NODE_HEIGHT,
	NODE_WIDTH,
	NodeTypeEnum,
} from "../constant";
/** AntV X6自定义节点 */
// 开始 & 结束
import { default as End } from "./end";
import { default as Start } from "./start";
// 顺序：串行、并行
import { default as Common } from "./common";
import { default as IntermediateEnd } from "./intermediate-end";
import { default as Then } from "./then";
import { default as When } from "./when";
// 分支：选择、条件
import { default as If } from "./if";
import { default as Switch } from "./switch";
// 循环：For、While
import { default as For } from "./for";
import { default as While } from "./while";
// 捕获异常：Catch
import { default as Catch } from "./catch";
// 运算符：与或非
import { default as And } from "./and";
import { default as Not } from "./not";
import { default as Or } from "./or";
// 其他辅助节点：虚节点
import { default as Virtual } from "./virtual";

// AntV X6自定义节点的视图：使用React组件
import { NodeBadge, NodeToolBar, NodeView } from "../components";

/** 注册自定义节点到AntV X6 */
[
	Start,
	End,
	Then,
	When,
	Common,
	IntermediateEnd,
	If,
	Switch,
	For,
	While,
	Catch,
	And,
	Or,
	Not,
	Virtual,
].forEach((cell: LiteFlowNode) => {
	// 注册AntV X6节点
	const { type, label, icon, node = {} } = cell;
	Graph.registerNode(type, {
		// primer: 'circle',
		inherit: "react-shape",
		component(node: Node) {
			return (
				//@ts-ignore
				<NodeView node={node} icon={icon}>
					<NodeBadge node={node} />
					<NodeToolBar node={node} />
				</NodeView>
			);
		},
		width: NODE_WIDTH,
		height: NODE_HEIGHT,
		attrs: {
			label: {
				refX: 0.5,
				refY: "100%",
				refY2: 20,
				text: label,
				fill: "#333",
				fontSize: 13,
				textAnchor: "middle",
				textVerticalAnchor: "middle",
				textWrap: {
					width: 80,
					height: 60,
					ellipsis: true,
					breakWord: true,
				},
			},
		},
		...node,
	});
});

export {
	And,
	Catch,
	Common,
	End,
	For,
	If,
	IntermediateEnd,
	Not,
	Or,
	Start,
	Switch,
	Then,
	Virtual,
	When,
	While,
};

export interface IGroupItem {
	key: string;
	name: string;
	cellTypes: LiteFlowNode[];
}

export const NODE_GROUP: IGroupItem = {
	key: "node",
	name: "节点类",
	cellTypes: [{ ...Common, type: NodeTypeEnum.COMMON, shape: Common.type }],
};

export const SEQUENCE_GROUP: IGroupItem = {
	key: "sequence",
	name: "顺序类",
	cellTypes: [
		{ ...Then, type: ConditionTypeEnum.THEN, shape: Then.type },
		{ ...When, type: ConditionTypeEnum.WHEN, shape: When.type },
	],
};

export const BRANCH_GROUP: IGroupItem = {
	key: "branch",
	name: "分支类",
	cellTypes: [
		{ ...Switch, type: ConditionTypeEnum.SWITCH, shape: Switch.type },
		{ ...If, type: ConditionTypeEnum.IF, shape: If.type },
	],
};

export const CONTROL_GROUP: IGroupItem = {
	key: "control",
	name: "循环类",
	cellTypes: [
		{ ...For, type: ConditionTypeEnum.FOR, shape: For.type },
		{ ...While, type: ConditionTypeEnum.WHILE, shape: While.type },
	],
};

export const OTHER_GROUP: IGroupItem = {
	key: "other",
	name: "其他类",
	cellTypes: [
		{ ...Catch, type: ConditionTypeEnum.CATCH, shape: Catch.type },
		{ ...And, type: ConditionTypeEnum.AND, shape: And.type },
		{ ...Or, type: ConditionTypeEnum.OR, shape: Or.type },
		{ ...Not, type: ConditionTypeEnum.NOT, shape: Not.type },
	],
};

export const getIconByType = (nodeType: ConditionTypeEnum | NodeTypeEnum) => {
	switch (nodeType) {
		case ConditionTypeEnum.THEN:
			return Then.icon;
		case ConditionTypeEnum.WHEN:
			return When.icon;
		case ConditionTypeEnum.SWITCH:
		case NodeTypeEnum.SWITCH:
			return Switch.icon;
		case ConditionTypeEnum.IF:
		case NodeTypeEnum.IF:
			return If.icon;
		case ConditionTypeEnum.FOR:
		case NodeTypeEnum.FOR:
			return For.icon;
		case ConditionTypeEnum.WHILE:
		case NodeTypeEnum.WHILE:
			return While.icon;
		case ConditionTypeEnum.CHAIN:
			return Start.icon;
		case ConditionTypeEnum.CATCH:
			return Catch.icon;
		case ConditionTypeEnum.AND:
			return And.icon;
		case ConditionTypeEnum.OR:
			return Or.icon;
		case ConditionTypeEnum.NOT:
			return Not.icon;
		case NodeTypeEnum.COMMON:
		default:
			return Common.icon;
	}
};
