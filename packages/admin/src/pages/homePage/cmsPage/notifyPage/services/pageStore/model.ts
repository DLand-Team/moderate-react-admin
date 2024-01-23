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
	notification_type: string;
	notification_type_source_id: number;
	title: string;
	content: string;
	is_read: boolean;
	user_id: number;
}

export interface QueryActParams {
   created_at?: string[];
   deleted_at?: string[];
   is_read?: boolean;
   notification_id?: number;
   Notification_type?: NotificationType;
   Notification_type_source_id?: number;
   page?: number;
   page_size?: number;
   title?: string;
   updated_at?: string[];
   user_id?: number;
   with_deleted?: boolean;
   [property: string]: any;
}

export enum NotificationType {
   ConnectionAccepted = "connection_accepted",
   ConnectionRequest = "connection_request",
   PartnerOpportunityEnquiry = "partner_opportunity_enquiry",
   PartnerOpportunityLike = "partner_opportunity_like",
   PartnerOpportunityReview = "partner_opportunity_review",
   PlatformAdvertisement = "platform_advertisement",
   PlatformAnnouncement = "platform_announcement",
   PlatformDealAboutToExpire = "platform_deal_about_to_expire",
   PlatformDealComment = "platform_deal_comment",
   PlatformDealCommentLiked = "platform_deal_comment_liked",
   PlatformDealEnquiry = "platform_deal_enquiry",
   PlatformDealExpired = "platform_deal_expired",
   PlatformDealLike = "platform_deal_like",
   PlatformDealPublished = "platform_deal_published",
   PlatformNewDeal = "platform_new_deal",
   PlatformNewOpportunity = "platform_new_opportunity",
   PlatformNews = "platform_news",
}
