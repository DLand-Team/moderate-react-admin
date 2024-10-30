import { ROUTE_ID } from "src/router";
import { dp, dpChain, getActionType } from "src/service";
import { startAppListening } from "src/service";

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
	startAppListening({
		predicate: (action) => {
			const { addPosAct, updatePosAct, deletePosAct } = getActionType([
				"posStore",
				branchName,
			]);
			return [
				addPosAct.fulfilled,
				updatePosAct.fulfilled,
				deletePosAct.fulfilled,
			].includes(action.type);
		},
		effect: async () => {
			await dpChain("posStore").queryPostListAct(null);
		},
	});
	startAppListening({
		predicate: (action) => {
			const { addPosAct, updatePosAct, deletePosAct } = getActionType([
				"posStore",
				ROUTE_ID.PosAddPage,
			]);
			return [
				addPosAct.fulfilled,
				updatePosAct.fulfilled,
				deletePosAct.fulfilled,
			].includes(action.type);
		},
		effect: async () => {
			await dpChain("posStore").queryAllPostListAct(null);
		},
	});
};

export default watch;
