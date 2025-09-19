import { ROUTE_ID } from "@/src/router";
import { DataTable } from "@/src/shadcn/components/data-table";
import fs from "fs";
import path from "path";
import KeepAliveSign, { KeepAliveSlot } from "@/src/router/keep-alive-sign";
import MenuView from "./view";

export default function MenuPage() {
  // 只能服务端执行：读取本地 JSON 文件
  const dataPath = path.join(process.cwd(), "src/app/dashboard/data.json");
  const raw = fs.readFileSync(dataPath, "utf-8");
  return (
    <div>
      <KeepAliveSign
        key={ROUTE_ID.role}
        routeId={ROUTE_ID.role}
        ClientView={MenuView}
      >
        <KeepAliveSlot id={ROUTE_ID.role} />
        {/* <DataTable data={JSON.parse(raw)} /> */}
      </KeepAliveSign>
    </div>
  );
}
