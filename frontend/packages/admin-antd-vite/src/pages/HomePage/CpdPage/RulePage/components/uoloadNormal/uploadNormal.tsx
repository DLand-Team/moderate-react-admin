import { useEffect, useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload } from "antd";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";

const App = () => {
	const [fileList, setFileList] = useState<UploadFile[]>([]);
	const [uploading, setUploading] = useState(false);

	const handleUpload = () => {
		const formData = new FormData();
		fileList.forEach((file) => {
			formData.append("files[]", file as RcFile);
		});
		setUploading(true);
		// You can use any AJAX library you like
		fetch("https://www.mocky.io/v2/5cc8019d300000980a055e76", {
			method: "POST",
			body: formData,
		})
			.then((res) => res.json())
			.then(() => {
				setFileList([]);
				message.success("upload successfully.");
			})
			.catch(() => {
				message.error("upload failed.");
			})
			.finally(() => {
				setUploading(false);
			});
	};

	useEffect(() => {
		const file = fileList[0];
		if (!file) return;
		let data = {
			id: 11,
			file_size: file.size,
			content_type: file.type,
			file_name: "123123",
		};
		fetch("/nestApi/company/upload/logo", {
			method: "POST",
			body: JSON.stringify(data),
			headers: {
				Authorization: "bearer 76e7df82-a111-47aa-bf50-dfca396f7b73",
			},
		})
			.then((res) => res.json())
			.then(() => {
				setFileList([]);
				message.success("upload successfully.");
			});
	}, [fileList]);

	const props: UploadProps = {
		onRemove: (file) => {
			const index = fileList.indexOf(file);
			const newFileList = fileList.slice();
			newFileList.splice(index, 1);
			setFileList(newFileList);
		},
		beforeUpload: (file) => {
			setFileList([...fileList, file]);
			return false;
		},
		fileList,
	};

	return (
		<>
			<Upload {...props}>
				<Button icon={<UploadOutlined />}>Select File</Button>
			</Upload>
			<Button
				type="primary"
				onClick={handleUpload}
				disabled={fileList.length === 0}
				loading={uploading}
				style={{ marginTop: 16 }}
			>
				{uploading ? "Uploading" : "Start Upload"}
			</Button>
		</>
	);
};

export default App;
