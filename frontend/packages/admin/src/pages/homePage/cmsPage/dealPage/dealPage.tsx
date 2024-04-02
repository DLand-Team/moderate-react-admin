import { Table } from "antd";
import { useEffect } from "react";
import ModalForm from "./components/modalForm/modalForm";
import SearchForm from "./components/searchForm/searchForm";
import styles from "./style.module.scss";
import useConfig from "./useConfig";
import { useFlat } from "src/reduxService";

const DealPage = () => {
  const { pageNum, pageSize, loading, total, dataList, queryAct } =
    useFlat("dealStore");

  const { columns } = useConfig();

  useEffect(() => {
    handlePageChange(pageNum, pageSize);
  }, []);

  const handlePageChange = async (pageNum = 1, pageSize: number) => {
    await queryAct({ page: pageNum, page_size: pageSize });
  };

  return (
    <div className={styles.content}>
      {/* 搜索栏目 */}
      <SearchForm></SearchForm>
      {/* modal */}
      <ModalForm />
      {/* 表格 */}
      <Table
        rowKey={(record) => {
          return record.id;
        }}
        loading={loading}
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
        dataSource={dataList}
      />
    </div>
  );
};

export default DealPage;
