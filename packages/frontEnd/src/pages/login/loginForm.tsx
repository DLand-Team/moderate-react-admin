import "react";
import { Button, Checkbox, Form, Input } from "antd";
import { login } from "./service";
import { useNavigate } from "react-router-dom";
import { globalStore } from "@/stores/index";

export default () => {
  const naviagte = useNavigate();
  const onFinish = (values: any) => {
    console.log("Success:", values);
    const { name, password } = values;
    login({
      name,
      password,
    }).then((res) => {
      const { token } = res.data;
      globalStore.setToken(token);
      
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="用户名"
        name="name"
        rules={[{ required: true, message: "请输入！" }]}
      >
        <Input placeholder={"用户名是admin"} />
      </Form.Item>

      <Form.Item
        label="密码"
        name="password"
        rules={[{ required: true, message: "请输入！" }]}
      >
        <Input.Password placeholder={"密码是123"} />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{ offset: 8, span: 16 }}
      >
        <Checkbox>记住我</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          登陆
        </Button>
      </Form.Item>
    </Form>
  );
};
