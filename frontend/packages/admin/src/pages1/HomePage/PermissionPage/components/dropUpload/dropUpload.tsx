import { InboxOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { Upload } from "antd";

const { Dragger } = Upload;

const DropUpload = (props: { handleUploadMd: (mdStr: string) => void }) => {
	const { handleUploadMd } = props;
	const uploadProps: UploadProps = {
		beforeUpload: (file) => {
			const reader = new FileReader();
			reader.readAsText(file);
			reader.onload = function (e) {
				handleUploadMd(e.target!?.result as string);
			};
			return false;
		},
		name: "file",
		multiple: true,
		showUploadList: false,
	};
	return (
		<Dragger {...uploadProps}>
			<p className="ant-upload-drag-icon">
				<InboxOutlined />
			</p>
			<p className="ant-upload-text">点击或者拖拽上传</p>
			<p className="ant-upload-hint">
				支持单个或批量上传。严禁上传公司数据或其他带有版权的文件
			</p>
		</Dragger>
	);
};

export default DropUpload;
