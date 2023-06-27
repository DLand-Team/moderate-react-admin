import {
  ActionsPermissionConfig,
  BTN_PERMISSIONS,
} from "@/permissions/actionConfig";
import { ROUTE_STRUCT_CONFIG } from "@/router/config";
import routerManager from "@/router/routerManager";
import { useInject } from "@/stores/index";
import { Form, Modal, Table, Tree, notification } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalForm from "./components/modalForm";
import SearchForm from "./components/searchForm";
import { updatePermissions } from "./service";

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
    let item: any = {
      title: routerManager.getRouteTitleByKey(id),
      value: id,
      key: id,
    };
    newData.push(item);
    if (routeStructItem.children) {
      item.children = [];
      processPermission(routeStructItem.children, item.children);
    } else {
      item.children = [];
      if (id in ActionsPermissionConfig) {
        const actionsPermissions =
          ActionsPermissionConfig[id as keyof typeof ActionsPermissionConfig];
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

export default (props) => {
  const [permissionsStore] = useInject('permissions')
  const {state:{
    permissions
  },actions:{
    init
  }} = permissionsStore
  const [allPermissions, setPer] = useState<any>([]);
  const [checked, setChecked] = useState<any>();
  const navigate = useNavigate();
  const handleSubmit = () => {
    Modal.confirm({
      title: "确定么？",
      content: "更新权限之后，需要重新登陆",
      onOk: () => {
        if (Array.isArray(checked)) {
          if (checked.includes("hello")) {
            updatePermissions(checked).then(() => {
              sessionStorage.clear();
              init();
              navigate("/");
            });
          } else {
            notification.info({
              message: "hello 首页得有啊！",
            });
          }
        }
      },
    });
  };
  useEffect(() => {
    let result = [];
    processPermission(ROUTE_STRUCT_CONFIG, result);
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
              {permissions.length && allPermissions.length && (
                <Tree
                  checkStrictly={true}
                  defaultCheckedKeys={permissions}
                  checkable
                  treeData={allPermissions}
                  onCheck={(data: any) => {
                    setChecked(data.checked);
                  }}
                />
              )}
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
