import { Button, Modal, Form, Input, message } from "antd"
import { useState } from "react";
import { useFlat } from "src/service";
import { useTranslation } from "react-i18next";

const navChangePsw = () => {
    const { t } = useTranslation("common");
    const [form] = Form.useForm();
    const {
        changePswAct
    } = useFlat("appStore");

    const [isShow, setIsShow] = useState(false);

    const handleShowModal = () => {
        setIsShow(true)
    }
    const onOk = () => {
        form
            .validateFields()
            .then(async (values) => {
                const {oldPassword,password} = values
                let loginPaaword = 'Aa123456'
                 //旧密码输入错误               
                 if(oldPassword != loginPaaword){
                    return message.warning(t`oldPasswordIncorrect`);
                }
                //旧密码不能与新密码一样
                if(oldPassword===password){
                    return message.warning(t`oldIsEqualNew`);
                }

                
                //修改密码接口
                const { payload } = await changePswAct(values)
                if (payload?.code == 0 || payload?.code == 200) {
                    message.success({
                        content: t`Succeed`,
                    });
                }
                setIsShow(false);
                form.resetFields();
                //跳转到登录页

            })
            .catch((info) => {
                console.log("Validate Failed:", info);
            });
    };
    const onCancel = () => {
        form.resetFields();
        setIsShow(false);
    };

    return (
        <>
            <Button type="primary" onClick={handleShowModal}>{t`pswBtn`}</Button>
            <Modal
                title={t`pswBtn`}
                okText={t`Save`}
                cancelText={t`Cancel`}
                open={isShow}
                onOk={onOk}
                onCancel={onCancel}
            >
                <Form form={form} name="userForm" >

                    <Form.Item
                        hasFeedback
                        name="oldPassword"
                        label={t`oldPw`}
                        rules={[{ required: true, whitespace: true, message: t`pleaseInputOldWord`, }]}
                    >
                        <Input placeholder={t`pleaseInputOldWord`} />
                    </Form.Item>

                    <Form.Item
                        hasFeedback
                        name="password"
                        label={t`newPw`}
                        rules={[
                            {
                                required: true,
                                whitespace: true,
                                message: t`pleaseInputNewWord`,
                            },
                            {
                                pattern: /^(?![A-Za-z]+$)(?![A-Z\d]+$)(?![A-Z\W]+$)(?![a-z\d]+$)(?![a-z\W]+$)(?![\d\W]+$)\S{8,20}$/,
                                message: t`pwdTips`,
                            },

                        ]}>
                        <Input placeholder={t`pleaseInputNewWord`} />
                    </Form.Item>

                    <Form.Item
                        hasFeedback
                        name="confirm"
                        label={t`PasswordConfirmation`}
                        rules={[
                            {
                                required: true,
                                whitespace: true,
                                message: t`pleaseInputConfirmWord`,
                            },
                            {
                                pattern: /^(?![A-Za-z]+$)(?![A-Z\d]+$)(?![A-Z\W]+$)(?![a-z\d]+$)(?![a-z\W]+$)(?![\d\W]+$)\S{8,20}$/,
                                message: t`pwdTips`,
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error(t`passwordInconsistent`));
                                },
                            })
                        ]}>
                        <Input placeholder={t`pleaseInputConfirmWord`} />
                    </Form.Item>

                </Form>
            </Modal>
        </>
    )
}
export default navChangePsw