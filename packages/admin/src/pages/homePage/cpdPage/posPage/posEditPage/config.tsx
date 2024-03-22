import Common_searchSelect from "./components/common_searchSelect";
import { Select, Switch } from "antd";
import "./index.scss";
let Option = Select.Option;
const intlData = {};
export default function () {
	let calcWeight = (getFieldValue) => {
		return this.calcWeight({
			posType: getFieldValue("posType"),
			agentOrAirline: getFieldValue("agentOrAirline"),
			officeOwner: getFieldValue("officeOwner"),
			exclude: getFieldValue("exclude"),
		});
	};
	this.state = {
		btnInTableConfig: [],
		formItemArr: [],
		columns: [],
		isOk: false,
	};
	//刷新驱动显示上方输入条目的配置数据
	this.refreshFormConfig = () => {
		const {
			posEditPageStore: { carrierList, posName, comment, locationList },
			form: { getFieldValue },
		} = this.props;

		let carrierListTemp = carrierList.map((item) => {
			item.name = item.carrier;
			return item;
		});

		this.setState({
			//上方表单的配置项目
			formItemArr: [
				{
					dataIndex: "posName",
					formConfig: {
						initialValue: posName,
						label: intlData["posPage.posName"] + ":",
						rules: [
							{
								required: true,
								message: `${intlData["posPage.placeholder_input"]} ${intlData["posPage.POSName"]}`,
							},
							{
								max: 30,
								message: intlData["posPage.rule_posName_1"],
							},
							{
								pattern: /^[0-9a-zA-z_-]+$/,
								message:
									intlData["posPage.placeholder_posName"],
							},
						],
						inputAttrConfig: {
							placeholder:
								intlData["posPage.placeholder_posName"],
							maxLength: 30,
							size: "large",
						},
					},
				},
				{
					dataIndex: "comment",
					formConfig: {
						initialValue: comment,
						label: intlData["posPage.comment"] + "：",
						rules: [],
						type: "TextArea",
						inputAttrConfig: {
							placeholder:
								intlData["posPage.placeholder_comment"],
							autoSize: { minRows: 4 },
							maxLength: 60,
						},
					},
				},
			],
			columns: [
				{
					title: intlData["posPage.posType"],
					dataIndex: "posType",
					key: "posType",
					editable: true,
					width: "130px",
					formConfig: {
						rules: [
							{
								required: true,
								message: `${intlData["posPage.placeholder_input"]} ${intlData["posPage.posType"]}`,
							},
						],
						inputAttrConfig: {
							placeholder: `${intlData["posPage.placeholder_select"]} ${intlData["posPage.posType"]}`,
							maxLength: 60,
							style: {
								width: "140px",
							},
						},
						options: [
							["I", intlData["posPage.IATANUM"]],
							["T", intlData["posPage.PCC"]],
							["C", intlData["posPage.CITY"]],
							["N", intlData["posPage.COUNTRY"]],
							["W", intlData["posPage.WORLD"]],
						],
						type: "Select",
						render: ({
							inputAttrConfig,
							options,
							setFieldsValue,
						}) => {
							return (
								<Select
									onChange={(value) => {
										setFieldsValue({
											posInfo: undefined,
										});
									}}
									{...inputAttrConfig}
								>
									{options &&
										options.length > 0 &&
										options.map((item) => {
											return (
												<Option
													value={item[0]}
													key={item}
												>
													{item[1]}
												</Option>
											);
										})}
								</Select>
							);
						},
					},
					render: (value) => {
						return {
							I: intlData["posPage.IATANUM"],
							T: intlData["posPage.PCC"],
							C: intlData["posPage.CITY"],
							N: intlData["posPage.COUNTRY"],
							W: intlData["posPage.WORLD"],
						}[value];
					},
				},

				{
					title: intlData["posPage.officeO"],
					dataIndex: "officeOwner",
					key: "officeOwner",
					editable: true,
					width: "130px",
					formConfig: {
						isCustomForm: true,
						rules: [],
						inputAttrConfig: {
							maxLength: 9,
						},
						render: ({
							getFieldDecorator,
							setFieldsValue,
							record,
						}) => {
							return (
								<Common_searchSelect
									dataIndex={"officeOwner"}
									initValue={
										record["officeOwner"] || undefined
									}
									getFieldDecorator={getFieldDecorator}
									dataSource={carrierListTemp}
									placeholder={
										intlData[
											"posPage.placeholder_officeower"
										]
									}
									other={{
										allowClear: true,
										onChange: () => {
											setFieldsValue({
												posInfo: undefined,
											});
										},
									}}
								></Common_searchSelect>
							);
						},
					},
					render: (value) => {
						return value;
					},
				},
				{
					title: intlData["posPage.aoa"],
					dataIndex: "agentOrAirline",
					key: "agentOrAirline",
					editable: true,
					width: "170px",
					formConfig: {
						options: [
							["A", intlData["posPage.Airline"]],
							["T", intlData["posPage.Agent"]],
						],
						inputAttrConfig: {
							placeholder: intlData["posPage.placeholder_aoa"],
							style: {
								width: "150px",
							},
							allowClear: true,
						},
						type: "Select",
						render: ({
							inputAttrConfig,
							options,
							setFieldsValue,
						}) => {
							return (
								<Select
									onChange={(value) => {
										setTimeout(() => {
											setFieldsValue({
												posInfo: undefined,
											});
										}, 100);
									}}
									{...inputAttrConfig}
								>
									{options &&
										options.length > 0 &&
										options.map((item) => {
											return (
												<Option
													value={item[0]}
													key={item}
												>
													{item[1]}
												</Option>
											);
										})}
								</Select>
							);
						},
					},
					render: (value) => {
						return {
							A: intlData["posPage.Airline"],
							T: intlData["posPage.Agent"],
						}[value];
					},
				},
				{
					title: intlData["posPage.posInfo"],
					dataIndex: "posInfo",
					key: "posInfo",
					editable: true,
					width: "120px",
					formConfig: {
						inputAttrConfig: {
							// placeholder: "根据POS TYPE填写POS信息",
						},
						rules: [
							{
								required: true,
								message: (
									<div>
										{`${intlData["posPage.placeholder_input"]}  ${intlData["posPage.posInfo"]} `}
									</div>
								),
							},
							{
								pattern: "^[A-Za-z0-9]+$",
								message: (
									<div>{`${intlData["posPage.rule_posInfo_1"]}`}</div>
								),
							},
							{
								max: 9,
								message: (
									<div>{`${intlData["posPage.rule_posInfo_2"]}`}</div>
								),
							},
						],
						render: ({
							getFieldDecorator,
							record,
							getFieldValue,
							setFieldsValue,
							rules,
						}) => {
							let locationType = {
								C: "CITY",
								N: "COUNTRY",
								W: "WORLD",
							}[getFieldValue("posType")];
							let locationListTemp =
								locationType in locationList
									? locationList[locationType]
									: [];
							let requestSearchData = ["I", "T"].includes(
								getFieldValue("posType"),
							)
								? (posInfoValue) => {
										return this.handleAgencySearch({
											posInfoValue: posInfoValue,
											getFieldValue,
										});
									}
								: "";
							return (
								<Common_searchSelect
									isSearch={locationListTemp.length > 0}
									isLocation={true}
									dataIndex={"posInfo"}
									initValue={record["posInfo"] || undefined}
									getFieldDecorator={getFieldDecorator}
									setFieldsValue={setFieldsValue}
									getFieldValue={getFieldValue}
									rules={rules}
									requestSearchData={requestSearchData}
									dataSource={locationListTemp}
									placeholder={
										intlData["posPage.placeholder_input"]
									}
									other={{
										style: {
											width: "100%",
										},
									}}
								></Common_searchSelect>
							);
						},
					},
				},
				{
					title: intlData["posPage.exclude"],
					dataIndex: "exclude",
					key: "exclude",
					editable: true,
					width: "100px",
					render: (value) => {
						return <Switch checked={value}></Switch>;
					},
					formConfig: {
						valuePropName: "checked",
						initialValue: false,
						type: "Switch",
						inputAttrConfig: {},
					},
				},
				{
					title: intlData["posPage.weight"],
					dataIndex: "weight",
					key: "weight",
					editable: true,
					width: "100px",
					formConfig: {
						render: ({ getFieldValue, setFieldsValue }) => {
							return <div>{calcWeight(getFieldValue)}</div>;
						},
					},
					render: (value) => {
						return <div>{value}</div>;
					},
				},
			],
		});
	};

	this.selectedRows = [];
}
