import { FormInstance } from "antd";
import { UUID, cloneDeep } from "src/common/utils";
import { TopPartForm } from "src/pages/HomePage/CpdPage/RulePage/components/topPart";
import { connectionItem, itineraryItem, segmentItem } from "src/shapes";
import { Market } from "../stores/marketStore/model";
import { Pos } from "../stores/posStore/model";
import type {
    Connection,
    DeleteConnectionByPosActPayload,
    ParamsById,
    RuleItineraryItem,
    Segment,
    StoreState,
} from "../stores/ruleStore/model";
import HelperBase from "./_helperBase";

export class RuleHelper extends HelperBase {
    // 扁平化二维数组，通过pos进行分布的
    flatByPosList<T>({
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
    flatList<T>({ list }: { pos: number; payload: T[]; list: T[][] }): T[] {
        let newList: any[] = [];
        list.forEach((item: any) => {
            if (item) {
                newList = [...newList, ...item];
            }
        });
        return newList;
    }
    filterItsByRank = (state: StoreState) => {
        const { itineraryList } = state;
        let temp: RuleItineraryItem[][] = [];
        itineraryList.forEach((item) => {
            !(item.rankId - 1 in temp) && (temp[item.rankId - 1] = []);
            temp[item.rankId - 1].push(item);
        });
        return temp.filter((item) => item);
    };
    filterItemByPos(arr: Partial<Connection>[] | Partial<Segment>[] = []) {
        let temp: any[] = [];
        arr.forEach((item) => {
            if (!item.position) return;
            !(item.position! in temp) && (temp[item.position! as number] = []);
            if (!item.uid) item.uid = UUID();
            temp[item.position! as number].push(item);
        });
        return temp;
    }
    processSwitchItemData = (itemData: any) => {
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
    getTargetItinerary(state: StoreState) {
        const { itByRankList, targetRankId, targetItineraryId } = state;
        const itByRankListTemp = cloneDeep(itByRankList);
        if (
            !itByRankList.length ||
            targetRankId == undefined ||
            targetItineraryId == undefined
        ) {
            return null;
        }
        const targetItinerary =
            itByRankListTemp?.[targetRankId]?.[targetItineraryId] || {};
        return targetItinerary;
    }
    getItDefault(): Partial<RuleItineraryItem>[] {
        return [
            itineraryItem({
                rankId: 1,
                flightCategory: 2,
                cpdSegmentList: [
                    segmentItem({
                        position: "1",
                        key: UUID(),
                        uid: UUID(),
                        carrier: "ALL",
                    }),
                    segmentItem({
                        position: "2",
                        uid: UUID(),
                        key: UUID(),
                        carrier: "ALL",
                    }),
                ],
                cpdConnectionList: [
                    connectionItem({
                        position: 1,
                        uid: UUID(),
                        key: UUID(),
                        exclude: false,
                    }),
                ],
                allowCodeShare: 1,
            }),
            itineraryItem({
                rankId: 1,
                flightCategory: 1,
                allowCodeShare: 1,
            }),
            itineraryItem({ rankId: 2, flightCategory: 3 }),
            itineraryItem({
                rankId: 3,
                flightCategory: 3,
                cpdSegmentList: [
                    segmentItem({
                        position: "1",
                    }),
                    segmentItem({
                        position: "2",
                    }),
                    segmentItem({
                        position: "3",
                    }),
                ],
                cpdConnectionList: [
                    connectionItem({
                        position: 1,
                    }),
                    connectionItem({
                        position: 2,
                    }),
                ],
            }),
        ];
    }

    getItineraryDefault() {
        return {
            cpdConnectionList: [
                connectionItem({
                    position: 1,
                }),
            ],
            cpdSegmentList: [
                segmentItem({
                    position: 1,
                }),
                segmentItem({
                    position: 2,
                }),
            ],
        };
    }

    initItinerary(payload: RuleItineraryItem) {
        let temp = payload;
        if (temp.cpdConnectionList.length == 0) {
            temp = {
                ...temp,
                ...this.helperManager?.ruleHelper.getItineraryDefault(),
            };
        }
        return temp;
    }

    deleteItinerarysByRankId(
        { rankId }: { rankId: number },
        state: StoreState
    ) {
        const { itineraryList } = state;
        const itineraryListTemp = cloneDeep(itineraryList).filter((item) => {
            return item.rankId != rankId;
        });
        itineraryListTemp.forEach((item) => {
            if (item.rankId > rankId) {
                item.rankId = item.rankId - 1;
            }
        });
        return itineraryListTemp;
    }
    copyRank(params: number[], state: StoreState) {
        const { itineraryList } = state;
        const [startRankId, endRankId] = params;
        const itineraryListTemp = cloneDeep(itineraryList);
        let temp: any = [];
        itineraryListTemp.forEach((item) => {
            if (item.rankId == startRankId) {
                temp.push({ ...item, rankId: endRankId + 1 });
            }
        });
        itineraryListTemp.forEach((item) => {
            if (item.rankId > endRankId) {
                item.rankId = item.rankId + 1;
            }
        });

        return itineraryListTemp.concat(temp);
    }
    switchRank(params: number[], state: StoreState) {
        const { itineraryList } = state;
        const [startRankId, endRankId] = params;
        const itineraryListTemp = cloneDeep(itineraryList);
        debugger;
        // 判断是往上移动还是往下
        const isUp = startRankId > endRankId;
        itineraryListTemp.forEach((item) => {
            if (item.rankId == startRankId) {
                item.rankId = -1;
            }
        });
        itineraryListTemp.forEach((item) => {
            if (!isUp) {
                if (item.rankId > startRankId && item.rankId <= endRankId) {
                    item.rankId = item.rankId - 1;
                }
            } else {
                if (item.rankId >= endRankId && item.rankId < startRankId) {
                    item.rankId = item.rankId + 1;
                }
            }
        });
        itineraryListTemp.forEach((item) => {
            if (item.rankId == -1) {
                item.rankId = endRankId;
            }
        });
        return itineraryListTemp;
    }

    deleteItineraryById({ id }: { id: string }, state: StoreState) {
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
    addItinerary(payload: RuleItineraryItem, state: StoreState) {
        const { itineraryList } = state;
        const itineraryListTemp = cloneDeep(itineraryList);
        payload.uid = UUID();
        itineraryListTemp.push(payload);
        return itineraryListTemp;
    }
    updateItinerary(payload: RuleItineraryItem, state: StoreState) {
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
    updateConnection(payload: Connection, state: StoreState) {
        const { itByRankList, targetRankId, targetItineraryId } = state;
        const itByRankListTemp = cloneDeep(itByRankList);
        const targetItinerary =
            itByRankListTemp[targetRankId][targetItineraryId];
        const { uid } = payload;
        const conIndex = targetItinerary.cpdConnectionList.findIndex((item) => {
            if (payload.id && payload.id == item.id) {
                return true;
            }
            return item.uid == uid;
        });

        if (conIndex != -1) {
            targetItinerary.cpdConnectionList[conIndex] = payload;
            return targetItinerary;
        }
        return null;
    }
    addConnection(payload: Connection, state: StoreState) {
        const targetItinerary = this.getTargetItinerary(state);
        targetItinerary?.cpdConnectionList.push(payload);
        return targetItinerary!;
    }
    deleteConnection(
        payload: DeleteConnectionByPosActPayload,
        state: StoreState
    ) {
        const { id, uid } = payload;
        const targetItinerary = this.getTargetItinerary(state)!;
        targetItinerary.cpdConnectionList =
            targetItinerary?.cpdConnectionList.filter((item) => {
                if (item.uid && uid) {
                    return item.uid != uid;
                }
                if (item.id && id) {
                    return item.id != id;
                }
                return false;
            });
        return targetItinerary;
    }
    deleteConnectionByPos(
        payload: DeleteConnectionByPosActPayload,
        state: StoreState
    ) {
        const { position } = payload;
        const targetItinerary = this.getTargetItinerary(state)!;
        targetItinerary.cpdConnectionList =
            targetItinerary.cpdConnectionList.filter((item) => {
                return item.position !== position;
            });
        return targetItinerary;
    }
    deleteSegmentByPos(
        payload: DeleteConnectionByPosActPayload,
        state: StoreState
    ) {
        const { position } = payload;
        const targetItinerary = this.getTargetItinerary(state)!;
        targetItinerary.cpdSegmentList = targetItinerary.cpdSegmentList.filter(
            (item) => {
                return item.position != position;
            }
        );
        return targetItinerary;
    }
    addSegment(payload: Segment, state: StoreState) {
        const targetItinerary = this.getTargetItinerary(state)!;
        targetItinerary.cpdSegmentList.push(payload);
        return targetItinerary;
    }
    updateSegment(payload: Segment, state: StoreState) {
        const targetItinerary = this.getTargetItinerary(state)!;
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
    deleteSegmentById(payload: ParamsById, state: StoreState) {
        const { id, uid } = payload;
        const targetItinerary = this.getTargetItinerary(state)!;
        targetItinerary.cpdSegmentList = targetItinerary.cpdSegmentList.filter(
            (item) => {
                if (item.uid && uid) {
                    return item.uid != uid;
                }
                if (item.id && id) {
                    return item.id != id;
                }
                return false;
            }
        );
        return targetItinerary;
    }

    processSearchSelectData = (data: any) => {
        return data.map((item: any) => {
            const { familyName, carrier } = item;
            item.name = familyName ? familyName : carrier;
            item.value = item.name;
            return item;
        });
    };
    calcSeqNo = ({
        type,
        value,
        formRef,
        marketList,
        posList,
    }: {
        type: string;
        value: number;
        formRef: FormInstance<TopPartForm>;
        marketList: Market[];
        posList: Pos[];
    }) => {
        marketList = cloneDeep(marketList);
        posList = cloneDeep(posList);
        let oriMarketId =
            type == "oriMarket" ? value : formRef?.getFieldValue("oriMarketId");
        let desMarketId =
            type == "desMarket" ? value : formRef?.getFieldValue("desMarketId");
        let posId = type == "pos" ? value : formRef?.getFieldValue("posId");
        let oriMarket = marketList.find((item) => {
            return item.id === oriMarketId;
        });
        let desMarket = marketList.find((item) => {
            return item.id === desMarketId;
        });
        let pos = posList.find((item) => {
            return item.id == posId;
        });
        let posWeight =
            pos && pos.cpdPosItems && pos.cpdPosItems.length
                ? pos.cpdPosItems.sort((item1, item2) => {
                      if (item1.weight < item2.weight) {
                          return -1;
                      } else if (item1.weight > item2.weight) {
                          return 1;
                      } else {
                          return 0;
                      }
                  })[0].weight
                : 0;
        let marketWeight1 =
            oriMarket &&
            oriMarket.cpdMarketItems &&
            oriMarket.cpdMarketItems.length
                ? oriMarket.cpdMarketItems.sort((item1, item2) => {
                      if (item1.weight < item2.weight) {
                          return -1;
                      } else if (item1.weight > item2.weight) {
                          return 1;
                      } else {
                          return 0;
                      }
                  })[0].weight
                : 0;
        let marketWeight2 =
            desMarket &&
            desMarket.cpdMarketItems &&
            desMarket.cpdMarketItems.length
                ? desMarket.cpdMarketItems.sort((item1, item2) => {
                      if (item1.weight < item2.weight) {
                          return -1;
                      } else if (item1.weight > item2.weight) {
                          return 1;
                      } else {
                          return 0;
                      }
                  })[0].weight
                : 0;
        return posWeight + 2 * marketWeight1 + marketWeight2;
    };
}
