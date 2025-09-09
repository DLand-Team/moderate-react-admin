import { ReactNode, type JSX } from "react";
import HelperBase from "./_helperBase";
import { emit } from "../setup";
import { ROUTE_ID_KEY } from "@/src/router";

export class AppHelper extends HelperBase {
  createApp(
    providerList: (
      | ((props: { children?: ReactNode }) => JSX.Element)
      | (({ ...props }: { [x: string]: any }) => JSX.Element)
    )[],
  ) {
    return this.providerLoop(providerList);
  }

  providerLoop(
    providerList: (
      | ((props: { children?: ReactNode }) => JSX.Element)
      | (({ ...props }: { [x: string]: any }) => JSX.Element)
    )[],
    i = 0,
  ) {
    if (i === providerList.length) {
      return;
    }
    const Pv = providerList[i];
    return <Pv key={i}>{this.providerLoop(providerList, i + 1)}</Pv>;
  }
}
