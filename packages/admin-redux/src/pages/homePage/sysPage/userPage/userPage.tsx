import { Button, Space, Table } from "antd";
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
    render: (text) => <Button href="">{text}</Button>,
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <Button>Invite {record.name}</Button>
        <Button>Delete</Button>
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

const UserPage = () => (
  <div>
    <Table columns={columns} dataSource={data} />
  </div>
);

export default UserPage;
