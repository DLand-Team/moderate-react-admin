import { useFlatInject, useGreatAsync } from "@/common/hooks";
import type {
  StoreType,
} from "@/services/stores/devStore/devStore.model";
import { Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useEffect } from "react";
import ModalForm from "./components/modalForm/modalForm";
import styles from "./storeDevPage.module.scss";

const columns: ColumnsType<StoreType> = [
  {
    title: "状态仓库名称",
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

const StoreDevPage = () => {
  const [devStore] = useFlatInject("devStore");
  const { pageNum, pageSize, total, addStore, storeList, createStoreList } =
    devStore;
  const { loading: loading1, run: createStoreListG } = useGreatAsync(
    createStoreList,
    {
      auto: true,
      debounceTime: 1000,
    }
  );

  const handlePageChange = async (pageNum = 1, pageSize) => {
    await createStoreListG();
  };
  const handleUpload = (values: any) => {
    addStore(values);
  };
  useEffect(() => {
    handlePageChange(pageNum, pageSize);
  }, []);
  return (
    <div className={styles.content}>
      <div className={styles.operate_board}>
        <ModalForm btnLabel="添加状态仓库" handleUpload={handleUpload} />
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
        dataSource={storeList}
      />
    </div>
  );
};

export default StoreDevPage;
