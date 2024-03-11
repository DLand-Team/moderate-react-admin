import { useFlatInject, useGreatAsync } from "@/common/hooks";
import type { PageType } from "@/services/stores/devStore/devStore.model";
import { Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useEffect } from "react";
import styles from "./apiDevPage.module.scss";
import ModalForm from "./components/modalForm/modalForm";

const columns: ColumnsType<PageType> = [
  {
    title: "name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "操作",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a>修改</a>
      </Space>
    ),
  },
];

const ApiDevPage = () => {
  const [devStore] = useFlatInject("devStore");
  const { pageNum, pageSize, addApi, total, apiList, createApiList } = devStore;
  const { loading: loading1, run: createApiListG } = useGreatAsync(
    createApiList,
    {
      auto: true,
      debounceTime: 1000,
    }
  );

  const handlePageChange = async (pageNum = 1, pageSize) => {
    await createApiListG();
  };
  const handleUpload = (values: any) => {
    addApi(values);
  };
  useEffect(() => {
    handlePageChange(pageNum, pageSize);
  }, []);
  return (
    <div className={styles.content}>
      <div className={styles.operate_board}>
        <ModalForm btnLabel="添加api" handleUpload={handleUpload} />
      </div>
      <Table
        rowKey={(record) => {
          return record.id;
        }}
        loading={loading1}
        pagination={{
          pageSize,
          current: pageNum,
          total,
          onChange(page, pageSize) {
            console.log(page, pageSize);
            handlePageChange(page, pageSize);
          },
        }}
        columns={columns}
        dataSource={apiList}
      />
    </div>
  );
};

export default ApiDevPage;
