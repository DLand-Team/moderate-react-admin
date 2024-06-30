import { Checkbox, Col, Row, Select } from "antd";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { RuleHelper, useFlat } from "src/service";
import OperateCarriersSelect from "../operateCarriersSelect";
import SearchSelect from "../searchSelect";
import "./index.scss";
export default (props: any) => {
  const { searchSelectData, targetItinerary, branchName } = props;
  const { updateItineraryAct } = useFlat(["ruleStore", branchName]);
  const { t } = useTranslation("rule");
  const {
    flightCategory = 1,
    noOverNight = 0,
    noInterline = 0,
    carrier,
    operateCarriers,
    notOperateCarriers,
    allowCodeShare,
  } = targetItinerary || {};
  let useFlagInitValue = true,
    searchSelectInitValue = "ALL";
  if (operateCarriers) {
    useFlagInitValue = true;
    searchSelectInitValue = operateCarriers;
  } else if (notOperateCarriers) {
    useFlagInitValue = false;
    searchSelectInitValue = notOperateCarriers;
  }
  return (
    <div className="flightCategory">
      <div className="itFormItem">
        <div className="itFormItemText">{t("rulePage_flightCategory")}:</div>

        <div>
          <Select
            value={flightCategory}
            style={{ width: 200 }}
            onChange={(e) => {
              let targetItineraryTemp =
                RuleHelper.initItinerary(targetItinerary);
              targetItineraryTemp &&
                updateItineraryAct({
                  ...targetItineraryTemp,
                  flightCategory: e,
                });
            }}>
            <Select.Option value={1}>{t("rulePage_NONSTOP")}</Select.Option>
            <Select.Option value={2}>{t("rulePage_DIRECT")}</Select.Option>
            <Select.Option value={3}>{t("rulePage_CONNECTION")}</Select.Option>
          </Select>
        </div>
      </div>

      <div className="itFormItem itFormItemFlex">
        {flightCategory === 3 ? (
          <Fragment>
            <Checkbox
              checked={noOverNight}
              onChange={(e) => {
                updateItineraryAct({
                  ...targetItinerary,
                  noOverNight: e.target.checked ? 1 : 0,
                });
              }}>
              {t("rulePage_noOverNight")}
            </Checkbox>
            <Checkbox
              onChange={(e) => {
                e.target.checked;
                updateItineraryAct({
                  ...targetItinerary,
                  noInterline: e.target.checked ? 1 : 0,
                });
              }}
              checked={noInterline}>
              {t("rulePage_noInterline")}
            </Checkbox>
          </Fragment>
        ) : (
          <Fragment>
            <Row align="bottom" style={{ width: "100%" }}>
              <Col span={8}>
                <Checkbox
                  checked={allowCodeShare}
                  onChange={(e) => {
                    updateItineraryAct({
                      ...targetItinerary,
                      allowCodeShare: e.target.checked ? 1 : 0,
                    });
                  }}>
                  {t("rulePage_allowCodeShare")}
                </Checkbox>
              </Col>
              <Col span={8}>
                <div>
                  <div className="itFormItemText3">
                    {t("rulePage_carriers")}:
                  </div>
                  <div>
                    <SearchSelect
                      initValue={carrier}
                      dropdownStyle={{
                        whiteSpace: "normal",
                        wordBreak: "break-all",
                      }}
                      handleChange={(value: any) => {
                        updateItineraryAct({
                          ...targetItinerary,
                          carrier: value,
                        });
                      }}
                      dataSource={searchSelectData}></SearchSelect>
                  </div>
                </div>
              </Col>
              <Col span={8}>
                <div>
                  <div className="itFormItemText3">
                    {t("rulePage_operateCarriers")}:
                  </div>
                  <OperateCarriersSelect
                    disable={!allowCodeShare}
                    useFlagInitValue={useFlagInitValue}
                    searchSelectInitValue={searchSelectInitValue}
                    handleChange={(value: any) => {
                      updateItineraryAct({
                        ...targetItinerary,
                        ...value,
                      });
                    }}
                    dataSource={searchSelectData}
                  />
                </div>
              </Col>
            </Row>
          </Fragment>
        )}
      </div>
    </div>
  );
};
