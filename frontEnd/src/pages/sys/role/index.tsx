import "react";
import { Table, Form, Tree, Modal } from "antd";
import ModalForm from "./components/modalForm";
import { globalStore } from "@/stores/index";
import {
  BTN_PERMISSIONS,
  ActionsPermissionConfig,
  type BtnItemT,
} from "@/permissions/actionConfig";
import SearchForm from "./components/searchForm";
import type { ColumnsType } from "antd/es/table";
import { useEffect } from "react";
import { centerRouteDta, routesStructData } from "@/router/index";
import routerConfig from "@/router/config";
import { useState } from "react";
import { updatePermissions } from "./service";
import { useNavigate } from "react-router-dom";

interface DataType {
  key: string;
  name: string;
  id: string;
}

const data = [
  {
    key: "1",
    id: "1",
    name: "admin",
  },
  {
    key: "2",
    id: "2",
    name: "usr",
  },
];

const processPermission = (routesData: any[], newData: any[]) => {
  routesData.forEach((routeStructItem) => {
    const { id } = routeStructItem;
    let routeItem = routerConfig[id];
    routeItem.routeId = id;
    let item: any = {
      title: routeItem.meta.title,
      value: routeItem.routeId,
      key: routeItem.routeId,
    };
    newData.push(item);
    if (routeStructItem.children) {
      item.children = [];
      processPermission(routeStructItem.children, item.children);
    } else {
      item.children = [];
      if (routeItem.routeId in ActionsPermissionConfig) {
        const actionsPermissions =
          ActionsPermissionConfig[
            routeItem.routeId as keyof typeof ActionsPermissionConfig
          ];
        actionsPermissions.forEach((actionId) => {
          const btnConfig = BTN_PERMISSIONS[actionId.split(":")[1]];
          item.children?.push({
            title: btnConfig.title,
            value: actionId,
            key: actionId,
          });
        });
      }
    }
  });
};

export default () => {
  const [allPermissions, setPer] = useState<any>();
  const [checked, setChecked] = useState<any>();
  const navigate = useNavigate();
  const handleSubmit = () => {
    Modal.confirm({
      title: "确定么？",
      content: "更新权限之后，需要重新登陆",
      onOk: () => {
        if(Array.isArray(checked)){
          updatePermissions(checked).then(() => {
            sessionStorage.setItem("ACCESS_TOKEN", "");
            globalStore.init()
            navigate("/");
          });
        }
      },
    });
  };
  const { permissions } = globalStore;
  useEffect(() => {
    let result = [];
    processPermission(routesStructData, result);
    setPer(result);
  }, []);

  const columns: ColumnsType<DataType> = [
    {
      title: "角色编号",
      dataIndex: "id",
      key: "id",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <ModalForm handleSubmit={handleSubmit}>
          <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            onValuesChange={() => {}}
            size={"middle"}
          >
            <Form.Item label="权限" name="permission">
              <Tree
                checkStrictly={true}
                defaultCheckedKeys={permissions}
                checkable
                treeData={allPermissions}
                onCheck={(data: any) => {
                  setChecked(data.checked);
                }}
              />
              {JSON.stringify(checked)}
            </Form.Item>
          </Form>
        </ModalForm>
      ),
    },
  ];
  return (
    <div>
      <SearchForm />
      <Table columns={columns} dataSource={data} />
    </div>
  );
};
