import { RouteItem } from "@/config/types";

export interface RouterStoreState {
  routesData: RouteItem[];
  defaultPermissions:string[]
  routesConfigMap: { [key: string]: RouteItem }; // 配置数据字典，直接通过id获取配置数据
  defaultRoutesData: RouteItem[];
  defaultRouteKeys:string[]
}
