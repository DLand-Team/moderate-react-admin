import { dp, dpChain, getActionType } from "src/service";
import { startAppListening } from "src/service/setup";

const watch = (branchName: string) => {
	startAppListening({
		type: getActionType(["posStore", branchName]).setPosFilterData,
		effect: async () => {
			await dpChain(["posStore", branchName]).setPosTablePageData({
				pageNum: 1,
			});
		},
	});
	startAppListening({
		type: getActionType(["posStore", branchName]).setPosTablePageData,
		effect: async () => {
			dp("posStore", "queryPostListAct");
			await dpChain(["posStore", branchName]).queryPostListAct(null);
		},
	});
};

export default watch;
