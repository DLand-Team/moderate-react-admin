import state, { initState } from "./state";
import actions from "./action";
import watch from "./watch";
import map from "./map";
import { useFlatInject } from "@/common/hooks";

const store = {
	// 状态
	state,
	// 计算属性
	actions: {
		...actions,
		init: initState,
	},
	maps:map,
	watch,
};

export default store;

export const useStore = () => useFlatInject("helloPageStore");
