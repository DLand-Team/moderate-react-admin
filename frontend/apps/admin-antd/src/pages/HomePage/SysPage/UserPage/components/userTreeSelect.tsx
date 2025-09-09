import type { TreeDataNode } from "antd";
import { Form, TreeSelect } from "antd";
import React, { useEffect, useMemo } from "react";
import { cloneDeep, convertArrToTreeData } from "src/common/utils";
import { useFlat } from "src/service";

const UserTreeSelect: React.FC = () => {
  const { queryDeptListAct, deptList } = useFlat("sysStore", {
    deptList: "IN",
  });

  useEffect(() => {
    queryDeptListAct();
  }, []);

  const flatList = cloneDeep(
    deptList.map((item) => {
      return {
        ...item,
        title: item.name,
        key: item.id,
      };
    }),
  );
  const treeData = useMemo(() => {
    const loop = (data: TreeDataNode[]): TreeDataNode[] =>
      data
        .map((item) => {
          const strTitle = item.title as string;

          const title = strTitle;
          if (item.children) {
            return {
              title,
              value: item.key,
              key: item.key,
              children: loop(item.children),
            };
          }

          return {
            title,
            value: item.key,
            key: item.key,
          };
        })
        .filter(Boolean);

    const result = loop(convertArrToTreeData(flatList));
    return result;
  }, [deptList]);

  return (
    <Form.Item name={"deptId"} label={"归属部门"}>
      <TreeSelect treeDefaultExpandAll treeData={treeData} />
    </Form.Item>
  );
};

export default UserTreeSelect;
