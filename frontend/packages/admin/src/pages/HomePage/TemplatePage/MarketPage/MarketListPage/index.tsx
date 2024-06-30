/*
 * @Author: Do not edit
 * @Date: 2024-03-18 11:51:26
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-03-19 11:35:29
 * @Description: Do not edit
 */
import { RouterHelper, useFlat } from "src/service";
import { Button, Table, Modal, message, Card } from "antd";
import SearchForm from "./components/searchForm/searchForm";
import styles from "./style.module.scss";
import { useEffect } from "react";
import { ROUTE_ID } from "src/router/name";
import useConfig from "./useConfig";
import { useTranslation } from "react-i18next";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";

const Page = () => {
    const { t } = useTranslation(["market"]);
    const { t: commonT } = useTranslation(["common"]);
    const { columns } = useConfig();
    const {
        queryMarkettListAct,
        marketList,
        marketTablePagedata,
        setMarketTablePageData,
        deleteAct,
        selectedRowKeys,
        setSelectedRowKeys,
    } = useFlat("marketStore");
    const { pageNum, pageSize, total } = marketTablePagedata;
    useEffect(() => {
        queryMarkettListAct();
    }, []);
    const rowSelection = {
        onChange: (selectedRowKeys: any) => {
            setSelectedRowKeys(selectedRowKeys);
        },
    };

    return (
        <div className={styles.content}>
            <Card>
                <SearchForm></SearchForm>
            </Card>

            <div className={styles.titleWapper}>
                <div>
                    <Button
                        type="primary"
                        onClick={() => {
                            RouterHelper.jumpTo(ROUTE_ID.MarketAddPage);
                        }}
                        style={{
                            marginBottom: 12,
                        }}
                        icon={<PlusOutlined />}
                    >
                        {t`marketPage.add`}
                    </Button>
                    <Button
                        onClick={() => {
                            if (selectedRowKeys.length == 0) {
                                return message.warning(
                                    commonT`blog.warn_select`
                                );
                            }
                            Modal.confirm({
                                title: commonT`blog.modalDeleteTitle`,
                                content: commonT`blog.modalDeleteContent`,
                                onOk: async () => {
                                    await deleteAct({
                                        ids: selectedRowKeys.join(","),
                                    });
                                    queryMarkettListAct();
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
                        {t`marketPage.delete`}
                    </Button>
                </div>
            </div>
            {/* modal */}
            {/* 表格 */}
            <Card title={t`marketPage.listTile`}>
                <Table
                    rowKey={(record) => {
                        return record.id || record.marketName;
                    }}
                    pagination={{
                        pageSizeOptions: [5, 10, 15],
                        showSizeChanger: true,
                        pageSize,
                        current: pageNum,
                        total,
                        // showTotal: (total) => `Total ${total} items`,
                        onChange(pageNum, pageSize) {
                            setMarketTablePageData({
                                pageNum,
                                pageSize,
                            });
                        },
                    }}
                    columns={columns}
                    dataSource={marketList}
                    rowSelection={{
                        type: "checkbox",
                        ...rowSelection,
                    }}
                />
            </Card>
        </div>
    );
};

export default Page;
