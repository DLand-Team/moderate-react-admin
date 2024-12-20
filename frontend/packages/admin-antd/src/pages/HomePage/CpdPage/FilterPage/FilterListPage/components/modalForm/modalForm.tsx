import { Checkbox, Form, Input, Modal, message } from "antd";
import { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useFlat } from "src/service";
import TablePart from "./tablePart";
import { EditViewProps } from "src/pages/HomePage/CpdPage/MarketPage/views/editView";

const ModalForm = ({ handleCancel }: EditViewProps) => {
    const [form] = Form.useForm<any>();
    const {
        isShowModal,
        setIsShowModal,
        currentData,
        createAct,
        updateAct,
        queryListAct,
        filterItemList,
        setFilterItemList,
        isDetail,
    } = useFlat("filterStore");
    const { t } = useTranslation(["filter"]);
    const { t: commonT } = useTranslation(["common"]);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const childRef = useRef(null);
    useEffect(() => {
        if (currentData) {
            form.setFieldsValue(currentData);
        }
    }, [currentData]);

    const val = () => {
        if (filterItemList.length) {
            return true;
        } else {
            return false;
        }
    };
    const handleIsEditing = (value: boolean) => {
        setIsEditing(value);
    };

    return (
        <Modal
            open={isShowModal}
            title={
                currentData
                    ? isDetail
                        ? t`filterItem.FilterItemDetail`
                        : t`filterItem.EditfilterItem`
                    : t`filterItem.NewfilterItem`
            }
            width={1000}
            footer={isDetail ? null : undefined}
            destroyOnClose
            okText={t`filterItem.Save`}
            cancelText={t`filterItem.Cancel`}
            onCancel={() => {
                form.resetFields();
                setIsShowModal(false);
                setFilterItemList([]);
                handleIsEditing(false);
                if (childRef.current) {
                    //@ts-ignore
                    childRef.current.cancel();
                }
                handleCancel?.();
            }}
            onOk={() => {
                form.validateFields()
                    .then(async (value) => {
                        let result = val();
                        if (result) {
                            //filterArr循环，并给entity赋值
                            let entity = {
                                filterItemName: value.filterItemName,
                                ownerId: "2",
                                allDirect: value.allDirect,
                                travelTime: 0,
                                travelTimeType: 0,
                                travelTimeOperator: 0,
                                price: 0,
                                priceOperator: 0,
                                layover: 0,
                                layoverOperator: 0,
                                connections: 0,
                                connectionsOperator: 0,
                            };
                            filterItemList.forEach((item) => {
                                if (item.filterBy === "travelTime") {
                                    entity.travelTime = Number(item.number);
                                    entity.travelTimeType =
                                        item.pv === 1 ? 0 : 1;
                                    entity.travelTimeOperator = item.operator;
                                } else if (item.filterBy === "connections") {
                                    entity.connections = Number(item.number);
                                    entity.connectionsOperator = item.operator;
                                }
                            });
                            let act = currentData ? updateAct : createAct;
                            let values = currentData
                                ? {
                                      ...entity,
                                      id: currentData.id,
                                      ownerId: currentData.ownerId,
                                  }
                                : {
                                      ...entity,
                                      ownerId: "FN",
                                  };
                            if (isEditing) {
                                message.warning({
                                    content: commonT`blog.editing`,
                                });
                                return;
                            }
                            const { payload } = await act(values);
                            if (payload?.code == 0 || payload?.code == 200) {
                                message.success({
                                    content: t`filterItem.Succeed`,
                                });
                            }
                            setIsShowModal(false);
                            handleCancel?.();
                            form.resetFields();
                            form.setFieldValue("allDirect", false);
                            setFilterItemList([]);
                            queryListAct();
                        } else {
                            message.warning(t`filterItem.warn_addFilterItem`);
                        }
                    })
                    .catch((info) => {
                        console.log("Validate Failed:", info);
                        setIsShowModal(true);
                    });
            }}
        >
            <Form<any> form={form}>
                <Form.Item
                    label={t`filterItem.FilterName`}
                    name="filterItemName"
                    rules={[
                        {
                            required: true,
                            message: t`filterItem.rule__filterItemName_1`,
                        },
                        {
                            pattern: /^([a-zA-Z0-9-_]+)$/,
                            message: t`filterItem.rule__filterItemName_2`,
                        },
                        {
                            max: 30,
                            message: t`filterItem.rule__filterItemName_3`,
                        },
                    ]}
                >
                    <Input disabled={isDetail} />
                </Form.Item>
                <Form.Item
                    name="allDirect"
                    valuePropName="checked"
                    initialValue={true}
                >
                    <Checkbox
                        disabled={isDetail}
                    >{t`filterItem.AllDirect`}</Checkbox>
                </Form.Item>
            </Form>
            <TablePart
                isDetail={isDetail}
                handleIsEditing={handleIsEditing}
                ref={childRef}
            ></TablePart>
        </Modal>
    );
};

export default ModalForm;
