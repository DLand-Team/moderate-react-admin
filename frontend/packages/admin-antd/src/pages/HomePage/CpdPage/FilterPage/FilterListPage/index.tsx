import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Card, Modal, Table, message } from "antd";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { TableCard } from "src/components";
import { useFlat } from "src/service";
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
            <Card>
                <SearchForm></SearchForm>
            </Card>
            {/* 按钮  */}
            <ModalForm />
            <TableCard
                style={{
                    marginTop: "12px",
                }}
                buttonList={[
                    {
                        title: t`filterItem.add`,
                        icon: <PlusOutlined />,
                        handleClick: () => {
                            setIsShowModal(true);
                        },
                    },
                    {
                        title: t`filterItem.delete`,
                        icon: <DeleteOutlined />,
                        option: {
                            type: "default",
                        },
                        handleClick: () => {
                            Modal.confirm({
                                title: t`filterItem.DelTile`,
                                content: t`filterItem.modalDeleteContent`,
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
                                okText: t`filterItem.Yes`,
                                cancelText: t`filterItem.No`,
                            });
                        },
                    },
                ]}
                title={t`filterItem.listTile`}
            >
                <Table
                    rowKey={(record) => {
                        return record.id;
                    }}
                    columns={columns}
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
