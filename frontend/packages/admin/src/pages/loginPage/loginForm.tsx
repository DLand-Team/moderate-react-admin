import { Button, Col, Form, Input, Row, Select, message } from "antd";
import { Fragment, useEffect, useState } from "react";
import pic from "src/assets/imgs/currency-CNY.png";
import pic2 from "src/assets/imgs/yingguoguoqi-.png";
import storageHelper from "src/common/utils/storageHelper";
import { useFlat } from "src/service";
const { Option } = Select;
/**
 * 被注释掉的是滑块拼图验证功能 暂时保留
 * @returns
 */
const LoginForm = () => {
	const [form] = Form.useForm();
	let {
		login,
		locale,
		setLocale,
		btnTime,
		setBtnTime,
		setBtnCon,
		codeImg,
		getLoginCodeAct,
	} = useFlat("authStore");
	// const [isShow, setIsShow] = useState<boolean>(false);
	const [timer, setTimer] = useState<ReturnType<typeof setInterval>>();
	// const { fn: loginG } = useGreatAsync(login, {
	// 	auto: false,
	// 	single: true,
	// });
	useEffect(() => {
		getVerifCode();
		//图片滑块验证==获取图片地址
		// getImageUrlAct();
		//验证码倒计时刷新时，应保证继续倒计时
		if (btnTime > 0 && btnTime < 60) {
			startTimer();
		}
	}, []);

	const onFinish = async (values: any) => {
		// 开发环境使用默认账号密码
		login({
			username: values.name,
			password: values.password,
			captchaVerification: values.code,
		}).then(() => {
			clearInterval(timer);
			storageHelper.setItem("BTN_CON", "点击获取验证码");
			storageHelper.setItem("BTN_TIME", 60);
		});
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log("Failed:", errorInfo);
	};
	const getVerifCode = () => {
		getLoginCodeAct().then(() => {
			message.success("验证码发送成功");
		});
	};
	// //滑块验证失败
	// const handleFail = () => {
	//   message.warning("验证失败");
	// };
	// 滑块验证成功
	// const handleSucess = () => {
	//   let data = {
	//     name: form.getFieldValue("name"),
	//     password: form.getFieldValue("password"),
	//     captchaVerification: captcha,
	//   };
	//   getLoginCodeAct(data).then(() => {
	//     message.success("验证码发送成功");
	//   });
	//   setIsShow(false);
	//   //获取滑块完成的字段captchaVerification
	//   // getCaptchaAct();
	//   //验证成功之后，重新加载图片
	//   // getImageUrlAct();
	//   //倒计时开始
	//   startTimer();
	// };
	//开启定时器
	const startTimer = () => {
		setTimer(
			setInterval(() => {
				if (btnTime <= 0) {
					restBtn();
				} else {
					setBtnTime(btnTime--);
					setBtnCon(btnTime + "s后重新获取验证码");
				}
			}, 1000),
		);
	};
	//重置获取验证码信息
	const restBtn = () => {
		clearInterval(timer);
		setBtnTime(60);
		setBtnCon("点击获取验证码");
	};
	//刷新回调
	// const handleRefresh = () => {};

	// const handleCloseIconClick = () => {
	//   setIsShow(false);
	// };

	return (
		<Fragment>
			{/* {isShow && (
        <Modal
          open={isShow}
          title="请完成安全验证"
          footer={null}
          closeIcon={<CloseOutlined onClick={handleCloseIconClick} />}>
          <Vertify
            width={420}
            height={200}
            visible={true}
            imgUrl="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            onSuccess={() => handleSucess()} //成功触发事件
            onFail={() => handleFail()} // 失败触发事件
            onRefresh={() => handleRefresh()}
          />
        </Modal>
      )} */}

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
				<Row>
					<Col span={16}>
						<Form.Item
							wrapperCol={{ span: 24 }}
							label=""
							name="code"
							rules={[
								{ required: true, message: "验证码不能为空！" },
							]}
						>
							<Input
								onClick={() => {}}
								placeholder={"请输入验证码"}
							/>
						</Form.Item>
					</Col>
					<Col span={7} offset={1}>
						<Form.Item wrapperCol={{ span: 24 }}>
							{codeImg && (
								<img
									style={{
										height: "32px",
										width: "100%",
									}}
									src={codeImg}
									onClick={() => getVerifCode()}
									alt=""
								/>
							)}
						</Form.Item>
					</Col>
				</Row>
				<Form.Item label="" name="language" initialValue={locale}>
					<Select
						onChange={(e) => {
							setLocale(e);
						}}
					>
						<Option value="zh">
							<img
								src={pic}
								alt=""
								style={{
									verticalAlign: "middle",
									marginRight: "5px",
								}}
							/>
							中文
						</Option>
						<Option value="en">
							<img
								src={pic2}
								alt=""
								style={{
									verticalAlign: "middle",
									marginRight: "5px",
								}}
							/>
							英文
						</Option>
					</Select>
				</Form.Item>

				<Form.Item wrapperCol={{ span: 24 }}>
					<Button
						type="primary"
						htmlType="submit"
						style={{ width: "100%" }}
					>
						登陆
					</Button>
				</Form.Item>
			</Form>
		</Fragment>
	);
};

export default LoginForm;
