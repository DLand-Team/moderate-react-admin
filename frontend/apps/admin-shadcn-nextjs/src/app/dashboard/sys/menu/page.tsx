import { ROUTE_ID } from "@/src/router";
import KeepAliveSign, { KeepAliveSlot } from "@/src/router/keep-alive-sign";
import MenuView from "./view";

export default function MenuPage() {
  return (
    <div>
      <KeepAliveSign
        key={ROUTE_ID.menu}
        routeId={ROUTE_ID.menu}
        ClientView={MenuView}
      >
        {/* <DataTable data={JSON.parse(raw)} /> */}
        <KeepAliveSlot id={ROUTE_ID.menu} />
      </KeepAliveSign>
    </div>
  );
}
