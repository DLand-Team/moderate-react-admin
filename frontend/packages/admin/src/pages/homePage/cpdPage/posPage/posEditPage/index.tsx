import { Button, Form, message } from "antd";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { useGreatAsync } from "src/common/hooks";
import { AppHelper, useFlat } from "src/reduxService";
import PosItemsTable from "./components/tablePart";
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
    setCurrentPosData,
  } = useFlat("posStore");
  useEffect(() => {
    initCurrentDataAct({
      id,
    });
    return () => {
      setCurrentPosData(null);
    };
  }, []);
  const { t } = useTranslation(["pos"]);
  const { fn: addActDebounce } = useGreatAsync(addAct, {
    auto: false,
    single: true,
  });
  return (
    <div className="posEditContent">
      {/* 无id，则为添加，直接显示 */}
      {/* 有id，则为修改，为了回显ok，保证数据获得再显示 */}
      {(!id || (id && currentData)) && (
        <>
          <TopForm formRef={formRef}></TopForm>
          <PosItemsTable></PosItemsTable>
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
          {t`posPage.save`}
        </Button>
        <Button
          onClick={() => {
            AppHelper.closeTabByPath();
          }}>
          {t`posPage.cancel`}
        </Button>
      </div>
    </div>
  );
};
export default Page;
