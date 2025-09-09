import { ReactNode } from "react";

export const globalVar = {
  service: new Map<
    "winBoxContent" | "keepAliveComp",
    Map<PropertyKey, ReactNode>
  >([
    ["winBoxContent", new Map()],
    ["keepAliveComp", new Map()],
  ]),
};
