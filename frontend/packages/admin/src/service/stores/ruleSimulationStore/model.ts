export interface StoreState {
  ruleSimulationArr: any; //列表数据[]回头改类型
  uuid: string;
  errorText: string;
  btnDisabled: boolean;
  tableLoading: boolean; //表格加载
  locationList: any; //[]回头改类型
}

export interface Rule {
  id: number;
  ruleName: string;
  ownerId: string;
  comment: string;
}
