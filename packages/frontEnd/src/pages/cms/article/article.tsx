import { Button, Space, Table, Upload, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import "react";
import styles from "./article.module.scss";
import SearchForm from "./components/searchForm";
import { useEffect, useState } from "react";
import { getQiNiuToken } from "./service";
import ModalForm from "./components/modalForm/modalForm";

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const columns: ColumnsType<DataType> = [
  {
    title: "编号",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "文章名称",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "操作",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a>修改</a>
      </Space>
    ),
  },
];

const data: DataType[] = [];

const articleCtr = () => {
  const [token, setToken] = useState<string>("");
  useEffect(() => {
    getQiNiuToken().then((res) => {
      setToken(res.data.token);
    });
  }, []);
  return (
    <div className={styles.content}>
      {/* <SearchForm /> */}
      <div className={styles.operate_board}>
        <ModalForm />
        <Upload
          data={{
            token,
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
        >
          <Button>上传</Button>
        </Upload>
      </div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default articleCtr;
