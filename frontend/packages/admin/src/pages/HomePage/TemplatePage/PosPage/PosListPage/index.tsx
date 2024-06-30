/*
 * @Author: Do not edit
 * @Date: 2024-03-18 11:51:26
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-03-19 11:35:29
 * @Description: Do not edit
 */
import { RouterHelper, useFlat } from "src/service";
import { Button, Table, message, Modal, Card } from "antd";
import SearchForm from "./components/searchForm/searchForm";
import styles from "./style.module.scss";
import { useEffect } from "react";
import { ROUTE_ID } from "src/router/name";
import useConfig from "./useConfig";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

const CategoryPage = () => {
    const { t } = useTranslation(["pos"]);
    const { t: commonT } = useTranslation(["common"]);
    const { columns } = useConfig();
    ;
    const {
        queryPostListAct,
        posList,
        posTablePagedata,
        setPosTablePageData,
        selectedRowKeys,
        setSelectedRowKeys,
        deleteAct,
    } = useFlat("posStore");
    const { pageNum, pageSize, total } = posTablePagedata;

    useEffect(() => {
        queryPostListAct();
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
                            RouterHelper.jumpTo(ROUTE_ID.PosAddPage);
                        }}
                        style={{
                            marginBottom: 12,
                        }}
                        icon={<PlusOutlined />}
                    >
                        {t`posPage.add`}
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
                                    queryPostListAct();
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
                        {t`posPage.delete`}
                    </Button>
                </div>
            </div>

            {/* 表格 */}
            <Card title={t`posPage.listTile`}>
                <Table
                    scroll={{
                        x: "100%",
                    }}
                    rowKey={(record) => {
                        return record.id!;
                    }}
                    pagination={{
                        pageSizeOptions: [5, 10, 15],
                        showSizeChanger: true,
                        pageSize,
                        current: pageNum,
                        total,
                        onChange(pageNum, pageSize) {
                            setPosTablePageData({
                                pageNum,
                                pageSize,
                            });
                        },
                    }}
                    columns={columns}
                    dataSource={posList}
                    rowSelection={{
                        type: "checkbox",
                        ...rowSelection,
                    }}
                />
            </Card>
        </div>
    );
};

export default CategoryPage;
