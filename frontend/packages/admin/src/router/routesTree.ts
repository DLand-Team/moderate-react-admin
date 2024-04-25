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
          { id: ROUTE_ID.PdfPage },
          { id: ROUTE_ID.WinboxPage },
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
        id: ROUTE_ID.PluginsPage,
        children: [{ id: ROUTE_ID.PluginListPage }],
      },
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