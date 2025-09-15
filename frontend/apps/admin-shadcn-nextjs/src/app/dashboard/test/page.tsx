import { ROUTE_ID } from "@/src/router";
import KeepAliveSign from "../../../router/keep-alive-sign";
import TestView from "./view";

export default function Page() {
  return (
    <>
      <KeepAliveSign routeId={ROUTE_ID.test}>
        <TestView />
      </KeepAliveSign>
    </>
  );
}
