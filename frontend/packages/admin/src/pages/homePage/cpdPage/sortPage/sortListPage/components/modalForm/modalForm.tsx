import { useFormFields } from "src/common/hooks";
import { Form, Modal, message } from "antd";
import { useEffect, useRef } from "react";
import useConfig from "../../useConfig";
import { useFlat } from "src/reduxService";
import { useTranslation } from "react-i18next";

const ModalForm: React.FC = () => {
  const [form] = Form.useForm<any>();

  const {
    isShowModal,
    setIsShowModal,
    currentData,
    createAct,
    updateAct,
    queryListAct,
  } = useFlat("sortStore");
  const { formList } = useConfig();
  const FormFields = useFormFields(formList, {
    formIns: form,
    isJustShow: false,
  });
  const { t } = useTranslation(["sort"]);
  useEffect(() => {
    if (currentData) {
      form.setFieldsValue(currentData);
    }
  }, [currentData]);
  //   useEffect(() => {
  //     if (recordData) {
  //       form.setFieldsValue(recordData);
  //       refreshFormVersionAct();
  //     }
  //   }, [recordData]);
  //   let extraOptions = isDetail
  //     ? {
  //         footer: [],
  //       }
  //     : {};
  const prime_id = useRef();
  return (
    <Modal
      open={isShowModal}
      title={currentData ? t`sortItem.EditsortItem` : t`sortItem.NewsortItem`}
      //   {...extraOptions}
      okText={t`sortItem.Save`}
      cancelText={t`sortItem.Cancel`}
      onCancel={() => {
        form.resetFields();
        setIsShowModal(false);
      }}
      onOk={() => {
        form
          .validateFields()
          .then(async (value) => {
            let act = currentData ? updateAct : createAct;
            let values = currentData
              ? {
                  ...currentData,
                  ...value,
                  sortString: value.sortString.join(","),
                }
              : {
                  ...value,
                  ownerId: "FN",
                  sortString: value.sortString.join(","),
                };
            await act(values).then((res) => {
              const { payload } = res;
              if (payload?.code == 0 || payload?.code == 200) {
             
                message.success({
                  content: t`sortItem.Succeed`,
                });
              }
            });

            setIsShowModal(false);
            form.resetFields();
            queryListAct();
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}>
      <Form<any>
        form={form}
        onFieldsChange={(values) => {
          // 当prime_id表单修改，并且修改新的值和旧的值不一样的时候，清空parent_id
          if (
            values[0].name === "prime_id" &&
            prime_id.current !== values[0].value
          ) {
            prime_id.current = values[0].value;
            form.setFieldValue("parent_id", "");
          }
          //   refreshFormVersionAct();
        }}>
        {FormFields}
      </Form>
    </Modal>
  );
};

export default ModalForm;
