import { lazy } from "react";

// MODERATE_AUTO_PAGE_LAZY_IMPORT:START
const HomePage = lazy(() => import("./HomePage/homePage"));
const LoginPage = lazy(() => import("./LoginPage/loginPage"));
const HelloPage = lazy(() => import("./HomePage/HelloPage/helloPage"));
// 系统管理 sysPage
// 用户管理
const UserPage = lazy(() => import("./HomePage/SysPage/UserPage/userPage"));
// 角色管理
const RolePage = lazy(() => import("./HomePage/SysPage/RolePage/rolePage"));
// 内容管理 cmsPage
// 图片管理
// 页面管理
const PageDevPage = lazy(() => import("./HomePage/DevPage/PageDevPage"));
//permissionPage
const PermissionPage = lazy(
	() => import("./HomePage/PermissionPage/permissionPage"),
);
//storeDevPage
const StoreDevPage = lazy(() => import("./HomePage/DevPage/StoreDevPage"));
//apiDevPage
const ApiDevPage = lazy(() => import("./HomePage/DevPage/ApiDevPage"));

////posPage
const PosPage = lazy(() => import("./HomePage/CpdPage/PosPage"));

////posEditPage
const PosEditPage = lazy(
	() => import("./HomePage/CpdPage/PosPage/PosEditPage"),
);
////notFundPage
const NotFundPage = lazy(() => import("./HomePage/NotFundPage/notFundPage"));
////posListPage
const PosListPage = lazy(
	() => import("./HomePage/CpdPage/PosPage/PosListPage"),
);
////filterPage
const FilterPage = lazy(() => import("./HomePage/CpdPage/FilterPage"));
////filterListPage
const FilterListPage = lazy(
	() => import("./HomePage/CpdPage/FilterPage/FilterListPage/filterListPage"),
);
////sortPage
const SortPage = lazy(() => import("./HomePage/CpdPage/SortPage/sortPage"));
////sortListPage
const SortListPage = lazy(
	() => import("./HomePage/CpdPage/SortPage/SortListPage/sortListPage"),
);

////marketPage
const MarketPage = lazy(() => import("./HomePage/CpdPage/MarketPage"));
////marketListPage
const MarketListPage = lazy(
	() => import("./HomePage/CpdPage/MarketPage/MarketListPage"),
);
////marketEditPage
const MarketEditPage = lazy(
	() => import("./HomePage/CpdPage/MarketPage/MarketEditPage"),
);
////carrierPage
const CarrierPage = lazy(
	() => import("./HomePage/CpdPage/CarrierPage/carrierPage"),
);
////carrierListPage
const CarrierListPage = lazy(
	() =>
		import(
			"./HomePage/CpdPage/CarrierPage/CarrierListPage/carrierListPage"
		),
);
////menuPage
const MenuPage = lazy(() => import("./HomePage/SysPage/MenuPage/menuPage"));

const DealPage = lazy(() => import("./HomePage/CmsPage/DealPage/dealPage"));
//MODERATE_AUTO_PAGE_LAZY_IMPORT:END
export const pageList = {
	HomePage,
	LoginPage,
	HelloPage,
	UserPage,
	RolePage,
	PageDevPage,
	PermissionPage,
	StoreDevPage,
	ApiDevPage,
	PosPage,
	PosEditPage,
	NotFundPage,
	PosListPage,
	FilterPage,
	FilterListPage,
	SortPage,
	SortListPage,
	MarketPage,
	MarketListPage,
	MarketEditPage,
	CarrierPage,
	CarrierListPage,
	MenuPage,
	DealPage,
};
