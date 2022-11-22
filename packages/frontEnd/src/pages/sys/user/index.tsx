import "react";
import { Space, Table, Tag } from "antd";
import SearchForm from "./components/searchForm";
import type { ColumnsType } from "antd/es/table";

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const columns: ColumnsType<DataType> = [
  {
    title: "用户编号",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "用户名称",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const data: DataType[] = [
  {
    key: "1123123",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"],
  },
];

export default () => (
  <div>
    <SearchForm />
    <Table columns={columns} dataSource={data} />
  </div>
);
