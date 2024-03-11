import { useGreatAsync } from "@/common/hooks";
import { useFlat } from "@/reduxService";
import { Button, Checkbox, Form, Input } from "antd";

const LoginForm = () => {
	const { login } = useFlat("authStore");

	const { fn: loginG } = useGreatAsync(login, {
		auto: false,
		single: true,
	});

	const onFinish = async (values: any) => {
		// 开发环境使用默认账号密码
		loginG({
			userName: values.name,
			password: values.password,
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

export default LoginForm;
