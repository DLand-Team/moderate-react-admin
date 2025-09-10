import { ChartLineECharts } from "@/src/shadcn/components/chart-line-echarts";

export default function ChartTestPage() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-8">ECharts Line Chart Test</h1>
        <ChartLineECharts />
      </div>
    </div>
  );
}