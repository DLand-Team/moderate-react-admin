import React, { useEffect, useState } from "react";
import { TreeSelect, TreeSelectProps } from "antd";
import { useFlatInject } from "@/common/hooks";
import { RouteItem } from "@/config/types";
import FormItemHoc, {
  type FormItemHocProps,
} from "@/common/hocs/formItemHoc/formItemHoc";

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
  options={},
  ...rest
}: FormItemHocProps & { options?: TreeSelectProps }) => {
  // 取routerStore中的路由数据
  const [routerStore] = useFlatInject("routerStore");
  const { routesData } = routerStore;
  const [treeData, setTreeData] = useState<any[]>([]);
  useEffect(() => {
    let temp = transformTreeDataLoop(routesData);
    setTreeData(temp);
  }, [routesData]);
  return (
    <FormItemHoc  {...rest}>
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
