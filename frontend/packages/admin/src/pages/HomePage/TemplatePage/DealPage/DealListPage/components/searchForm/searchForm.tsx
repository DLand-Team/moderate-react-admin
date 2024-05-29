import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { Button, Col, Form, Row } from "antd";
import React, { useState } from "react";
import { useSearch } from "src/common/hooks/useSearch";
import { useFlat } from "src/service";
import useConfig from "../../useConfig";

const AdvancedSearchForm = () => {
	const config = useConfig();
	const SearchFields = useSearch({
		config,
	});
	const [expand, setExpand] = useState(false);
	let count = 4;

	const [form] = Form.useForm();
	const { pageData, queryDealListAct } = useFlat("dealStore");
	const { pageSize } = pageData;
	const onFinish = (values: any) => {
		console.log("Received values of form: ", values);
	};

	return (
		<Form form={form} onFinish={onFinish}>
			<Row gutter={24}>
				{expand ? SearchFields : SearchFields.slice(0, count)}
			</Row>
			<Row>
				<Col span={24} style={{ textAlign: "right" }}>
					<Button
						onClick={() => {
							queryDealListAct({
								...form.getFieldsValue(),
								page: 1,
								page_size: pageSize,
							});
						}}
						type="primary"
						htmlType="submit"
					>
						Search
					</Button>
					<Button
						style={{ margin: "0 8px" }}
						onClick={() => {
							form.resetFields();
						}}
					>
						Clear
					</Button>
					<a
						style={{ fontSize: 12 }}
						onClick={() => {
							setExpand(!expand);
						}}
					>
						{expand ? <UpOutlined /> : <DownOutlined />} Collapse
					</a>
				</Col>
			</Row>
		</Form>
	);
};

const App: React.FC = () => (
	<div style={{ marginBottom: "32px" }}>
		<AdvancedSearchForm />
	</div>
);

export default App;
