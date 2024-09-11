import { MarketItem } from "src/service/stores/marketStore/model";

export const MarketItemCreater = (
    prams: Partial<MarketItem> = {}
): MarketItem => {
    return {
        exclude: false,
        weight: 0,
        locationType: "P",
        ...prams,
    } as MarketItem;
};
