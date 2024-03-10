import { lazy } from "react";
// MODERATE_AUTO_PAGE_LAZY_IMPORT:START
const HomePage = lazy(() => import("./homePage/homePage"));
const LoginPage = lazy(() => import("./loginPage/loginPage"));
const HelloPage = lazy(() => import("./homePage/helloPage/helloPage"));
// 系统管理 sysPage
// 用户管理
const UserPage = lazy(() => import("./homePage/sysPage/userPage/userPage"));
// 角色管理
const RolePage = lazy(() => import("./homePage/sysPage/rolePage/rolePage"));
// 内容管理 cmsPage
// 文章页面
const ArticlePage = lazy(
	() => import("./homePage/sysPage/articlePage/articlePage"),
);
// 图片管理
// 页面管理
const PageDevPage = lazy(
	() => import("./homePage/devPage/pageDevPage/pageDevPage"),
);
//permissionPage
const PermissionPage = lazy(
	() => import("./homePage/permissionPage/permissionPage"),
);
//storeDevPage
const StoreDevPage = lazy(
	() => import("./homePage/devPage/storeDevPage/storeDevPage"),
);
//apiDevPage
const ApiDevPage = lazy(
	() => import("./homePage/devPage/apiDevPage/apiDevPage"),
);

////companyPage
const PartnerPage = lazy(
	() => import("./homePage/cmsPage/partnerPage/companyPage"),
);
////categoryPage
const CategoryPage = lazy(
	() => import("./homePage/cmsPage/categoryPage/categoryPage"),
);
////opportunityPage
const OpportunityPage = lazy(
	() => import("./homePage/cmsPage/opportunityPage/opportunityPage"),
);
////tagPage
const TagPage = lazy(() => import("./homePage/cmsPage/tagPage/tagPage"));
////enquiryPage
const EnquiryPage = lazy(
	() => import("./homePage/cmsPage/enquiryPage/enquiryPage"),
);
////feedbackPage
const MemberFeedbackPage = lazy(
	() => import("./homePage/cmsPage/memberFeedbackPage/memberFeedbackPage"),
);
////paymentPage
const PaymentPage = lazy(
	() => import("./homePage/cmsPage/paymentPage/paymentPage"),
);
////usersPage
const MemberPage = lazy(
	() => import("./homePage/cmsPage/memberPage/memberPage"),
);
////commentPage
const CommentPage = lazy(
	() => import("./homePage/cmsPage/commentPage/commentPage"),
);
////dealPage
const DealPage = lazy(() => import("./homePage/cmsPage/dealPage/dealPage"));
////connectionPage
const ConnectionPage = lazy(
	() => import("./homePage/cmsPage/connectionPage/connectionPage"),
);
////notifyPage
const NotifyPage = lazy(
	() => import("./homePage/cmsPage/notifyPage/notifyPage"),
);
//MODERATE_AUTO_PAGE_LAZY_IMPORT:END
export const pageList = {
	HomePage,
	LoginPage,
	HelloPage,
	UserPage,
	RolePage,
	ArticlePage,
	PageDevPage,
	PermissionPage,
	StoreDevPage,
	ApiDevPage,
	PartnerPage,
	CategoryPage,
	OpportunityPage,
	TagPage,
	EnquiryPage,
	MemberFeedbackPage,
	PaymentPage,
	MemberPage,
	CommentPage,
	DealPage,
	ConnectionPage,
	NotifyPage,
};
