import { Checkbox, Pagination, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useFlat } from "src/service";
import type {
  AdcompanyPageParams,
  PageType,
} from "src/service/stores/devStore/model";
import ModalForm from "./components/modalForm/modalForm";
import styles from "./index.module.scss";

const columns: ColumnsType<PageType> = [
  {
    title: "页面名称",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "路径",
    dataIndex: "path",
    key: "path",
  },
  {
    title: "可用",
    dataIndex: "active",
    key: "active",
    render: (_, record) => <Checkbox checked={record.active}></Checkbox>,
  },
  {
    title: "操作",
    key: "action",
    render: () => (
      <Space size="middle">
        <a>修改</a>
      </Space>
    ),
  },
];

const PageDevPage = () => {
  const {
    pageNum,
    pageSize,
    total,
    pageList,
    fetchPageListAct,
    addPageListAct,
  } = useFlat("devStore");

  const { t } = useTranslation(["dev"]);

  const handlePageChange = async () => {
    await fetchPageListAct();
  };

  const handleUpload = (values: AdcompanyPageParams) => {
    addPageListAct(values);
  };

  useEffect(() => {
    handlePageChange();
  }, []);

  return (
    <div className={styles.content}>
      <div className={styles.operate_board}>
        <ModalForm btnLabel={t`dev.addRouter`} handleUpload={handleUpload} />
      </div>
      <Table
        rowKey={(record) => {
          return record.id;
        }}
        pagination={false}
        columns={columns}
        dataSource={pageList || []}
        footer={() => (
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Pagination
              {...{
                pageSize,
                current: pageNum,
                total,
              }}
            ></Pagination>
          </div>
        )}
      />
    </div>
  );
};

export default PageDevPage;
