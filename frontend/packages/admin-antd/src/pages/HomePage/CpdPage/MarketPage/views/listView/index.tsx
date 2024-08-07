import { DeleteOutlined, PlusOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Card, Modal, Table, message, Tooltip } from "antd";
import { useTranslation } from "react-i18next";
import { ROUTE_ID } from "src/router";
import { routerHelper, useFlat } from "src/service";
import SearchForm from "../../components/searchForm/searchForm";
import styles from "./style.module.scss";
import useConfig from "./useConfig";

const ListView = () => {
    const { t } = useTranslation(["market"]);
    const { t: commonT } = useTranslation(["common"]);
    const { columns, searchList } = useConfig();
    const {
        marketList,
        marketTablePagedata,
        setMarketTablePageData,
        deleteAct,
        selectedRowKeys,
        setSelectedRowKeys,
    } = useFlat("marketStore");
    const { pageNum, pageSize, total } = marketTablePagedata;

    const rowSelection = {
        onChange: (selectedRowKeys: any) => {
            setSelectedRowKeys(selectedRowKeys);
        },
    };

    return (
        <div className={styles.content}>
            {/* 搜索栏目 */}
            <Card>
                <SearchForm searchList={searchList}></SearchForm>
            </Card>

            {/* 按钮  */}
            <div className={styles.titleWapper}>
                <div>
                    <Button
                        type="primary"
                        onClick={() => {
                            routerHelper.jumpTo(ROUTE_ID.MarketAddPage);
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
            <Card
                title={
                    <div>
                        {t`marketPage.listTile`}
                        <Tooltip
                            title={t`marketPage.listTileTips`}
                            placement="rightTop"
                        >
                            <QuestionCircleOutlined style={{ marginLeft: 8 }} />
                        </Tooltip>
                    </div>
                }
            >
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

export default ListView;
