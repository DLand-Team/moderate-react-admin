import {
	FundProjectionScreenOutlined,
	ApartmentOutlined,
	CoffeeOutlined,
	FireOutlined,
	LaptopOutlined,
	ProductOutlined,
	StarOutlined,
} from "@ant-design/icons";

const MenuIconMap = {
	ProductOutlined,
	FundProjectionScreenOutlined,
	ApartmentOutlined,
	CoffeeOutlined,
	StarOutlined,
	FireOutlined,
	LaptopOutlined,
};

export type MenuIconType = keyof typeof MenuIconMap;

export default MenuIconMap;
