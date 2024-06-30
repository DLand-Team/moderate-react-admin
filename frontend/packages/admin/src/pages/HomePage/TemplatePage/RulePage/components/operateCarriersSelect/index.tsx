import { Form, Input, Select } from "antd";
import SearchSelect from "../searchSelect";
import styles from "./style.module.scss";

const InputGroup = Input.Group;
const { Option } = Select;

export default (props: any) => {
	const {
		dataSource,
		handleChange,
		isForm,
		useFlagInitValue,
		searchSelectInitValue = "ALL",
		disable,
		exclude,
	} = props;
	let handleUseSelectChange = (value: any) => {
		updateData(value, searchSelectInitValue);
	};
	let handleSearchSelectChange = (value: any) => {
		updateData(useFlagInitValue, value);
	};
	let updateData = (useFlagInitValueT: any, searchSelectInitValueT: any) => {
		if (useFlagInitValueT) {
			handleChange &&
				handleChange({
					operateCarriers: searchSelectInitValueT,
					notOperateCarriers: null,
				});
		} else {
			handleChange &&
				handleChange({
					notOperateCarriers: searchSelectInitValueT,
					operateCarriers: null,
				});
		}
	};
	let selectPart = isForm ? (
		exclude ? (
			<Form.Item
				style={{
					margin: 0,
				}}
				name={"useFlag"}
				initialValue={useFlagInitValue}
			>
				<Select
					disabled={disable}
					onSelect={handleUseSelectChange}
					className="customInputItemSelect"
				>
					<Option value={1}>USE</Option>
				</Select>
			</Form.Item>
		) : (
			<Form.Item
				style={{
					margin: 0,
				}}
				name={"useFlag"}
				initialValue={useFlagInitValue}
			>
				<Select
					disabled={disable}
					onSelect={handleUseSelectChange}
					className="customInputItemSelect"
				>
					<Option value={1}>USE</Option>
					<Option value={0}>NOT</Option>
				</Select>
			</Form.Item>
		)
	) : (
		<Select
			disabled={disable}
			onSelect={handleUseSelectChange}
			className="customInputItemSelect"
			value={useFlagInitValue ? 1 : 0}
		>
			<Option value={1}>USE</Option>
			<Option value={0}>NOT</Option>
		</Select>
	);

	return (
		<InputGroup className={styles.operateCarriersSelect} compact>
			{selectPart}
			<SearchSelect
				disabled={disable}
				initValue={searchSelectInitValue}
				isForm={isForm}
				handleChange={handleSearchSelectChange}
				dataSource={dataSource}
				dataIndex={"opCarrier"}
			/>
		</InputGroup>
	);
};
