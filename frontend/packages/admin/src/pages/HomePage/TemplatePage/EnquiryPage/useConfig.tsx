import { FormInstance, Modal, Space } from "antd";
import { useMemo } from "react";
import { MyColumnType } from "src/common/utils";
import { useFlat } from "src/service";
import { Category } from "src/service/stores/categoryStore/model";
const TYPE_ENUM = ["prime", "parent", "sub"];

const useConfig = (_?: FormInstance) => {
	const {
		pageData,
		currentData,
		setIsDetailAct,
		setCurrentData,
		setIsShowModal,
		deleteAct,
		queryListAct,
	} = useFlat("categoryStore");
	const { dataList } = pageData;
	//@ts-ignore
	return useMemo<MyColumnType<Category>[]>(() => {
		return [
			{
				title: "name",
				dataIndex: "name",
				key: "name",
				fieldConfig: {
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
				render(value, record) {
					return (
						<a
							onClick={() => {
								setCurrentData(record);
								setIsDetailAct(true);
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
				title: "prime_id",
				dataIndex: "prime_id",
				key: "prime_id",
				fieldConfig: {
					isSearch: true,
					inputType: "Select",
					options: () => {
						// 没有parent_id，筛选出来
						return dataList
							.filter((item) => {
								return !item.parent_id;
							})
							.map((item) => {
								return {
									key: item.id,
									value: item.id,
									label: item.name,
								};
							});
					},
					formOptions: {
						rules: [
							{
								type: "number",
							},
						],
						label: "prime_id",
						name: "prime_id",
					},
					inputOptions: {
						allowClear: true,
					},
				},
			},
			{
				title: "parent_id",
				dataIndex: "parent_id",
				key: "parent_id",
				fieldConfig: {
					isSearch: true,
					inputType: "Select",
					options: (props) => {
						let primeIdValue =
							props?.formIns?.getFieldsValue()?.prime_id;
						return primeIdValue
							? dataList
									.filter((item) => {
										return item.prime_id === primeIdValue;
									})
									.map((item) => {
										return {
											key: item.id,
											value: item.id,
											label: item.name,
										};
									})
							: [];
					},
					formOptions: {
						label: "parent_id",
						name: "parent_id",
					},
					inputOptions: {
						allowClear: true,
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
								setCurrentData(record);
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
										queryListAct();
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
	}, [currentData]);
};

export default useConfig;
