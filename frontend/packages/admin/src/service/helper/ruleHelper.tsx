import { UUID } from "src/common/utils";
import {
    Connection,
    DeleteConnectionByPosActPayload,
    ParamsById,
    RuleItineraryItem,
    Segment,
    StoreState,
} from "../stores/ruleStore/model";
import { cloneDeep } from "lodash-es";
import { itineraryItem } from "src/shapes";

export class RuleHelper {
    // 扁平化二维数组，通过pos进行分布的
    static flatByPosList<T>({
        pos,
        payload,
        list,
    }: {
        pos: number;
        payload: T[];
        list: T[][];
    }): T[] {
        list[pos] = payload;
        let newList: any[] = [];
        list.forEach((item: any) => {
            if (item) {
                newList = [...newList, ...item];
            }
        });
        return newList;
    }
    static flatList<T>({
        list,
    }: {
        pos: number;
        payload: T[];
        list: T[][];
    }): T[] {
        let newList: any[] = [];
        list.forEach((item: any) => {
            if (item) {
                newList = [...newList, ...item];
            }
        });
        return newList;
    }
    static filterItsByRank = (state: StoreState) => {
        const { itineraryList } = state;
        let temp: RuleItineraryItem[][] = [];
        itineraryList.forEach((item) => {
            !(item.rankId - 1 in temp) && (temp[item.rankId - 1] = []);
            temp[item.rankId - 1].push(item);
        });
        return temp;
    };
    static filterItemByPos(
        arr: Partial<Connection>[] | Partial<Segment>[] = []
    ) {
        let temp: any[] = [];
        arr.forEach((item) => {
            if (!item.position) return;
            !(item.position! in temp) && (temp[item.position!] = []);
            if (!item.uid) item.uid = UUID();
            temp[item.position!].push(item);
        });
        return temp;
    }
    static processSwitchItemData = (itemData: any) => {
        delete itemData.itineraryId;
        Array.isArray(itemData.cpdSegmentList) &&
            itemData.cpdSegmentList.forEach((item: any) => {
                delete item.segmentId;
            });

        Array.isArray(itemData.cpdConnectionList) &&
            itemData.cpdConnectionList.forEach((item: any) => {
                delete item.connectionId;
            });
        return itemData;
    };
    static getTargetItinerary(state: StoreState) {
        const { itByRankList, targetRankId, targetItineraryId } = state;
        const itByRankListTemp = cloneDeep(itByRankList);
        const targetItinerary =
            itByRankListTemp[targetRankId][targetItineraryId];
        return targetItinerary;
    }
    static getItDefault() {
        return [
            {
                rankId: 1,
                flightCategory: 2,
                uid: UUID(),
                cpdSegmentList: [
                    {
                        position: 1,
                        key: UUID(),
                        uid: UUID(),
                        carrier: "ALL",
                    },
                    {
                        position: 2,
                        uid: UUID(),
                        key: UUID(),
                        carrier: "ALL",
                    },
                ],
                cpdConnectionList: [
                    { position: 1, uid: UUID(), key: UUID(), exclude: true },
                ],
                allowCodeShare: 1,
            } as any,
            itineraryItem({
                uid: "2",
                flightCategory: 1,
                allowCodeShare: 1,
            }),
            itineraryItem({ rankId: 2, flightCategory: 3 }),
            itineraryItem({
                rankId: 3,
                flightCategory: 3,
                cpdSegmentList: [
                    {
                        position: 1,
                        key: UUID(),
                        uid: UUID(),
                        carrier: "ALL",
                    },
                    {
                        position: 2,
                        uid: UUID(),
                        key: UUID(),
                        carrier: "ALL",
                    },
                    {
                        position: 3,
                        uid: UUID(),
                        key: UUID(),
                        carrier: "ALL",
                    },
                ],
                cpdConnectionList: [
                    { position: 1, uid: UUID(), key: UUID(), exclude: true },
                    { position: 2, uid: UUID(), key: UUID(), exclude: true },
                ],
            }),
        ];
    }

    static getItineraryDefault() {
        return {
            cpdConnectionList: [
                {
                    position: 1,
                    uid: UUID(),
                    key: UUID(),
                    exclude: true,
                },
            ],
            cpdSegmentList: [
                {
                    position: 1,
                    key: UUID(),
                    uid: UUID(),
                    carrier: "ALL",
                },
                {
                    position: 2,
                    uid: UUID(),
                    key: UUID(),
                    carrier: "ALL",
                },
            ],
        };
    }

    static initItinerary(payload: RuleItineraryItem) {
        let temp = payload;
        if (temp.cpdConnectionList.length == 0) {
            temp = {
                ...temp,
                ...RuleHelper.getItineraryDefault(),
            };
        }
        return temp;
    }

    static deleteItinerarysByRankId(
        { rankId }: { rankId: number },
        state: StoreState
    ) {
        const { itineraryList } = state;
        const itineraryListTemp = cloneDeep(itineraryList).filter((item) => {
            return item.rankId != rankId;
        });
        return itineraryListTemp;
    }
    static deleteItineraryById({ id }: { id: string }, state: StoreState) {
        const { itineraryList } = state;
        const itineraryListTemp = cloneDeep(itineraryList);
        let targetId = itineraryListTemp.findIndex((item) => {
            return item.uid! === id;
        });
        if (targetId !== -1) {
            itineraryListTemp.splice(targetId, 1);
        }
        return itineraryListTemp;
    }
    static addItinerary(payload: RuleItineraryItem, state: StoreState) {
        const { itineraryList } = state;
        const itineraryListTemp = cloneDeep(itineraryList);
        payload.uid = UUID();
        itineraryListTemp.push(payload);
        return itineraryListTemp;
    }
    static updateItinerary(payload: RuleItineraryItem, state: StoreState) {
        const { itineraryList } = state;
        const itineraryListTemp = cloneDeep(itineraryList);
        const targetIndex = itineraryListTemp.findIndex((item) => {
            if (item.uid) {
                return item.uid == payload.uid;
            }
            if (item.id) {
                return item.id == payload.id;
            }
            return false;
        });
        if (targetIndex !== -1) {
            itineraryListTemp[targetIndex] = payload;
        }
        return itineraryListTemp;
    }
    static updateConnection(payload: Connection, state: StoreState) {
        const { itByRankList, targetRankId, targetItineraryId } = state;
        const itByRankListTemp = cloneDeep(itByRankList);
        const targetItinerary =
            itByRankListTemp[targetRankId][targetItineraryId];
        const { uid } = payload;
        const conIndex = targetItinerary.cpdConnectionList.findIndex((item) => {
            return item.uid == uid || payload.id == item.id;
        });
        if (conIndex != -1) {
            targetItinerary.cpdConnectionList[conIndex] = payload;
            return targetItinerary;
        }
        return null;
    }
    static addConnection(payload: Connection, state: StoreState) {
        const targetItinerary = this.getTargetItinerary(state);
        targetItinerary.cpdConnectionList.push(payload);
        return targetItinerary;
    }
    static deleteConnection(
        payload: DeleteConnectionByPosActPayload,
        state: StoreState
    ) {
        const { id } = payload;
        const targetItinerary = this.getTargetItinerary(state);
        targetItinerary.cpdConnectionList =
            targetItinerary.cpdConnectionList.filter((item) => {
                if (item.uid) {
                    return item.uid != id;
                }
                if (item.id) {
                    return item.id != id;
                }
                return false;
            });
        return targetItinerary;
    }
    static deleteConnectionByPos(
        payload: DeleteConnectionByPosActPayload,
        state: StoreState
    ) {
        const { position } = payload;
        const targetItinerary = this.getTargetItinerary(state);
        targetItinerary.cpdConnectionList =
            targetItinerary.cpdConnectionList.filter((item) => {
                return item.position !== position;
            });
        return targetItinerary;
    }
    static addSegment(payload: Segment, state: StoreState) {
        const targetItinerary = this.getTargetItinerary(state);
        targetItinerary.cpdSegmentList.push(payload);
        return targetItinerary;
    }
    static updateSegment(payload: Segment, state: StoreState) {
        const targetItinerary = this.getTargetItinerary(state);
        const { uid } = payload;
        const targetId = targetItinerary.cpdSegmentList.findIndex((item) => {
            return item.uid == uid;
        });
        if (targetId != -1) {
            targetItinerary.cpdSegmentList[targetId] = payload;
            return targetItinerary;
        }
        return null;
    }
    static deleteSegmentById(payload: ParamsById, state: StoreState) {
        const { id } = payload;
        const targetItinerary = this.getTargetItinerary(state);
        targetItinerary.cpdSegmentList = targetItinerary.cpdSegmentList.filter(
            (item) => {
                if (item.uid) {
                    return item.uid != id;
                }
                if (item.id) {
                    return item.id != id;
                }
                return false;
            }
        );
        return targetItinerary;
    }
}
