import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Card, Modal, Table, message } from "antd";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { TableCard } from "src/components";
import { dp, useFlat } from "src/service";
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
    } = useFlat("sortStore");
    const { t } = useTranslation(["sort"]);
    const { t: commonT } = useTranslation(["common"]);
    useEffect(() => {
        setPageData({
            pageNum: 1,
        });
        queryListAct();
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
            <Card>
                <SearchForm></SearchForm>
            </Card>

            <ModalForm />
            {/* 表格 */}
            <TableCard
                style={{
                    marginTop: "12px",
                }}
                title={t`sortItem.listTile`}
                buttonList={[
                    {
                        title: t`sortItem.add`,
                        icon: <PlusOutlined />,
                        handleClick: () => {
                            setIsShowModal(true);
                            dp("sortStore", "setCurrentData", null);
                        },
                    },
                    {
                        title: t`sortItem.delete`,
                        icon: <DeleteOutlined />,
                        option: {
                            type: "default",
                        },
                        handleClick: () => {
                            Modal.confirm({
                                title: commonT`blog.modalDeleteTitle`,
                                content: commonT`blog.modalDeleteContent`,
                                onOk: async () => {
                                    if (selectedRowKeys.length > 0) {
                                        await deleteAct({
                                            ids: selectedRowKeys.join(","),
                                        });
                                        queryListAct();
                                    } else {
                                        return messageApi.open({
                                            type: "warning",
                                            content: commonT`blog.warn_select`,
                                        });
                                    }
                                },
                                okText: t`sortItem.Yes`,
                                cancelText: t`sortItem.No`,
                            });
                        },
                    },
                ]}
            >
                <Table
                    rowKey={(record) => {
                        return record.id;
                    }}
                    // rowSelection={rowSelection}
                    pagination={{
                        pageSizeOptions: [5, 10, 15],
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
            </TableCard>
        </div>
    );
};

export default ListPage;
