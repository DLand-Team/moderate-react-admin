import { Checkbox, Col, Row, Select } from "antd";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { RuleHelper, useFlat } from "src/service";
import OperateCarriersSelect from "../operateCarriersSelect";
import SearchSelect from "../searchSelect";
import styles from "./style.module.scss";
import classNames from "classnames";

const CategoryEdit = (props: any) => {
	const { searchSelectData, targetItinerary, branchName } = props;
	const { updateItineraryAct } = useFlat(["ruleStore", branchName]);
	const { t } = useTranslation();
	const {
		flightCategory = 1,
		noOverNight = 0,
		noInterline = 0,
		carrier,
		operateCarriers,
		notOperateCarriers,
		allowCodeShare,
	} = targetItinerary || {};
	let useFlagInitValue = true,
		searchSelectInitValue = "ALL";
	if (operateCarriers) {
		useFlagInitValue = true;
		searchSelectInitValue = operateCarriers;
	} else if (notOperateCarriers) {
		useFlagInitValue = false;
		searchSelectInitValue = notOperateCarriers;
	}
	return (
		<div className={styles.container}>
			<div className={styles.itFormItem}>
				<div className={styles.itFormItemText}>
					{t("rule:rulePage_category")}:
				</div>
				<div>
					<Select
						value={flightCategory}
						style={{ width: 200 }}
						onChange={(e) => {
							let targetItineraryTemp =
								RuleHelper.initItinerary(targetItinerary);
							targetItineraryTemp &&
								updateItineraryAct({
									...targetItineraryTemp,
									flightCategory: e,
								});
						}}
					>
						<Select.Option value={1}>
							{t("rule:rulePage_NONSTOP")}
						</Select.Option>
						<Select.Option value={2}>
							{t("rule:rulePage_DIRECT")}
						</Select.Option>
						<Select.Option value={3}>
							{t("rule:rulePage_CONNECTION")}
						</Select.Option>
					</Select>
				</div>
			</div>

			<div
				className={classNames(styles.itFormItem, styles.itFormItemFlex)}
			>
				{flightCategory === 3 ? (
					<Fragment>
						<Checkbox
							checked={noOverNight}
							onChange={(e) => {
								updateItineraryAct({
									...targetItinerary,
									noOverNight: e.target.checked ? 1 : 0,
								});
							}}
						>
							{t("rule:rulePage_noOverNight")}
						</Checkbox>
						<Checkbox
							onChange={(e) => {
								e.target.checked;
								updateItineraryAct({
									...targetItinerary,
									noInterline: e.target.checked ? 1 : 0,
								});
							}}
							checked={noInterline}
						>
							{t("rule:rulePage_noInterline")}
						</Checkbox>
					</Fragment>
				) : (
					<Fragment>
						<Row align="bottom" style={{ width: "100%" }}>
							<Col span={8}>
								<Checkbox
									checked={allowCodeShare}
									onChange={(e) => {
										updateItineraryAct({
											...targetItinerary,
											allowCodeShare: e.target.checked
												? 1
												: 0,
										});
									}}
								>
									{t("rule:rulePage_allowCodeShare")}
								</Checkbox>
							</Col>
							<Col span={8}>
								<div>
									<div className={styles.itFormItemText3}>
										{t("rule:rulePage_carriers")}:
									</div>
									<div>
										<SearchSelect
											initValue={carrier}
											dropdownStyle={{
												whiteSpace: "normal",
												wordBreak: "break-all",
											}}
											handleChange={(value: any) => {
												updateItineraryAct({
													...targetItinerary,
													carrier: value,
												});
											}}
											dataSource={searchSelectData}
										></SearchSelect>
									</div>
								</div>
							</Col>
							<Col span={8}>
								<div>
									<div className={styles.itFormItemText3}>
										{t("rule:rulePage_operateCarriers")}:
									</div>
									<OperateCarriersSelect
										disable={!allowCodeShare}
										useFlagInitValue={useFlagInitValue}
										searchSelectInitValue={
											searchSelectInitValue
										}
										handleChange={(value: any) => {
											updateItineraryAct({
												...targetItinerary,
												...value,
											});
										}}
										dataSource={searchSelectData}
									/>
								</div>
							</Col>
						</Row>
					</Fragment>
				)}
			</div>
		</div>
	);
};

export default CategoryEdit;
