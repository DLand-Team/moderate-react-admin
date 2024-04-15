import { ROUTE_ID } from "src/router/name";
import { RoutesStructDataItem } from "src/router/types";

// MODERATE_AUTO:START
export const ROUTE_STRUCT_CONFIG: RoutesStructDataItem[] = [
  {
    id: ROUTE_ID.HomePage,
    children: [
      {
        id: ROUTE_ID.CmsPage,
        children: [],
      },
    ],
  },
];

// MODERATE_AUTO:END