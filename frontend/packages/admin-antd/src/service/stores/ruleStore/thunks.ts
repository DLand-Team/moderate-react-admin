import { cloneDeep } from "src/common/utils";
import { dpChain, getStore } from "src/service";
import { ruleHelper } from "src/service";
import { createThunks } from "src/service";
import httpApi from "./api";
import {
	Connection,
	DeleteConnectionByPosActPayload,
	GetRuleDetailApiParams,
	ParamsById,
	Rule,
	RuleItineraryItem,
	Segment,
} from "./model";
import slice from "./slice";
import { PageBaseData } from "src/types/common";

const thunks = createThunks(["ruleStore", slice.branch], {
	async initRuleAct(_, __, branchName) {
		const { data } = await httpApi.fetchRuleInitApi();
		const { carrierFamilyList } = data;
		dpChain(["ruleStore", branchName]).setCarrierFamilyList(
			carrierFamilyList,
		);
	},
	getRuleCarrierListAct: async (_, __, branchName) => {
		const { data } = await httpApi.fetchRuleCarrierListApi();
		dpChain(["ruleStore", branchName]).setRuleCarrier(data);
	},
	initItineraryListAct: async (_, __, branchName) => {
		let data = ruleHelper.getItDefault();
		dpChain(["ruleStore", branchName]).setItineraryList(
			data as RuleItineraryItem[],
		);
	},
	// 初始化
	initCurrentDetailAct: async (_, __, branchName) => {
		let ruleData: Rule;
		ruleData = {
			ruleName: "",
			comment: "",
			id: 1,
			ownerId: "1",
			effectEndDate: "20991231",
		} as Rule;
		dpChain(["ruleStore", branchName]).initItineraryListAct(null);
		dpChain(["ruleStore", branchName]).setCurrentRuleData(ruleData);
	},
	getCurrentDetailAct: async (
		params: GetRuleDetailApiParams,
		_,
		branchName,
	) => {
		let ruleData: Rule;
		const { data } = await httpApi.getRuleDetailApi(params);
		ruleData = { ...data } as Rule;
		dpChain(["ruleStore", branchName]).setItineraryList(
			data!?.cpdRuleItinerarys || [],
		);
		dpChain(["ruleStore", branchName]).setCurrentRuleData(ruleData);
	},
	// 查询rule的table列表数据
	queryRuleListAct: async (params: PageBaseData | null, __, branchName) => {
		const { filterData, ruleTablePagedata } = getStore([
			"ruleStore",
			branchName,
		]);
		const { pageNum, pageSize } = { ...ruleTablePagedata, ...params };
		const { data } = await httpApi.getRuleListApi({
			pageNo: pageNum,
			pageSize,
			...filterData,
		});
		data.list && dpChain(["ruleStore", branchName]).setRuletList(data.list);
	},
	// 添加rule
	addRuleAct: async (params: Rule) => {
		params = cloneDeep(params);
		delete params.id;
		params.cpdRuleItinerarys?.forEach((item) => {
			delete item.id;
			item.cpdConnectionList?.forEach((conItem) => {
				delete conItem.id;
			});
			item.cpdSegmentList?.forEach((segItem) => {
				delete segItem.id;
			});
		});
		await httpApi.createApi(params);
	},
	// 更新rule
	updateRuleAct: async (params: Rule) => {
		await httpApi.upadteApi(params);
	},
	// 删除rule
	deleteRuleAct: async (params: any) => {
		await httpApi.deleteApi(params);
	},
	activeRuleAct: async (params: Rule) => {
		await httpApi.activeRuleApi(params);
	},

	// 获取详情++
	getDetailAct: async (params: GetRuleDetailApiParams, _, branchName) => {
		const { data } = await httpApi.getRuleDetailApi(params);
		data && dpChain(["ruleStore", branchName]).setCurrentRuleData(data);
	},
	deleteItineraryByRankAct: async (rankId: number, _, branchName) => {
		const { targetRankId } = getStore(["ruleStore", branchName]);
		const newValue = ruleHelper.deleteItinerarysByRankId(
			{
				rankId,
			},
			getStore(["ruleStore", branchName]),
		);
		if (rankId < targetRankId + 1) {
			dpChain(["ruleStore", branchName]).setTargetRankId(
				targetRankId - 1,
			);
		} else if (rankId == targetRankId + 1) {
			if (targetRankId) {
				dpChain(["ruleStore", branchName]).setTargetItineraryId(
					targetRankId - 1,
				);
			}
			dpChain(["ruleStore", branchName]).setTargetItineraryId(0);
		}
		dpChain(["ruleStore", branchName]).setItineraryList(newValue);
	},
	copyRankAct: async (params: number[], _, branchName) => {
		const newValue = ruleHelper.copyRank(
			params,
			getStore(["ruleStore", branchName]),
		);
		dpChain(["ruleStore", branchName]).setItineraryList(newValue);
	},
	switchRankAct: async (params: number[], _, branchName) => {
		const newValue = ruleHelper.switchRank(
			params,
			getStore(["ruleStore", branchName]),
		);
		dpChain(["ruleStore", branchName]).setItineraryList(newValue);
	},
	deleteItineraryAct: async (uid: string, _, branchName) => {
		const newValue = ruleHelper.deleteItineraryById(
			{ id: uid },
			getStore(["ruleStore", branchName]),
		);
		dpChain(["ruleStore", branchName]).setItineraryList(newValue);
	},
	addItineraryAct: async (payload: RuleItineraryItem, _, branchName) => {
		const newValue = ruleHelper.addItinerary(
			payload,
			getStore(["ruleStore", branchName]),
		);
		dpChain(["ruleStore", branchName]).setItineraryList(newValue);
	},
	switchCategory(payload: number, _, branchName) {
		let value = {};
		if (payload == 3) {
			value = ruleHelper.getItineraryDefault();
		}
		dpChain(["ruleStore", branchName]).updateItineraryAct({
			...value,
			flightCategory: payload,
		});
	},
	updateItineraryAct: async (
		payload: Partial<RuleItineraryItem>,
		_,
		branchName,
	) => {
		const targetItinerary = ruleHelper.getTargetItinerary(
			getStore(["ruleStore", branchName]),
		)!;
		const newValue = ruleHelper.updateItinerary(
			{ ...targetItinerary, ...payload },
			getStore(["ruleStore", branchName]),
		);
		dpChain(["ruleStore", branchName]).setItineraryList(newValue);
	},

	createItByRankAct: async (_, __, branchName) => {
		const itByRankList = ruleHelper.filterItsByRank(
			getStore(["ruleStore", branchName]),
		);
		dpChain(["ruleStore", branchName]).setItByRankList(itByRankList);
	},
	createConAndSeqByPosAct: async (_, __, branchName) => {
		const { cpdConnectionList = [], cpdSegmentList = [] } =
			ruleHelper.getTargetItinerary(
				getStore(["ruleStore", branchName]),
			) || {};
		dpChain(["ruleStore", branchName]).setConByPosList(
			ruleHelper.filterItemByPos(cloneDeep(cpdConnectionList)),
		);
		dpChain(["ruleStore", branchName]).setSegByPosList(
			ruleHelper.filterItemByPos(cloneDeep(cpdSegmentList)),
		);
	},
	// 修改connection的问题
	updateConnectionAct: async (payload: Connection, _, branchName) => {
		const targetItinerary = ruleHelper.updateConnection(
			payload,
			getStore(["ruleStore", branchName]),
		);
		targetItinerary &&
			dpChain(["ruleStore", branchName]).updateItineraryAct(
				targetItinerary,
			);
	},
	addConnectionAct: async (payload: Connection, _, branchName) => {
		const targetItinerary = ruleHelper.addConnection(
			payload,
			getStore(["ruleStore", branchName]),
		);
		dpChain(["ruleStore", branchName]).updateItineraryAct(targetItinerary);
	},
	deleteConnectionAct: async (
		payload: DeleteConnectionByPosActPayload,
		_,
		branchName,
	) => {
		const targetItinerary = ruleHelper.deleteConnection(
			payload,
			getStore(["ruleStore", branchName]),
		);
		dpChain(["ruleStore", branchName]).updateItineraryAct(targetItinerary);
	},
	deleteConnectionByPosAct: async (
		payload: DeleteConnectionByPosActPayload,
		_,
		branchName,
	) => {
		const targetItinerary = ruleHelper.deleteConnectionByPos(
			payload,
			getStore(["ruleStore", branchName]),
		);
		dpChain(["ruleStore", branchName]).updateItineraryAct(targetItinerary);
	},
	// 添加Segment
	addSegmentAct: async (payload: Segment, _, branchName) => {
		const targetItinerary = ruleHelper.addSegment(
			payload,
			getStore(["ruleStore", branchName]),
		);
		dpChain(["ruleStore", branchName]).updateItineraryAct(targetItinerary);
	},
	// 更新Segment
	updateSegmentAct: async (payload: Segment, _, branchName) => {
		const targetItinerary = ruleHelper.updateSegment(
			payload,
			getStore(["ruleStore", branchName]),
		);
		if (targetItinerary) {
			dpChain(["ruleStore", branchName]).updateItineraryAct(
				targetItinerary,
			);
		}
	},
	deleteSegmentAct: async (payload: ParamsById, _, branchName) => {
		const targetItinerary = ruleHelper.deleteSegmentById(
			payload,
			getStore(["ruleStore", branchName]),
		);
		dpChain(["ruleStore", branchName]).updateItineraryAct(targetItinerary);
	},
});
export default thunks;
