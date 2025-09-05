import { ROUTE_ID } from "@/src/router";
import KeepAliveSign, { Slot } from "../keepAliveSign";
import TestView from "./view";

export default function Page() {
	return (
		<KeepAliveSign routeId={ROUTE_ID.test} render={TestView}>
			<Slot id={ROUTE_ID.test} />
		</KeepAliveSign>
	);
}
