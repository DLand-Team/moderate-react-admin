import { usePageConfig } from "@/common/hooks";
import { Descriptions, Modal, Space } from "antd";
import { useStore } from "./services/pageStore";
import { PageType, NotificationType } from "./services/pageStore/model";
import { useStore as useUserStore } from "../memberPage/services/pageStore";
import { useEffect } from "react";
import { fieldCreater } from "@/common/utils";

const useConfig = () => {
	const [store] = useStore();
	const [userStore] = useUserStore();
	const {
		setAddModalShowAct,
		deleteAct,
		queryAct,
		setIsDetailAct,
		dataList,
		formVersion,
	} = store;

	useEffect(() => {
		userStore.queryAct();
	}, []);

	return usePageConfig<PageType>(() => {
		return [
			{
				...fieldCreater("title"),
				render(_, record) {
					return (
						// FIXME: rewrite in modal form style
						<a
							onClick={() => {
								Modal.confirm({
									icon: null,
									content: (
										<Descriptions
											title="deal detail"
											column={1}
										>
											<Descriptions.Item label={"title"}>
												{record.title}
											</Descriptions.Item>
											<Descriptions.Item
												label={"content"}
											>
												{record.content}
											</Descriptions.Item>
										</Descriptions>
									),
								});
							}}
						>
							{record.title}
						</a>
					);
				},
			},
			{
				...fieldCreater("is_read"),
				render: (_, record) => {
					return String(Boolean(record.is_read));
				},
				fieldConfig: {
					inputType: "Switch",

					formOptions: {
						valuePropName: "checked",
						label: "is_read",
						name: "is_read",
						initialValue: false,
						required: true,
					},
				},
			},
			fieldCreater("user_id", {
				fieldConfig: {
					inputType: "Select",
					options: userStore.dataList.map((item) => {
						return {
							key: item.id,
							value: item.id,
							label: `${item.id} - ${item.email}`,
						};
					}),
					formOptions: {
						label: "user_id",
						name: "user_id",
					},
				},
			}),
			{
				...fieldCreater("content", {
					fieldConfig: {
						isSearch: false,
					},
				}),
				render: (_, record) => (
					<div
						style={{
							maxWidth: 250,
							overflow: "hidden",
							textOverflow: "ellipsis",
							whiteSpace: "nowrap",
						}}
					>
						{record.content}
					</div>
				),
			},

			fieldCreater("notification_type", {
				fieldConfig: {
					inputType: "Select",
					options: [
						NotificationType.ConnectionAccepted,
						NotificationType.ConnectionRequest,
						NotificationType.PartnerOpportunityEnquiry,
						NotificationType.PartnerOpportunityLike,
						NotificationType.PartnerOpportunityReview,
						NotificationType.PlatformAdvertisement,
						NotificationType.PlatformAnnouncement,
						NotificationType.PlatformDealAboutToExpire,
						NotificationType.PlatformDealComment,
						NotificationType.PlatformDealCommentLiked,
						NotificationType.PlatformDealEnquiry,
						NotificationType.PlatformDealExpired,
						NotificationType.PlatformDealLike,
						NotificationType.PlatformDealPublished,
						NotificationType.PlatformNewDeal,
						NotificationType.PlatformNewOpportunity,
						NotificationType.PlatformNews,
					],
				},
			}),
			fieldCreater("notification_type_source_id"),
			{
				title: "action",
				key: "action",
				render: (_, record) => (
					<Space size="middle">
						<a
							onClick={() => {
								setAddModalShowAct(true, record);
							}}
						>
							edit
						</a>
						<a
							onClick={() => {
								Modal.confirm({
									content: "are you sure?",
									onOk: async () => {
										await deleteAct({
											id: record.id,
										});
										queryAct();
									},
								});
							}}
						>
							delete
						</a>
					</Space>
				),
			},
		];
	}, [dataList, formVersion, userStore]);
};

export default useConfig;
