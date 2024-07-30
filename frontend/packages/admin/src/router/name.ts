import { PLUGIN_ROUTE_NAME } from "plugins/config/router/name";
import { enumToObject } from "src/common/utils";

export enum NAME {
    Home,
    Login,
    Hello,
    Sys,
    Cms,
    Template,
    Role,
    Dev,
    PageDev,
    StoreDev,
    NotFund,
    Menu,
    Error,
    Loading,
    Plugins,
    PluginList,
    // Cpd
    Cpd,
    // market
    Market,
    MarketDetail,
    MarketList,
    MarketAdd,
    MarketEdit,
    // pos
    Pos,
    PosList,
    PosDetail,
    PosEdit,
    PosAdd,
    // rule
    Rule,
    RuleDetail,
    RuleList,
    RuleEdit,
    RuleAdd,
    // sort
    Sort,
    SortList,
}

export const ROUTE_NAME = { ...NAME, ...PLUGIN_ROUTE_NAME };
export const ROUTE_ID = enumToObject(ROUTE_NAME);
