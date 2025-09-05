import { ROUTE_ID } from "@/src/router";
import { DataTable } from "@/src/shadcn/components/data-table";
import fs from "fs";
import path from "path";
import KeepAliveSign, { Slot } from "../keepAliveSign";
import HelloView from "./view";

export default function Page() {
	// 只能服务端执行：读取本地 JSON 文件
	const dataPath = path.join(process.cwd(), "src/app/dashboard/data.json");
	const raw = fs.readFileSync(dataPath, "utf-8");
	return (
		<div>
			<KeepAliveSign
				key={ROUTE_ID.hello}
				routeId={ROUTE_ID.hello}
				render={HelloView}
			>
				<Slot id={ROUTE_ID.hello} />
				<DataTable data={JSON.parse(raw)} />
			</KeepAliveSign>
		</div>
	);
}
