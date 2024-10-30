import { UUID } from "src/common/utils";
import type {
    Connection,
    RuleItineraryItem,
    Segment,
} from "src/service/stores/ruleStore/model";

export const itineraryItem = (
    data: Partial<RuleItineraryItem> = {}
): RuleItineraryItem => {
    return {
        rankId: 1,
        flightCategory: 1, //默认值：1-无经停直飞
        uid: UUID(),
        operateCarriers: "ALL",
        carrier: "ALL",
        cpdSegmentList: [
            segmentItem({
                position: 1,
                key: UUID(),
                uid: UUID(),
                carrier: "ALL",
            }),
            segmentItem({
                position: 2,
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
        ...data,
    } as RuleItineraryItem;
};

export const connectionItem = (data: Partial<Connection> = {}) => {
    return { position: 1, uid: UUID(), key: UUID(), ...data } as Connection;
};

export const segmentItem = (data: Partial<Segment> = {}) => {
    return {
        position: "1",
        uid: UUID(),
        key: UUID(),
        carrier: "ALL",
        exclude: false,
        onlyNonStopFlight: 0,
        allowCodeShare: 0,
        flightNoEnd: 9999,
        flightNoStart: 1,
        ...data,
    } as Segment;
};
