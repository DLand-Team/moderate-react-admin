import { Button, Card } from "antd";
import DataModalForm from "./components/data-modal-form";
import MenuModalForm from "./components/menu-modal-form";
import ModalForm from "./components/modalForm";
import RoleTable from "./components/roleTable";
import { dpChain } from "src/service";
import { RoleModalType } from "src/service/stores/sysStore/model";

const UserPage = () => {
  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <Card
        style={{
          marginBottom: "25px",
        }}
      >
        <Button
          onClick={() => {
            dpChain("sysStore").setRoleModalType(RoleModalType.ADD);
          }}
        >
          新增角色
        </Button>
      </Card>
      <RoleTable />
      <ModalForm />
      <MenuModalForm />
      <DataModalForm />
    </div>
  );
};
export default UserPage;
