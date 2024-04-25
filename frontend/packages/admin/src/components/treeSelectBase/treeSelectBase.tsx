import { TreeSelect, TreeSelectProps } from "antd";
import { useEffect, useState } from "react";
import FormItemHoc, {
	type FormItemHocProps,
} from "src/common/hocs/formItemHoc/formItemHoc";
import { RouterHelper } from "src/service";

const TreeSelectBase = ({
	options = {},
	...rest
}: FormItemHocProps & { options?: TreeSelectProps }) => {
	// 取routerStore中的路由数据
	const [treeData, setTreeData] = useState<any[]>([]);
	useEffect(() => {
		let temp = RouterHelper.generateTreeSelectDataByRoutesTree();
		temp && setTreeData(temp);
	}, []);
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
