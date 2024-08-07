import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, FormInstance, Typography } from "antd";
import React from "react";
import { Field, FieldConfig } from "src/common/utils";

const MultipleFieldObj: React.FC<{
	fieldConfig: FieldConfig;
	formIns: FormInstance;
}> = (props) => {
	const { fieldConfig, formIns } = props;
	const { formOptions, childFieldConfig } = fieldConfig;
	const list = Object.entries(childFieldConfig || {});

	return (
		<>
			<Typography.Title level={5}>{formOptions?.label}</Typography.Title>
			<Form.List {...(formOptions as any)}>
				{(fields, { add, remove }) => {
					return (
						<>
							{fields.map(({ key, name, ...restField }) => {
								return (
									<div key={key} style={{ marginBottom: 8 }}>
										{list.map(([p, value]) => {
											const { formOptions, ...rest } =
												value;
											return (
												<Field
													formIns={formIns}
													fieldConfig={{
														...rest,
														formOptions: {
															...formOptions,
															...restField,
															label: p,
															name: [name, p],
														},
													}}
												/>
											);
										})}

										<MinusCircleOutlined
											onClick={() => remove(name)}
										/>
									</div>
								);
							})}
							<Form.Item>
								<Button
									type="dashed"
									onClick={() => add()}
									block
									icon={<PlusOutlined />}
								>
									Add field
								</Button>
							</Form.Item>
						</>
					);
				}}
			</Form.List>
		</>
	);
};

export default MultipleFieldObj;
