import { Fragment } from "react";
import "./index.scss";
import { useTranslation } from "react-i18next";

export default (props: any) => {
  const { t } = useTranslation("rule");
  const { flightCategory, targetItinerary } = props;
  const {
    noOverNight,
    noInterline,
    carrier,
    operateCarriers,
    notOperateCarriers,
    allowCodeShare,
  } = targetItinerary;
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
        <div className="itFormItemText">
          {`${t("rulePage_flightCategory")}:`}
        </div>
        <div>
          {
            {
              1: t("rulePage_NONSTOP"),
              2: t("rulePage_DIRECT"),
              3: t("rulePage_CONNECTION"),
            }[flightCategory as "1"]
          }
        </div>
      </div>

      <div className="itFormItem itFormItemFlex">
        {flightCategory === 3 ? (
          <Fragment>
            <div className="itFormItemFlex2">
              <div className={!noOverNight ? "redPoint" : "noRedPoint"}></div>

              <span>
                {noOverNight && "rulePage_no"}
                {t("rulePage_overNight")}
              </span>
            </div>
            <div className="itFormItemFlex2">
              <div className={!noInterline ? "redPoint" : "noRedPoint"}></div>
              <span>
                {noInterline && "rulePage_no"}
                {t("rulePage_interline")}
              </span>
            </div>
          </Fragment>
        ) : (
          <Fragment>
            <div>
              <div className="itFormItemFlex2">
                {allowCodeShare == 1 ? (
                  <div className="noRedPoint"></div>
                ) : (
                  <div className="redPoint"></div>
                )}
                <span>
                  {allowCodeShare == 1 ? "" : "rulePage_not"}
                  {t("rulePage_allowCodeShare")}
                </span>
              </div>
            </div>
            <div>
              <span className="itFormItemText2">{t("rulePage_carriers")}:</span>
              <span className="itFormItemText2">{carrier}</span>
            </div>
            {allowCodeShare == 1 && (
              <div>
                <span className="itFormItemText2">
                  {!useFlagInitValue && "rulePage_not2"}
                  {t("rulePage_operateCarriers")}:
                </span>
                <span className="itFormItemText2">{searchSelectInitValue}</span>
              </div>
            )}
          </Fragment>
        )}
      </div>
    </div>
  );
};
