import { RouteItem } from "@/router/types";
import { makeAutoObservable, toJS } from "mobx";
import type { Location } from "react-router-dom";

class Global {
  isLoginChecking: boolean;
  routesData: RouteItem[];
  token: string;
  tabsHistory: { [key: string]: Location };
  permissions: string[];

  constructor() {
    makeAutoObservable(this);
    this.init()
  }
  init() {
    this.isLoginChecking = true
    this.routesData = [];
    this.token = "";
    this.tabsHistory = {};
    this.permissions = [];
  }
  setRoutesData = (data:RouteItem[]) => {
    this.routesData = data;
  };

  setToken = (token: string) => {
    this.token = token;
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

  setIsLoginChecking = (isLoginChecking: boolean) => {
    this.isLoginChecking = isLoginChecking;
  }

  setPermissions = (permissions) => {
    this.permissions = permissions;
  };
}

export default new Global();
