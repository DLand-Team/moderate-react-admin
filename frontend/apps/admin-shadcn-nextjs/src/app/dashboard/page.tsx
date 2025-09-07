import { ChartAreaInteractive } from "@/src/shadcn/components/chart-area-interactive";
import { DataTable } from "@/src/shadcn/components/data-table";
import { SectionCards } from "@/src/shadcn/components/sectionCards";
import { Input } from "@/src/shadcn/components/ui/input";
import data from "./data.json";

export default function Page() {
	// app 路径

	return (
		<div className="flex flex-1 flex-col">
			{/* 路由跳转到test */}
			<Input />

			{/* 内容部分 */}
			<div className="@container/main flex flex-1 flex-col gap-2">
				<div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
					<SectionCards />
					<div className="px-4 lg:px-6">
						<ChartAreaInteractive />
					</div>
					<DataTable data={data} />
				</div>
			</div>
		</div>
	);
}
