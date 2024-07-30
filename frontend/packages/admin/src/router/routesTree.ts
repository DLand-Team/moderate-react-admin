import { ROUTE_ID } from "./name";
import { RoutesStructDataItem } from "./types";

// MODERATE_AUTO:START
export const ROUTE_STRUCT_CONFIG: RoutesStructDataItem[] = [
  { id: ROUTE_ID.Error },
  {
    id: ROUTE_ID.Home,
    children: [
      {
        id: ROUTE_ID.Cpd,
        children: [
          {
            id: ROUTE_ID.Market,
            children: [
              { id: ROUTE_ID.MarketAdd },
              { id: ROUTE_ID.MarketDetail },
              { id: ROUTE_ID.MarketEdit },
              { id: ROUTE_ID.MarketList },
            ],
          },
          {
            id: ROUTE_ID.Pos,
            children: [
              { id: ROUTE_ID.PosAdd },
              { id: ROUTE_ID.PosDetail },
              { id: ROUTE_ID.PosEdit },
              { id: ROUTE_ID.PosList },
            ],
          },
          {
            id: ROUTE_ID.Rule,
            children: [
              { id: ROUTE_ID.RuleAdd },
              { id: ROUTE_ID.RuleDetail },
              { id: ROUTE_ID.RuleEdit },
              { id: ROUTE_ID.RuleList },
            ],
          },
          {
            id: ROUTE_ID.Sort,
            children: [{ id: ROUTE_ID.SortList }],
          },
        ],
      },
      {
        id: ROUTE_ID.Dev,
        children: [
          { id: ROUTE_ID.PageDev },
          { id: ROUTE_ID.StoreDev },
        ],
      },
      { id: ROUTE_ID.Hello },
      { id: ROUTE_ID.Loading },
      { id: ROUTE_ID.NotFund },
      {
        id: ROUTE_ID.Plugins,
        children: [{ id: ROUTE_ID.PluginList }],
      },
      {
        id: ROUTE_ID.Sys,
        children: [{ id: ROUTE_ID.Menu }, { id: ROUTE_ID.Role }],
      },
      {
        id: ROUTE_ID.Cms,
        children: [
          { id: ROUTE_ID.Pdf },
          { id: ROUTE_ID.Rive },
          { id: ROUTE_ID.Winbox },
        ],
      },
    ],
  },
  { id: ROUTE_ID.Login },
];
// MODERATE_AUTO:END