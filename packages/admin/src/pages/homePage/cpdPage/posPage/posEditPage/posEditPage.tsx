import { Col, Form, Input, Row, Typography, type FormProps } from "antd";
import React from "react";
import TablePart from "./components/tablePart";
type FieldType = {
	posName?: string;
	comment?: string;
};

const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
	console.log("Success:", values);
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
	console.log("Failed:", errorInfo);
};

const TopPart: React.FC = () => {
	return (
		<div>
			<Typography
				style={{
					fontSize: "16px",
					marginBottom: "30px",
				}}
			>
				销售地详细信息
			</Typography>
			<Form
				layout="vertical"
				name="basic"
				wrapperCol={{ span: 16 }}
				style={{ width: "100%" }}
				initialValues={{ remember: true }}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete="off"
			>
				<Row
					style={{
						width: "100%",
					}}
				>
					<Col span={12}>
						<Form.Item<FieldType>
							label="销售地名称"
							name="posName"
							rules={[
								{
									required: true,
									// message: `${intlData["posPage.placeholder_input"]} ${intlData["posPage.POSName"]}`,
								},
								{
									max: 30,
									// message: intlData["posPage.rule_posName_1"],
								},
								{
									pattern: /^[0-9a-zA-z_-]+$/,
									// message: intlData["posPage.placeholder_posName"],
								},
							]}
						>
							<Input />
						</Form.Item>
					</Col>

					<Col span={12}>
						<Form.Item<FieldType> label="描述" name="comment">
							<Input.TextArea style={{ height: 120 }} />
						</Form.Item>
					</Col>
				</Row>
			</Form>
		</div>
	);
};

const Page = () => {
	return (
		<div>
			<TopPart></TopPart>
			<TablePart></TablePart>
		</div>
	);
};
export default Page;
