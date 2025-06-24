import { ROUTE_ID } from "src/router";
import { dpChain, getActionType } from "src/service";
import { startAppListening } from "src/service";

const watch = ({ branchName }: { branchName: string }) => {
	// 页码一边，就刷新列表
	// 触发页码改变的情景如：
	// 赛选条件变了
	startAppListening({
		type: getActionType(["marketStore", branchName]).setMarketFilterData,
		effect: async () => {
			await dpChain(["marketStore", branchName]).setMarketTablePageData({
				pageNum: 1,
			});
		},
	});
	startAppListening({
		type: getActionType(["marketStore", branchName]).setMarketTablePageData,
		effect: async () => {
			dpChain(["marketStore", branchName]).queryMarkettListAct(null);
		},
	});
	startAppListening({
		predicate: (action) => {
			const { addAct, updateAct, deleteAct } = getActionType([
				"marketStore",
				branchName,
			]);
			return [
				addAct.fulfilled,
				updateAct.fulfilled,
				deleteAct.fulfilled,
			].includes(action.type);
		},
		effect: async () => {
			await dpChain("marketStore").queryMarkettListAct(null);
		},
	});
	startAppListening({
		predicate: (action) => {
			const { addAct, updateAct, deleteAct } = getActionType([
				"marketStore",
				ROUTE_ID.MarketAddPage,
			]);
			const {
				addAct: addEditAct,
				updateAct: updateEditAct,
				deleteAct: deleteEditAct,
			} = getActionType(["marketStore", ROUTE_ID.MarketEditPage]);

			return [
				addEditAct.fulfilled,
				updateEditAct.fulfilled,
				deleteEditAct.fulfilled,
				addAct.fulfilled,
				updateAct.fulfilled,
				deleteAct.fulfilled,
			].includes(action.type);
		},
		effect: async () => {
			await dpChain("marketStore").queryAllMarketListAct(null);
		},
	});
};

export default watch;
