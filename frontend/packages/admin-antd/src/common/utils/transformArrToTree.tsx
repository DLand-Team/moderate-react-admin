interface FlatItem {
	id: number;
	name: string;
	parentId: number;
}

interface TreeNode {
	key: number | string;
	title: string;
	children?: TreeNode[];
}

/**
 * 将扁平数组转换为树形结构（Ant Design Tree 所需格式）
 * @param data 扁平数据数组
 * @param parentId 父节点ID（默认为0，表示根节点）
 * @returns 树形结构数组
 */
export function convertArrToTreeData(
	data: FlatItem[],
	parentId: number = 0,
): TreeNode[] {
	// 过滤出当前父节点的所有子节点
	const children = data.filter((item) => item.parentId === parentId);

	// 如果没有子节点，返回空数组
	if (children.length === 0) {
		return [];
	}

	// 将子节点转换为树节点
	return children.map((child) => {
		// 递归查找当前节点的子节点
		const nodeChildren = convertArrToTreeData(data, child.id);

		// 构建树节点
		const treeNode: TreeNode = {
			key: child.id, // Ant Design Tree 需要 key
			title: child.name, // Ant Design Tree 需要 title
		};

		// 如果有子节点，添加到 children 属性
		if (nodeChildren.length > 0) {
			treeNode.children = nodeChildren;
		}

		return treeNode;
	});
}
