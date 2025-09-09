import type { TreeDataNode } from "antd";
import { Input, Tree } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { cloneDeep, convertArrToTreeData } from "src/common/utils";
import { useFlat } from "src/service";

const { Search } = Input;

const UserTree: React.FC = () => {
  const { queryDeptListAct, deptList, setCurrentDeptId } = useFlat("sysStore", {
    deptList: "IN",
  });

  const [expandedKeys, setExpandedKeys] = useState<number[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [autoExpandParent, setAutoExpandParent] = useState(true);

  useEffect(() => {
    queryDeptListAct();
  }, []);
  const onExpand = (newExpandedKeys: React.Key[]) => {
    setExpandedKeys(newExpandedKeys as number[]);
    setAutoExpandParent(false);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const newExpandedKeys = deptList
      .map((item) => {
        if (item.name.indexOf(value) > -1) {
          return item.parentId;
        }
        return null;
      })
      .filter((item) => {
        return item;
      });

    setExpandedKeys(newExpandedKeys as number[]);
    setSearchValue(value);
    setAutoExpandParent(true);
  };
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
          const index = strTitle.indexOf(searchValue);
          const beforeStr = strTitle.substring(0, index);
          const afterStr = strTitle.slice(index + searchValue.length);

          const title =
            index > -1 ? (
              <span key={item.key}>
                {beforeStr}
                <span
                  style={{
                    color: "#f50",
                  }}
                >
                  {searchValue}
                </span>
                {afterStr}
              </span>
            ) : (
              <span key={item.key}>{strTitle}</span>
            );
          if (item.children) {
            return {
              title,
              key: item.key,
              children: loop(item.children),
            };
          }

          return {
            title,
            key: item.key,
          };
        })
        .filter(Boolean);

    const result = loop(convertArrToTreeData(flatList));
    return result;
  }, [searchValue, deptList]);

  useEffect(() => {
    let expandKeys: number[] = [];
    deptList.forEach((item) => {
      expandKeys.push(item.id);
    });
    setExpandedKeys(expandKeys);
  }, [deptList]);

  return (
    <div>
      <Search
        style={{ marginBottom: 8 }}
        placeholder="Search"
        onChange={onChange}
      />
      <Tree
        onExpand={onExpand}
        expandedKeys={expandedKeys}
        autoExpandParent={autoExpandParent}
        treeData={treeData}
        onSelect={(e) => {
          setCurrentDeptId(e[0] as number);
        }}
      />
    </div>
  );
};

export default UserTree;
