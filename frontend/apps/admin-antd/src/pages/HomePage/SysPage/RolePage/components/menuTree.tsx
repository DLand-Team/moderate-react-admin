import type { TreeDataNode } from "antd";
import { Input, Tree } from "antd";
import React, {
  Dispatch,
  Key,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useFlat } from "src/service";

const { Search } = Input;

const MenuTree: React.FC<{
  chenckState: [Key[], Dispatch<SetStateAction<Key[]>>];
}> = ({ chenckState }) => {
  const { activedMenuList, activedMenuTree, setCurrentDeptId } =
    useFlat("sysStore");

  const [_, setExpandedKeys] = useState<number[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [autoExpandParent, setAutoExpandParent] = useState(true);

  const onExpand = (newExpandedKeys: React.Key[]) => {
    setExpandedKeys(newExpandedKeys as number[]);
    setAutoExpandParent(false);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const newExpandedKeys = activedMenuList
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
    if (!activedMenuTree) return [];
    const result = loop(activedMenuTree);
    return result;
  }, [searchValue, activedMenuTree]);

  useEffect(() => {
    let expandKeys: number[] = [];
    activedMenuList.forEach((item) => {
      expandKeys.push(item.id);
    });
    setExpandedKeys(expandKeys);
  }, [activedMenuList]);

  return (
    <div>
      <Search
        style={{ marginBottom: 8 }}
        placeholder="Search"
        onChange={onChange}
      />

      <Tree
        checkable
        checkedKeys={chenckState[0] as React.Key[]}
        onCheck={(e) => {
          chenckState[1](e as React.Key[]);
        }}
        onExpand={onExpand}
        autoExpandParent={autoExpandParent}
        treeData={treeData}
        onSelect={(e) => {
          setCurrentDeptId(e[0] as number);
        }}
      />
    </div>
  );
};

export default MenuTree;
