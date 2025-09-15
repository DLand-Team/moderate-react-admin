import { DataTable } from "@/src/shadcn/components/data-table";
import fs from "fs";
import path from "path";
import HelloView from "./view";

export default function Page() {
  // 只能服务端执行：读取本地 JSON 文件
  const dataPath = path.join(process.cwd(), "src/app/dashboard/data.json");
  const raw = fs.readFileSync(dataPath, "utf-8");
  return (
    <div>
      <HelloView />
      <DataTable data={JSON.parse(raw)} />
    </div>
  );
}
