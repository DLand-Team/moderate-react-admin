import { Checkbox, Col, Form, Row, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import classNames from "classnames";
import { Fragment, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useFlat } from "src/service";
import type { RuleItineraryItem } from "src/service/stores/ruleStore/model";
import OperateCarriersSelect from "../operateCarriersSelect";
import SearchSelect from "../searchSelect";
import styles from "./style.module.scss";

type CategoryData = Partial<
    Pick<
        RuleItineraryItem,
        "carrier" | "operateCarriers" | "notOperateCarriers" | "allowCodeShare"
    >
> & { use: number };

const CategoryEdit = (props: { branchName: string }) => {
    const { branchName } = props;
    const { switchCategory, updateItineraryAct, targetItinerary } = useFlat([
        "ruleStore",
        branchName,
    ]);
    const { t } = useTranslation();
    const targetItineraryState = targetItinerary(undefined);
    const {
        flightCategory = 1,
        noOverNight = 0,
        carrier,
        allowCodeShare,
        operateCarriers,
        notOperateCarriers,
    } = targetItineraryState || {};
    const [formIns] = useForm<CategoryData>();

    useEffect(() => {
        targetItineraryState && formIns.setFieldsValue(targetItineraryState);
        console.log("!!!!!!!!!!!!!");
    }, [targetItineraryState]);

    const watchState = Form.useWatch((values) => {
        return values;
    }, formIns);

    useEffect(() => {
        updateItineraryAct({
            ...watchState,
        });
    }, [watchState]);

    return (
        <div className={styles.container}>
            <div className={styles.itFormItem}>
                <div className={styles.itFormItemText}>
                    {t("rule:rulePage_flightCategory")}:
                </div>
                <div>
                    <Select
                        value={flightCategory}
                        style={{ width: 200 }}
                        onChange={(e) => {
                            switchCategory(e);
                        }}
                    >
                        <Select.Option value={1}>
                            {t("rule:rulePage_NONSTOP")}
                        </Select.Option>
                        <Select.Option value={2}>
                            {t("rule:rulePage_DIRECT")}
                        </Select.Option>
                        <Select.Option value={3}>
                            {t("rule:rulePage_CONNECTION")}
                        </Select.Option>
                    </Select>
                </div>
            </div>

            <div
                className={classNames(styles.itFormItem, styles.itFormItemFlex)}
            >
                {flightCategory === 3 ? (
                    <Fragment>
                        <Checkbox
                            checked={noOverNight ? true : false}
                            onChange={(e) => {
                                updateItineraryAct({
                                    noOverNight: e.target.checked ? 1 : 0,
                                });
                            }}
                        >
                            {t("rule:rulePage_noOverNight")}
                        </Checkbox>
                    </Fragment>
                ) : (
                    <Fragment>
                        {targetItineraryState && (
                            <Form<CategoryData>
                                form={formIns}
                                initialValues={targetItineraryState}
                            >
                                <Row align="bottom" style={{ width: "100%" }}>
                                    <Col span={8}>
                                        <Form.Item
                                            name={"allowCodeShare"}
                                            getValueProps={(value) => ({
                                                checked:
                                                    value == 1 ? true : false,
                                            })}
                                            normalize={(value) => {
                                                return value ? 1 : 0;
                                            }}
                                            valuePropName="checked"
                                        >
                                            <Checkbox>
                                                {t(
                                                    "rule:rulePage_allowCodeShare"
                                                )}
                                            </Checkbox>
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <div>
                                            <div
                                                className={
                                                    styles.itFormItemText3
                                                }
                                            >
                                                {t("rule:rulePage_carriers")}:
                                            </div>
                                            <div>
                                                <SearchSelect
                                                    name={"carrier"}
                                                    initValue={carrier}
                                                ></SearchSelect>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col span={8}>
                                        <div>
                                            <div
                                                className={
                                                    styles.itFormItemText3
                                                }
                                            >
                                                {t(
                                                    "rule:rulePage_operateCarriers"
                                                )}
                                                :
                                            </div>
                                            <OperateCarriersSelect<CategoryData>
                                                formIns={formIns}
                                                allowCodeShare={allowCodeShare!}
                                                operateCarriers={
                                                    operateCarriers!
                                                }
                                                notOperateCarriers={
                                                    notOperateCarriers!
                                                }
                                            />
                                        </div>
                                    </Col>
                                </Row>
                            </Form>
                        )}
                    </Fragment>
                )}
            </div>
        </div>
    );
};

export default CategoryEdit;
