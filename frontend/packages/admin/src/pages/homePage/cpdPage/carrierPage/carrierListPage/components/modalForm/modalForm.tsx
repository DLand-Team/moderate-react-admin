import { Form, Modal, message } from "antd";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useFormFields } from "src/common/hooks";
import { useFlat } from "src/reduxService";
import useConfig from "../../useConfig";

const ModalForm: React.FC = () => {
  const { t } = useTranslation(["carrier"]);
  const [form] = Form.useForm<any>();

  const {
    isShowModal,
    setIsShowModal,
    currentData,
    createAct,
    updateAct,
    queryListAct,
  } = useFlat("carrierStore");
  const { formList } = useConfig();
  const FormFields = useFormFields(formList, {
    formIns: form,
    isJustShow: false,
  });

  useEffect(() => {
    if (currentData) {
      form.setFieldsValue(currentData);
    }
  }, [currentData]);

  //   const prime_id = useRef();
  return (
    <Modal
      open={isShowModal}
      title={
        currentData
          ? t`carrierFamily.EditCarrierFamily`
          : t`carrierFamily.NewCarrierFamily`
      }
      okText={t`carrierFamily.Save`}
      cancelText={t`carrierFamily.Cancel`}
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
              ? { ...currentData, ...value, carriers: value.carriers.join(",") }
              : { ...value, ownerId: "1", carriers: value.carriers.join(",") };
            await act(values).then(() => {
              message.success({
                content: "操作成功",
              });
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
        layout="vertical"
        onFieldsChange={(_) => {
          // 当prime_id表单修改，并且修改新的值和旧的值不一样的时候，清空parent_id
          //   if (
          //     values[0].name === "prime_id" &&
          //     prime_id.current !== values[0].value
          //   ) {
          //     prime_id.current = values[0].value;
          //     form.setFieldValue("parent_id", "");
          //   }
          //   refreshFormVersionAct();
        }}>
        {FormFields}
      </Form>
    </Modal>
  );
};

export default ModalForm;
