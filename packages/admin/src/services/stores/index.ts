import categoryPageStore from "@/pages/homePage/cmsPage/categoryPage/services/pageStore";
import companyPageStore from "@/pages/homePage/cmsPage/partnerPage/services/pageStore";
import enquiryPageStore from "@/pages/homePage/cmsPage/enquiryPage/services/pageStore";
import feedbackPageStore from "@/pages/homePage/cmsPage/memberFeedbackPage/services/pageStore";
import opportunityPageStore from "@/pages/homePage/cmsPage/opportunityPage/services/pageStore";
import paymentPageStore from "@/pages/homePage/cmsPage/paymentPage/services/pageStore";
import tagPageStore from "@/pages/homePage/cmsPage/tagPage/services/pageStore";
import usersPageStore from "@/pages/homePage/cmsPage/memberPage/services/pageStore";
import commentPageStore from "@/pages/homePage/cmsPage/commentPage/services/pageStore";
import notifyPageStore from "@/pages/homePage/cmsPage/notifyPage/services/pageStore";
import dealPageStore from "@/pages/homePage/cmsPage/dealPage/services/pageStore";
import helloPageStore from "@/pages/homePage/helloPage/services/pageStore";
import { createStore } from "natur";
import { thunkMiddleware } from "natur-immer";
import {
	fillObjectRestDataMiddleware,
	filterUndefinedMiddleware,
	promiseMiddleware,
	shallowEqualMiddleware,
} from "natur/dist/middlewares";
import appStore from "./appStore";
import articleStore from "./articleStore/articleStore";
import devStore from "./devStore/devStore";
import permissionStore from "./permissionStore/permissionStore";
import routerStore from "./routerStore/routerStore";
import userInfoStore from "./userInfoStore/userInfoStore";

// MODERATE_AUTO_STORES_1:START
const stores = {
	routerStore,
	userInfoStore,
	articleStore,
	appStore,
	permissionStore,
	devStore,
	companyPageStore,
	categoryPageStore,
	commentPageStore,
	dealPageStore,
	notifyPageStore,
	opportunityPageStore,
	tagPageStore,
	enquiryPageStore,
	feedbackPageStore,
	paymentPageStore,
	usersPageStore,
	helloPageStore,
};
// MODERATE_AUTO_STORES_1:END
export const store = createStore(
	stores, // 同步加载模块
	{}, // 懒加载模块
	{
		middlewares: [
			thunkMiddleware,
			promiseMiddleware,
			fillObjectRestDataMiddleware,
			shallowEqualMiddleware,
			filterUndefinedMiddleware,
		],
	}, //中间价
);
