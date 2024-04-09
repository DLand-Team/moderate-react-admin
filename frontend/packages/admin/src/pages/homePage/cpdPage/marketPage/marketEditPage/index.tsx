import { Button, Form, message } from "antd";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { useGreatAsync } from "src/common/hooks";
import { AppHelper, useFlat } from "src/reduxService";
import MarketItemsTable from "./components/tablePart";
import TopForm, { TopPartForm } from "./components/topForm";
import "./index.scss";

const Page = () => {
  // 第一步：通过路由信息判断是否是编辑
  const [formRef] = Form.useForm<TopPartForm>();
  let [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const {
    addAct,
    updateAct,
    initCurrentDataAct,
    currentData,
    setCurrentMarketData,
  } = useFlat("marketStore");
  useEffect(() => {
    initCurrentDataAct({
      id,
    });
    return () => {
      setCurrentMarketData(null);
    };
  }, []);
  const { t } = useTranslation(["market"]);
  const { fn: addActDebounce } = useGreatAsync(addAct, {
    auto: false,
    single: true,
  });
  return (
    <div className="marketEditContent">
      {/* 无id，则为添加，直接显示 */}
      {/* 有id，则为修改，为了回显ok，保证数据获得再显示 */}
      {(!id || (id && currentData)) && (
        <>
          <TopForm formRef={formRef}></TopForm>
          <MarketItemsTable></MarketItemsTable>
        </>
      )}
      <div className="btnTable">
        <Button
          onClick={async () => {
            await formRef.validateFields();
            await (!id ? addActDebounce() : updateAct());
            message.success({
              content: "添加成功",
            });
            AppHelper.closeTabByPath();
          }}
          style={{ marginRight: 10 }}
          type="primary">
          {t`marketPage.save`}
        </Button>
        <Button
          onClick={() => {
            AppHelper.closeTabByPath();
          }}>
          {t`marketPage.cancel`}
        </Button>
      </div>
    </div>
  );
};
export default Page;
