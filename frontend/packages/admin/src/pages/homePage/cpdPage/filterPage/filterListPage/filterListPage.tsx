import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, Modal, Row, Table, message } from "antd";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { dp, useFlat } from "src/reduxService";
import ModalForm from "./components/modalForm/modalForm";
import SearchForm from "./components/searchForm/searchForm";
import styles from "./style.module.scss";
import useConfig from "./useConfig";

const ListPage = () => {
  const { columns } = useConfig();
  const {
    list,
    tablePagedata,
    setIsShowModal,
    setPageData,
    deleteAct,
    queryListAct,
    selectedRowKeys,
    setSelectedRowKeys,
  } = useFlat("filterStore");
  const { t } = useTranslation(["filter"]);
  const { t: commonT } = useTranslation(["common"]);
  useEffect(() => {
    setPageData({
      pageNum: 1,
    });
  }, []);
  const rowSelection = {
    onChange: (selectedRowKeys: any) => {
      setSelectedRowKeys(selectedRowKeys);
    },
  };
  const [messageApi] = message.useMessage();
  return (
    <div className={styles.content}>
      {/* 搜索栏目 */}
      <SearchForm></SearchForm>
      {/* 按钮  */}
      <Row>
        <Col span={4} style={{ textAlign: "left" }}>
          {t`filterItem.listTile`}
        </Col>
        <Col span={20} style={{ textAlign: "right" }}>
          <Button
            type="primary"
            onClick={() => {
              setIsShowModal(true);
              dp("filterStore", "setCurrentData", null);
            }}
            style={{
              marginBottom: 12,
            }}
            icon={<PlusOutlined />}
          >
            {t`filterItem.add`}
          </Button>
          <Button
            onClick={() => {
              Modal.confirm({
                title: t`filterItem.DelTile`,
                content: t`filterItem.modalDeleteContent`,
                onOk: async () => {
                  if (selectedRowKeys.length > 0) {
                    await deleteAct({ ids: selectedRowKeys.join(",") });
                    queryListAct();
                  } else {
                    return messageApi.open({
                      type: "warning",
                      content: commonT`blog.warn_select`,
                    });
                  }
                },
                okText: t`filterItem.Yes`,
                cancelText: t`filterItem.No`,
              });
            }}
            style={{
              marginBottom: 12,
              marginLeft: 12,
            }}
          >
            {t`filterItem.delete`}
          </Button>
        </Col>
      </Row>
      {/* modal */}
      <ModalForm />
      <Table
        rowKey={(record) => {
          return record.id;
        }}
        columns={columns}
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
        dataSource={list}
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
      />
    </div>
  );
};

export default ListPage;
