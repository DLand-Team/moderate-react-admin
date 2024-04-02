import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Table } from "antd";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useFlat } from "src/reduxService";
import SearchForm from "./components/searchForm/searchForm";
import styles from "./style.module.scss";
import useConfig from "./useConfig";

const CategoryPage = () => {
  const { t } = useTranslation(["rule"]);
  const { columns } = useConfig();
  const { ruleList, setPageData } = useFlat("ruleStore");
  useEffect(() => {
    setPageData({
      pageNum: 1,
    });
  }, []);
  const rowSelection = {
    onChange: () => {
      // setSelectedRowKeys(selectedRowKeys);
    },
  };
  return (
    <div className={styles.content}>
      {/* 搜索栏目 */}
      <SearchForm></SearchForm>
      {/* 按钮  */}
      <div className={styles.titleWapper}>
        <div>{t`ruleFamily.listTile`}</div>
        <div>
          <Button
            type="primary"
            onClick={() => {
              // setIsShowModal(true);
              // dp("ruleStore", "setCurrentData", null);
            }}
            style={{
              marginBottom: 12,
            }}
            icon={<PlusOutlined />}>
            {t`ruleFamily.add`}
          </Button>
          <Button
            onClick={() => {
              // if (selectedRowKeys.length == 0) {
              //   return message.warning(commonT`blog.warn_select`);
              // }
              // Modal.confirm({
              //   title: commonT`blog.modalDeleteTitle`,
              //   content: commonT`blog.modalDeleteContent`,
              //   onOk: async () => {
              //     await deleteAct({ ids: selectedRowKeys.join(",") });
              //     queryListAct();
              //   },
              //   okText: commonT`blog.Yes`,
              //   cancelText: commonT`blog.No`,
              // });
            }}
            style={{
              marginLeft: 12,
            }}
            icon={<DeleteOutlined />}>
            {t`ruleFamily.delete`}
          </Button>
        </div>
      </div>
      {/* 表格 */}
      <Table
        rowKey={(record) => {
          return record.id;
        }}
        pagination={
          {
            // showSizeChanger: true,
            // pageSize: tablePagedata.pageSize,
            // current: tablePagedata.pageNum,
            // total: tablePagedata.total,
            // onChange(page, pageSize) {
            //   // pageSize改变了
            //   if (tablePagedata.pageSize !== pageSize) {
            //     setPageData({
            //       pageNum: 1,
            //       pageSize: pageSize,
            //     });
            //   } else {
            //     setPageData({
            //       pageNum: page,
            //     });
            //   }
            // },
          }
        }
        columns={columns}
        dataSource={ruleList}
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
      />
    </div>
  );
};

export default CategoryPage;
