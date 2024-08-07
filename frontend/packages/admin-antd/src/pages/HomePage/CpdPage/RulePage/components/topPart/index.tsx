import { PlusOutlined } from "@ant-design/icons";
import {
	Checkbox,
	Col,
	DatePicker,
	Divider,
	Form,
	FormInstance,
	Input,
	InputNumber,
	Row,
	Select,
} from "antd";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FieldType } from "src/common/utils";
import { ruleHelper, useFlat } from "src/service";
import {
	AddItemDrawerType,
	type Rule,
} from "src/service/stores/ruleStore/model";

const { Option } = Select;
export type TopPartForm = Omit<
	Rule & { effectDateData?: dayjs.Dayjs[] },
	"cpdRuleItinerarys"
>;

function CustomSelect({
	optionArr,
	inputAttrConfig = {},
	handleChange,
	drawerTableType,
	branchName = "",
	...rest
}: {
	optionArr: any[];
	inputAttrConfig?: any;
	handleChange?: any;
	drawerTableType: AddItemDrawerType;
	branchName: string;
}) {
	const { setIsAddItemDrawerFlag } = useFlat(["ruleStore", branchName]);
	const { t } = useTranslation(["rule"]);
	return (
		<Select
			onChange={handleChange}
			dropdownRender={(menu) => (
				<div>
					{menu}
					<Divider style={{ margin: "4px 0" }} />
					<div
						style={{ padding: "4px 8px", cursor: "pointer" }}
						onClick={() => {
							setIsAddItemDrawerFlag({
								flag: true,
								type: drawerTableType,
							});
						}}
					>
						<PlusOutlined />{" "}
						{`${t("add")} ${
							{
								[AddItemDrawerType.market]:
									t("rulePage_Market"),
								[AddItemDrawerType.pos]: t("rulePage_pos"),
							}[drawerTableType]
						}`}
					</div>
				</div>
			)}
			{...inputAttrConfig}
			{...rest}
		>
			{optionArr &&
				optionArr.length > 0 &&
				optionArr.map((item: any) => {
					return (
						<Option value={item.value} key={item.id}>
							{item.label}
						</Option>
					);
				})}
		</Select>
	);
}

const TopPart = ({
	formRef,
	branchName = "",
}: {
	formRef?: FormInstance<TopPartForm>;
	branchName: string;
}) => {
	const { allPosList, queryAllPostListAct } = useFlat("posStore", {
		allPosList: "IN",
	});
	const { allMarketList, queryAllMarketListAct } = useFlat("marketStore", {
		allMarketList: "IN",
	});
	const { currentData } = useFlat(["ruleStore", branchName]);
	useEffect(() => {
		queryAllMarketListAct();
		queryAllPostListAct();
	}, []);
	const { t } = useTranslation(["rule"]);
	const { t: commonT } = useTranslation(["common"]);

	useEffect(() => {
		formRef?.resetFields();
		formRef?.setFieldsValue({
			...currentData,
			effectDateData: [
				dayjs(currentData?.effectStartDate)!,
				dayjs(currentData?.effectEndDate!),
			],
		});
		if (formRef && currentData) {
			const seqValue = ruleHelper.calcSeqNo({
				type: "oriMarket",
				value: currentData.oriMarketId,
				formRef,
				marketList: allMarketList,
				posList: allPosList,
			});
			formRef.setFieldValue("sequenceNo", seqValue);
		}
	}, [currentData]);

	return (
		<div>
			<Form<TopPartForm>
				form={formRef}
				layout="vertical"
				name="basic"
				style={{ width: "100%" }}
				initialValues={currentData || {}}
				autoComplete="off"
				onFieldsChange={(values) => {
					const name = values?.[0]?.name?.[0];
					const value = values?.[0]?.value;
					if (!formRef) return;
					if (
						name === "oriMarketId" ||
						name === "desMarketId" ||
						name === "posId"
					) {
						const seqValue = ruleHelper.calcSeqNo({
							type: name,
							value,
							formRef,
							marketList: allMarketList,
							posList: allPosList,
						});
						formRef.setFieldValue("sequenceNo", seqValue);
					}
				}}
			>
				<Row
					style={{
						width: "100%",
					}}
					gutter={[10, 10]}
				>
					<Col span={6}>
						<Form.Item<FieldType>
							label={t`rulePage_ruleName`}
							name="ruleName"
							rules={[
								{
									required: true,
									message:
										commonT`placeholder_input` +
										t`rulePage_ruleName`,
								},
								{
									max: 30,
									message: t`rule_max_30`,
								},
								{
									pattern: /^[0-9a-zA-z_-]+$/,
									message: t`rule_name_warn`,
								},
							]}
						>
							<Input placeholder={commonT`placeholder_input`} />
						</Form.Item>
					</Col>
					<Col span={6}>
						<Form.Item<FieldType>
							label={t`rulePage_originMarket`}
							name="oriMarketId"
							rules={[
								{
									required: true,
									message:
										t("placeholder_input") +
										t("rulePage_originMarket") +
										"!",
								},
							]}
						>
							<CustomSelect
								branchName={branchName}
								inputAttrConfig={{
									placeholder: commonT`placeholder_input`,
								}}
								optionArr={allMarketList
									.filter((item) => {
										return item.marketType === 0;
									})
									.map((item) => {
										return {
											id: item.id,
											value: item.id,
											label: item.marketName,
										};
									})}
								drawerTableType={AddItemDrawerType.market}
							/>
						</Form.Item>
					</Col>
					<Col span={6}>
						<Form.Item<FieldType>
							label={t`rulePage_destinationMarket`}
							name="desMarketId"
							rules={[
								{
									required: true,
									message:
										t("placeholder_input") +
										t("rulePage_destinationMarket") +
										"!",
								},
							]}
						>
							<CustomSelect
								inputAttrConfig={{
									placeholder: commonT`placeholder_input`,
								}}
								branchName={branchName}
								optionArr={allMarketList
									.filter((item) => {
										return item.marketType === 0;
									})
									.map((item) => {
										return {
											id: item.id,
											value: item.id,
											label: item.marketName,
										};
									})}
								drawerTableType={AddItemDrawerType.market}
							/>
						</Form.Item>
					</Col>
					<Col span={6}>
						<Form.Item<FieldType>
							label={t`rulePage_pos`}
							name="posId"
							rules={[
								{
									required: true,
									message:
										t("placeholder_input") +
										t("rulePage_pos") +
										"!",
								},
							]}
						>
							<CustomSelect
								inputAttrConfig={{
									placeholder: commonT`placeholder_input`,
								}}
								branchName={branchName}
								optionArr={allPosList.map((item) => {
									return {
										id: item.id,
										value: item.id,
										label: item.posName,
									};
								})}
								drawerTableType={AddItemDrawerType.pos}
							/>
						</Form.Item>
					</Col>
				</Row>
				<Row
					style={{
						width: "100%",
					}}
					gutter={10}
				>
					<Col span={6}>
						<Form.Item<FieldType>
							label={t`rulePage_applyProduct`}
							name="applyProduct"
							rules={[
								{
									required: true,
									message:
										t("placeholder_input") +
										t("rulePage_applyProduct") +
										"!",
								},
							]}
						>
							<Select placeholder={t("placeholder_input")}>
								{[
									[1, "ISHOP"],
									[2, "DSHOP"],
								].map((item) => {
									return (
										<Option value={item[0]} key={item[0]}>
											{item[1]}
										</Option>
									);
								})}
							</Select>
						</Form.Item>
					</Col>
					<Col span={6}>
						<Form.Item<FieldType>
							label={t`rulePage_effectDateRange`}
							name="effectDateData"
							rules={[
								{
									required: true,
									message: t`placeholder_input`,
								},
							]}
						>
							<DatePicker.RangePicker></DatePicker.RangePicker>
						</Form.Item>
					</Col>
					<Col span={6}>
						<Form.Item<FieldType>
							label={t`rulePage_sequenceNo`}
							name="sequenceNo"
							rules={[
								{
									pattern: /^[0-9]+$/,
									message: t("rule_number") + "!",
								},
							]}
						>
							<InputNumber
								disabled={true}
								placeholder={commonT`placeholder_input`}
							/>
						</Form.Item>
					</Col>
					<Col span={6}>
						<Form.Item<FieldType>
							label={t`rulePage_active`}
							name="status"
							valuePropName="checked"
						>
							<Checkbox />
						</Form.Item>
					</Col>
				</Row>
				<Row
					style={{
						width: "100%",
					}}
				>
					<Col span={6}>
						<Form.Item<FieldType>
							label={t`rulePage_backupResult`}
							name="backupResult"
							valuePropName="checked"
						>
							<Checkbox />
						</Form.Item>
					</Col>
					<Col span={6}>
						<Form.Item<FieldType>
							label={t`rulePage.comment`}
							name="comment"
						>
							<Input.TextArea
								placeholder={commonT`placeholder_input`}
							/>
						</Form.Item>
					</Col>
				</Row>
			</Form>
		</div>
	);
};

export default TopPart;
