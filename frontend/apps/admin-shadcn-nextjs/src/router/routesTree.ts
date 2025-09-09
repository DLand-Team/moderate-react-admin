import { ROUTE_ID } from "./name";
import { RoutesStructDataItem } from "./types";

// MODERATE_AUTO:START
export const ROUTE_STRUCT_CONFIG: RoutesStructDataItem[] = [
  {
    id: ROUTE_ID.dashboard,
    children: [{ id: ROUTE_ID.HelloPage }],
  },
  { id: ROUTE_ID.login },
];
// MODERATE_AUTO:END
