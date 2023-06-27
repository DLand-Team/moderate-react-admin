import { RouteItem } from "@/router/types";
import { makeAutoObservable, toJS } from "mobx";
import type { Location } from "react-router-dom";

class Global {
  routesData: RouteItem[];
  token: string;
  tabsHistory: { [key: string]: Location };
  permissions: string[];
  isAdmin: boolean; // 是否是管理员

  constructor() {
    makeAutoObservable(this);
    this.init()
  }
  init() {
    this.routesData = [];
    this.token = sessionStorage.getItem("ACCESS_TOKEN")||"";
    this.tabsHistory = {};
    this.permissions = [];
    this.isAdmin = sessionStorage.getItem("IS_ADMIN") === "1";
  }

  setToken = (token: string) => {
    this.token = token;
  };
  setIsAdmin = (isAdmin: boolean) => {
    this.isAdmin = isAdmin;
  }

  setRoutesData = (data:RouteItem[]) => {
    this.routesData = data;
  };

  addTabHistory = (newItem: Location) => {
    let temp = toJS(this.tabsHistory);
    temp[newItem.pathname] = newItem;
    this.tabsHistory = temp;
  };

  deleteTabHistory = (pathName: string) => {
    let temp = toJS(this.tabsHistory);
    if (Object.values(temp).length > 1) {
      Reflect.deleteProperty(temp, pathName);
      this.tabsHistory = temp;
    }
  };

 

  setPermissions = (permissions) => {
    this.permissions = permissions;
  };
}

export default new Global();
