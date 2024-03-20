export interface QueryApiParams {
	pageNo: number|string;
	pageSize: number|string;
	posName?: string;
}

export interface QueryApiRespone {
	code: number;
	/*数据 */
	list: {
		/*ID */
		id: number;
		/*用户编号 */
		userId: number;
		/*用户类型，参见 UserTypeEnum 枚举 */
		userType: Record<string, unknown>;
		/*模版编号 */
		templateId: number;
		/*模板编码 */
		templateCode: string;
		/*模版发送人名称 */
		templateNickname: string;
		/*模版内容 */
		templateContent: string;
		/*模版类型 */
		templateType: number;
		/*模版参数 */
		templateParams: Record<string, unknown>;
		/*是否已读 */
		readStatus: boolean;
		/*阅读时间 */
		readTime: Record<string, unknown>;
		/*创建时间 */
		createTime: Record<string, unknown>;
	}[];
	/*总量 */
	total: number;
}
