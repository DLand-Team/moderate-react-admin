/*
 * @Author: Do not edit
 * @Date: 2024-03-18 11:51:26
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-03-19 11:35:29
 * @Description: Do not edit
 */
import { RouterHelper, useFlat } from "src/reduxService";
import { Button, Table } from "antd";
import SearchForm from "./components/searchForm/searchForm";
import styles from "./style.module.scss";
import { useEffect } from "react";
import { ROUTE_ID } from "src/config/routerConfig";
import useConfig from "./useConfig";

const Page = () => {
  const { columns } = useConfig();
  const {
    queryMarkettListAct,
    marketList,
    marketTablePagedata,
    setMarketTablePageData,
  } = useFlat("marketStore");
  const { pageNum, pageSize, total } = marketTablePagedata;
  useEffect(() => {
    queryMarkettListAct();
  }, []);

  return (
    <div className={styles.content}>
      {/* 搜索栏目 */}
      <SearchForm></SearchForm>
      {/* 按钮  */}
      <Button
        type="primary"
        onClick={() => {
          RouterHelper.jumpTo(ROUTE_ID.MarketEditPage);
        }}
        style={{
          marginBottom: 12,
        }}>
        + 添加
      </Button>
      {/* modal */}
      {/* 表格 */}
      <Table
        rowKey={(record) => {
          return record.id || record.marketName;
        }}
        pagination={{
          pageSizeOptions: [5, 10],
          showSizeChanger: true,
          pageSize,
          current: pageNum,
          total,
          showTotal: (total) => `Total ${total} items`,
          onChange(pageNum, pageSize) {
            setMarketTablePageData({
              pageNum,
              pageSize,
            });
          },
        }}
        columns={columns}
        dataSource={marketList}
      />
    </div>
  );
};

export default Page;
