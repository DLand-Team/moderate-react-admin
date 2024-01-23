export interface StoreState {
	dataList: PageType[];
	total: number;
	pageSize: number;
	pageNum: number;
	isShowAddModal: boolean;
	isUpdate: boolean;
	recordData: unknown;
	loading: boolean;
	isDetail: boolean;
	formVersion:string
}

export interface PageType {
  id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  content: string;
  likes: number;
  rating: number;
  avatar: string;
  parent_id: number | null;
  user_id: number;
  deal_id: number;
  user_name: string;
  deal_name: string;
}

export interface QueryActParams  {
   created_at?: string[];
   deal_id?: number;
   deleted_at?: string[];
   id?: number;
   order?: { [key: string]: any };
   page?: number;
   page_size?: number;
   parent_ids?: number[];
   updated_at?: string[];
   user_id?: number;
   with_deleted?: boolean;
}