import { Form, Modal, Typography } from "antd";
import { MyColumnType } from "src/common/utils";
import { DealEntity } from "src/service/stores/dealStore/model";

export const getAttachments = (list: string[], name: string[]) => {
	return list.map<MyColumnType<DealEntity>>((item, index) => {
		let nameArr = [...name, index];
		return {
			title: nameArr.join("-"),
			dataIndex: index,
			key: nameArr.join("-"),
			fieldConfig: {
				render() {
					return (
						<a
							onClick={() => {
								Modal.confirm({
									width: "950px",
									style: {
										position: "relative",
									},
								});
							}}
						>
							{item}
						</a>
					);
				},
				formOptions: {
					label: nameArr.join("-"),
					name: nameArr,
				},
			},
		};
	});
};

export const getPics = (list: string[], name: string[]) => {
	return list.map<MyColumnType<DealEntity>>((item, index) => {
		let nameArr = [...name, index];
		return {
			title: nameArr.join("-"),
			dataIndex: index,
			key: nameArr.join("-"),
			fieldConfig: {
				render() {
					return (
						<Form.Item label={nameArr.join("-")}>
							<Typography>{item}</Typography>
							<img width={"30%"} src={item} alt={item} />
						</Form.Item>
					);
				},
				formOptions: {
					label: nameArr.join("-"),
					name: nameArr,
				},
			},
		};
	});
};
