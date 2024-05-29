import { Button, Form, Input, message } from "antd";
import { Fragment } from "react";
import storageHelper from "src/common/utils/storageHelper";
import { useFlat } from "src/service";
/**
 * 被注释掉的是滑块拼图验证功能 暂时保留
 * @returns
 */
const LoginForm = () => {
	const [form] = Form.useForm();
	let { loginNest } = useFlat("authStore");
	const onFinish = async (values: any) => {
		// 开发环境使用默认账号密码
		loginNest({
			username: values.name,
			password: values.password,
			captchaVerification: values.code,
		})
			.then(() => {
				storageHelper.setItem("BTN_CON", "点击获取验证码");
				storageHelper.setItem("BTN_TIME", 60);
			})
			.catch(() => {
				return message.error("error");
			});
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log("Failed:", errorInfo);
	};

	return (
		<Fragment>
			<Form
				form={form}
				name="basic"
				labelCol={{ span: 8 }}
				initialValues={{ remember: true }}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete="off"
				style={{ padding: "0 15px" }}
			>
				<Form.Item
					label=""
					name="name"
					rules={[
						{
							required: true,
							message: "用户名不能为空！",
						},
						{
							max: 100,
							message: "用户名不得多于100个字符",
						},
					]}
				>
					<Input placeholder={"请输入用户名"} />
				</Form.Item>

				<Form.Item
					label=""
					name="password"
					rules={[
						{
							required: true,
							message: "密码不能为空！",
						},
						{
							max: 19,
							message: "密码长度不能多于19个字符",
						},
					]}
				>
					<Input.Password placeholder={"请输入密码"} />
				</Form.Item>
				<Form.Item wrapperCol={{ span: 24 }}>
					<Button
						type="primary"
						htmlType="submit"
						style={{ width: "100%" }}
					>
						Login
					</Button>
				</Form.Item>
			</Form>
		</Fragment>
	);
};

export default LoginForm;
