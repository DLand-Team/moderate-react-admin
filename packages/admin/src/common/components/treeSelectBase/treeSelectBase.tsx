import FormItemHoc, {
	type FormItemHocProps,
} from "src/common/hocs/formItemHoc/formItemHoc";
import { RouteItem } from "src/config/types";
import { routerHelper, useFlat } from "src/reduxService";
import { TreeSelect, TreeSelectProps } from "antd";
import { useEffect, useState } from "react";

const transformTreeDataLoop = (data: RouteItem[]) => {
	return data.map((item) => {
		if (item.children) {
			return {
				value: item.path,
				title: item.meta.title,
				children: transformTreeDataLoop(item.children),
			};
		} else {
			return {
				value: item.path,
				title: item.meta.title,
			};
		}
	});
};
const TreeSelectBase = ({
	options = {},
	...rest
}: FormItemHocProps & { options?: TreeSelectProps }) => {
	// 取routerStore中的路由数据
	const { routesConfig } = useFlat("routerStore");
	const [treeData, setTreeData] = useState<any[]>([]);
	useEffect(() => {
		let temp = transformTreeDataLoop(routesConfig);
		setTreeData(temp);
	}, [routesConfig]);
	return (
		<FormItemHoc {...rest}>
			<TreeSelect
				showSearch
				style={{ width: "100%" }}
				dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
				placeholder="Please select"
				allowClear
				treeDefaultExpandAll
				treeData={treeData}
			/>
		</FormItemHoc>
	);
};

export default TreeSelectBase;
