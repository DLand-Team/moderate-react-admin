/*
 * @Author: Do not edit
 * @Date: 2024-03-18 11:51:26
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-03-19 11:35:29
 * @Description: Do not edit
 */
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Table } from "antd";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useFlat } from "src/reduxService";
import SearchForm from "./components/searchForm/searchForm";
import styles from "./style.module.scss";
import useConfig from "./useConfig";

const CategoryPage = () => {
  const { t } = useTranslation(["market"]);
  const { columns } = useConfig();
  const { queryMarketListAct } = useFlat("marketStore");
  useEffect(() => {
    queryMarketListAct();
  }, []);

  return (
    <div className={styles.content}>
      {/* 搜索栏目 */}
      <SearchForm></SearchForm>
      {/* 按钮  */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>{t`carrierFamily.listTile`}</div>
        <div>
          <Button
            type="primary"
            onClick={() => {
              // setIsShowModal(true);
              // dp("carrierStore", "setCurrentData", null);
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
            icon={<DeleteOutlined />}
          >
            {t`carrierFamily.delete`}
          </Button>
        </div>
      </div>
      {/* modal */}
      {/* <ModalForm /> */}
      {/* 表格 */}
      <Table
        rowKey={(record) => {
          return record.id;
        }}
        // loading={loading}
        // pagination={{
        // 	pageSize,
        // 	current: pageNum,
        // 	total,
        // 	onChange(page, pageSize) {
        // 		console.log(page, pageSize);
        // 		handlePageChange(page, pageSize);
        // 	},
        // }}
        columns={columns}
        // dataSource={dataList}
      />
    </div>
  );
};

export default CategoryPage;
