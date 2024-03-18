export interface StoreState {
	loading: boolean;
	platformStatisticsData: PlatformStatisticsEntity[];
	opportunityStatisticsData: OpportunityStatisticsEntity[];
	generateColumnsDataByDate: any[];
}

export interface PlatformStatisticsEntity {
	created_at: Date;
	deleted_at: Date;
	enquiry_count: number;
	id: number;
	opportunity_count: number;
	partner_count: number;
	updated_at: Date;
	user_count: number;
	visits: number;
}

export interface OpportunityStatisticsEntity {
	click: number;
	created_at: Date;
	deleted_at: Date;
	enquiry: number;
	id: number;
	opportunity_id: number;
	updated_at: Date;
	view: number;
	wished: number;
}
