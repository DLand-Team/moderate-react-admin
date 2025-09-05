import { Form, FormItemProps } from "antd";
import React from "react";

export type FormItemHocProps = FormItemProps & {
	isForm?: boolean;
	Comp?: React.FC<any>;
};

const FromItemHoc = ({
	Comp = () => <div></div>,
	rules,
	isForm = true,
	children,
	...rest
}: FormItemHocProps) => {
	let temp = { ...rest };

	return (
		<>
			{isForm ? (
				<Form.Item
					rules={
						rules || [
							{
								required: true,
								message: "不可为空!",
							},
						]
					}
					{...temp}
				>
					{children}
				</Form.Item>
			) : (
				<Comp />
			)}
		</>
	);
};

export default FromItemHoc;
