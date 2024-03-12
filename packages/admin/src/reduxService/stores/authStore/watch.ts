import { dp, getActionType } from "../..";
import { startAppListening } from "../../setup";

const watch = () => {
	// startAppListening({
	//   matcher: createMatcher<SliceState>((action) => {
	//     let flag =
	//       action.type ==
	//         `${getActionType("ecommerceStore").likeDealAct}/fulfilled` ||
	//       action.type ==
	//         `${getActionType("authStore").userUpdateAct}/fulfilled` ||
	//       action.type ==
	//         `${getActionType("authStore").changePasswdAct}/fulfilled` ||
	//       action.type ==
	//         `${getActionType("opportunityStore").opportunityWishAct}/fulfilled` ||
	//       action.type == `${getActionType("authStore").setToken}`;
	//     return flag;
	//   }),
	//   effect: (_, state) => {
	//     if (state.getState().authStore.token) {
	//       dp("authStore", "userInfoMemberAct");
	//     }
	//   },
	// });
	// startAppListening({
	//   type: getActionType("appStore").setAppInfo,
	//   effect: () => {
	//     dp("authStore", "set", "123");
	//   },
	// });
	// 监听例子
	// startAppListening({
	//   predicate: (action, currentState, previousState) => {
	//     return false;
	//   },
	//   effect: async (action, listenerApi) => {},
	// });
	startAppListening({
		predicate: (action, currentState, previousState) => {
			return false;
		},
		effect: async (action, listenerApi) => {},
	});
};

export default watch;
