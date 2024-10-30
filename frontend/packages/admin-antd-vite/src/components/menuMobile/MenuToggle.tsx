import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button } from "antd";

export const MenuToggle = ({
	toggle,
	isOpen,
}: {
	toggle: any;
	isOpen: boolean;
}) => (
	<Button
		style={{
			position: "absolute",
			zIndex: isOpen ? 1001 : 5,
		}}
		icon={isOpen ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
		onClick={toggle}
	></Button>
);
