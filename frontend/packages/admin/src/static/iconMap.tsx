import {
	FundProjectionScreenOutlined,
	ApartmentOutlined,
	CoffeeOutlined,
	FireOutlined,
	LaptopOutlined,
	ProductOutlined,
} from "@ant-design/icons";

const MenuIconMap = {
	ProductOutlined,
	FundProjectionScreenOutlined,
	ApartmentOutlined,
	CoffeeOutlined,
	FireOutlined,
	LaptopOutlined,
};

export type MenuIconType = keyof typeof MenuIconMap;

export default MenuIconMap;
