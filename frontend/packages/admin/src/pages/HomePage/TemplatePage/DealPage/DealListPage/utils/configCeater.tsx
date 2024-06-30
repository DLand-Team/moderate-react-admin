import { Form, Modal, Typography } from "antd";
import PdfPreview from "plugins/moderate-plugin-pdf/common/components/pdfPreview";
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
								let url = item.replace(
									"https://d2k5mqgnyo4nix.cloudfront.net",
									"/doc",
								);
								Modal.confirm({
									width: "950px",
									style: {
										position: "relative",
									},
									content: <PdfPreview pdfUrl={url} />,
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
