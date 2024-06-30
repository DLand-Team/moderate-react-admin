import { UUID } from "src/common/utils";
import { Pos, PosItem } from "src/service/stores/posStore/model";

export const posCreater = (params: Partial<Pos>={}): Pos => {
	return {
		uid: UUID(),
		posName: "",
		ownerId: "",
		comment: "",
		cpdPosItems: [],
		...params,
	};
};

export const posItemCreater = (params: Partial<PosItem>): PosItem => {
	return {
		uid: UUID(),
		createTime: Date.now().toString(),
		updateTime: Date.now().toString(),
		creator: "test",
		updater: "test",
		deleted: true,
		posInfo: "test",
		posType: "0",
		agentOrAirline: "test",
		officeOwner: "test",
		exclude: false,
		weight: 1,
		key: UUID(),
		...params,
	} as PosItem;
};
