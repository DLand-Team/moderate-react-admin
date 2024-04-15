import { ROUTE_ID } from "./name";
import { RoutesStructDataItem } from "./types";

// MODERATE_AUTO:START
export const ROUTE_STRUCT_CONFIG: RoutesStructDataItem[] = [
  {
    id: ROUTE_ID.HomePage,
    children: [
      {
        id: ROUTE_ID.CmsPage,
        children: [
          { id: ROUTE_ID.DealPage },
          { id: ROUTE_ID.TestPage },
        ],
      },
      {
        id: ROUTE_ID.CpdPage,
        children: [
          {
            id: ROUTE_ID.CarrierPage,
            children: [{ id: ROUTE_ID.CarrierListPage }],
          },
          {
            id: ROUTE_ID.FilterPage,
            children: [{ id: ROUTE_ID.FilterListPage }],
          },
          {
            id: ROUTE_ID.MarketPage,
            children: [
              { id: ROUTE_ID.MarketEditPage },
              { id: ROUTE_ID.MarketListPage },
            ],
          },
          {
            id: ROUTE_ID.PosPage,
            children: [
              { id: ROUTE_ID.PosEditPage },
              { id: ROUTE_ID.PosListPage },
            ],
          },
          {
            id: ROUTE_ID.SortPage,
            children: [{ id: ROUTE_ID.SortListPage }],
          },
        ],
      },
      {
        id: ROUTE_ID.DevPage,
        children: [
          { id: ROUTE_ID.ApiDevPage },
          { id: ROUTE_ID.PageDevPage },
          { id: ROUTE_ID.StoreDevPage },
        ],
      },
      { id: ROUTE_ID.HelloPage },
      { id: ROUTE_ID.NotFundPage },
      { id: ROUTE_ID.PermissionPage },
      {
        id: ROUTE_ID.SysPage,
        children: [
          { id: ROUTE_ID.MenuPage },
          { id: ROUTE_ID.RolePage },
          { id: ROUTE_ID.UserPage },
        ],
      },
    ],
  },
  { id: ROUTE_ID.LoginPage },
];
// MODERATE_AUTO:END