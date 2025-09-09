import FormItemHoc, {
  type FormItemHocProps,
} from "src/common/hocs/formItemHoc";
import { Upload, UploadProps, message } from "antd";

const UploadNor = ({
  options,
  ...rest
}: FormItemHocProps & { options: UploadProps }) => {
  return (
    <FormItemHoc valuePropName="fileList" {...rest}>
      <Upload
        listType="picture-card"
        data={{
          token: sessionStorage.getItem("QINIU_TOKEN"),
          key: "img/" + new Date().getTime(),
        }}
        onChange={(info) => {
          if (info.file.status === "done") {
            message.success(`${info.file.name} file uploaded successfully`);
          } else if (info.file.status === "error") {
            message.error(`${info.file.name} file upload failed.`);
          }
        }}
        action={"https://upload-z2.qiniup.com"}
        {...options}
      >
        <div>
          <div style={{ marginTop: 8 }}>上传</div>
        </div>
      </Upload>
    </FormItemHoc>
  );
};
export default UploadNor;
