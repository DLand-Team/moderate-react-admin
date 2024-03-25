import { usePageConfig } from "src/common/hooks";
import { Modal, Space } from "antd";
import { useFlat } from "src/reduxService";

// change the name of the prime to primary
const TYPE_ENUM = ["prime", "parent", "sub"];

const useConfig = () => {
	const { setIsShowModal, deleteAct, posList, isShowModal } =
		useFlat("carrierStore");

	return usePageConfig<any>(() => {
		return [
			{
				title: "name",
				dataIndex: "name",
				key: "name",
				fieldConfig: {
					scope: ["modal"],
					formOptions: {
						label: "name",
						name: "name",
						rules: [
							{
								required: true,
							},
							{
								type: "string",
								min: 4,
								max: 60,
							},
						],
					},
				},
				render(value) {
					return (
						<a
							onClick={() => {
								setIsShowModal(true);
							}}
						>
							{value}
						</a>
					);
				},
			},
			{
				title: "description",
				dataIndex: "description",
				key: "description",
				fieldConfig: {
					isSearch: true,
					formOptions: {
						label: "description",
						name: "description",
						rules: [
							{
								required: true,
							},
							{
								type: "string",
								min: 4,
								max: 60,
							},
						],
					},
				},
			},
			{
				title: "type",
				dataIndex: "type",
				key: "type",
				fieldConfig: {
					isSearch: true,
					inputType: "Select",
					options: TYPE_ENUM,
					formOptions: {
						initialValue: TYPE_ENUM[0],
						label: "type",
						name: "type",
						rules: [
							{
								required: true,
							},
						],
					},
				},
			},
			{
				title: "action",
				key: "action",
				render: (_, record) => (
					<Space size="middle">
						<a
							onClick={() => {
								setIsShowModal(true);
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
	}, [posList, isShowModal]);
};

export default useConfig;
