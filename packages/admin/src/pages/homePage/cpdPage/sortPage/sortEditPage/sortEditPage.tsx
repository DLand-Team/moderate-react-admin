import {
	Button,
	Col,
	Form,
	Input,
	Row,
	Typography,
	type FormProps,
} from "antd";
import { useTranslation } from "react-i18next";
import { RouterHelper } from "src/reduxService";
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

const TopPart = () => {
	const { t } = useTranslation(["pos"]);
	return (
		<div>
			<Typography
				style={{
					fontSize: "16px",
					marginBottom: "30px",
				}}
			>
				{t("posPage.itemListTitle")}
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
									message: `${t("posPage.placeholder_input")} ${t("posPage.POSName")}`,
								},
								{
									max: 30,
									message: t("posPage.rule_posName_1"),
								},
								{
									pattern: /^[0-9a-zA-z_-]+$/,
									message: t("posPage.placeholder_posName"),
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
	const { t } = useTranslation(["pos"]);
	return (
		<div className="posEditContent">
			<TopPart></TopPart>
			<div className="btnTable">
				<Button
					// onClick={debounce(this.save)}
					style={{ marginRight: 10 }}
					type="primary"
				>
					{t`posPage.save`}
				</Button>
				<Button
					onClick={() => {
						RouterHelper.goBack();
					}}
				>
					{t`posPage.cancel`}
				</Button>
			</div>
		</div>
	);
};
export default Page;
