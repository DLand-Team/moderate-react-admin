import { UUID } from "src/common/utils";
import {
    Connection,
    RuleItineraryItem,
    Segment,
} from "src/service/stores/ruleStore/model";

export const itineraryItem = (
    data: Partial<RuleItineraryItem> = {}
): RuleItineraryItem => {
    let a = {
        rankId: 1,
        flightCategory: 1, //默认值：1-无经停直飞
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
        ...data,
    };
    return a as RuleItineraryItem;
};

export const connectionItem = () => {
    return { position: 1, uid: UUID(), key: UUID() } as Connection;
};

export const segmentItem = () => {
    return {
        position: 1,
        uid: UUID(),
        key: UUID(),
        carrier: "ALL",
        exclude: false,
    } as Segment;
};
