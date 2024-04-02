import { Button, Table, message, Modal } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import { useFlat } from "src/reduxService";
import ModalForm from "./components/modalForm/modalForm";
import SearchForm from "./components/searchForm/searchForm";
import styles from "./style.module.scss";
import useConfig from "./useConfig";
import { dp } from "src/reduxService";
import { useTranslation } from "react-i18next";

const CategoryPage = () => {
  const { t: commonT } = useTranslation(["common"]);
  const { t } = useTranslation(["carrier"]);
  const { columns } = useConfig();
  const {
    list,
    tablePagedata,
    setIsShowModal,
    setPageData,
    selectedRowKeys,
    setSelectedRowKeys,
    queryCarrierAct,
    deleteAct,
    queryListAct,
  } = useFlat("carrierStore");
  useEffect(() => {
    setPageData({
      pageNum: 1,
    });
    queryCarrierAct();
  }, []);
  const rowSelection = {
    onChange: (selectedRowKeys: any) => {
      setSelectedRowKeys(selectedRowKeys);
    },
  };
  return (
    <div className={styles.content}>
      {/* 搜索栏目 */}
      <SearchForm></SearchForm>
      {/* 按钮  */}
      <div className={styles.titleWapper}>
        <div>{t`carrierFamily.listTile`}</div>
        <div>
          <Button
            type="primary"
            onClick={() => {
              setIsShowModal(true);
              dp("carrierStore", "setCurrentData", null);
            }}
            style={{
              marginBottom: 12,
            }}
            icon={<PlusOutlined />}
          >
            {t`carrierFamily.add`}
          </Button>
          <Button
            onClick={() => {
              if (selectedRowKeys.length == 0) {
                return message.warning(commonT`blog.warn_select`);
              }
              Modal.confirm({
                title: commonT`blog.modalDeleteTitle`,
                content: commonT`blog.modalDeleteContent`,
                onOk: async () => {
                  await deleteAct({ ids: selectedRowKeys.join(",") });
                  queryListAct();
                },
                okText: commonT`blog.Yes`,
                cancelText: commonT`blog.No`,
              });
            }}
            style={{
              marginLeft: 12,
            }}
            icon={<DeleteOutlined />}
          >
            {t`carrierFamily.delete`}
          </Button>
        </div>
      </div>

      {/* modal */}
      <ModalForm />
      {/* 表格 */}
      <Table
        rowKey={(record) => {
          return record.id;
        }}
        pagination={{
          showSizeChanger: true,
          pageSize: tablePagedata.pageSize,
          current: tablePagedata.pageNum,
          total: tablePagedata.total,
          onChange(page, pageSize) {
            // pageSize改变了
            if (tablePagedata.pageSize !== pageSize) {
              setPageData({
                pageNum: 1,
                pageSize: pageSize,
              });
            } else {
              setPageData({
                pageNum: page,
              });
            }
          },
        }}
        columns={columns}
        dataSource={list}
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
      />
    </div>
  );
};

export default CategoryPage;
