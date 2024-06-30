import { Form, Select, Tooltip } from "antd";
import { Fragment, useState } from "react";
const { Option } = Select;

const SearchSelect = (props: any) => {
	const { dataSource, disabled, placeholder, style, isForm, initValue } =
		props;
	let domProps = isForm ? {} : { value: initValue || "ALL" };
	const [data, setData] = useState([]);
	const handleChange = () => {};
	const handleSearch = (value: any) => {
		if (value) {
			let dataTemp = dataSource.filter((item: any) => {
				let { name } = item;
				name = name === undefined ? "" : name;
				return name.toLowerCase().indexOf(value.toLowerCase()) > -1;
			});
			dataTemp.push({ name: "ALL", value: "ALL" });
			setData(dataTemp);
		} else {
			setData([]);
		}
	};
	const options = data.map((d: any) => (
		<Option value={d.value} key={d.name}>
			<Tooltip placement="bottom" title={d.name}>
				{d.name}
			</Tooltip>
		</Option>
	));
	return (
		<Fragment>
			{isForm ? (
				<Form.Item>
					<Select
						disabled={disabled}
						showSearch
						placeholder={placeholder}
						style={{ width: "100px", ...style }}
						defaultActiveFirstOption={false}
						filterOption={false}
						onSearch={handleSearch}
						onSelect={handleChange}
						notFoundContent={null}
						{...domProps}
					>
						{options}
					</Select>
				</Form.Item>
			) : (
				<Select
					disabled={disabled}
					showSearch
					placeholder={placeholder}
					style={{ width: "100px", ...style }}
					defaultActiveFirstOption={false}
					filterOption={false}
					onSearch={handleSearch}
					onSelect={handleChange}
					notFoundContent={null}
					{...domProps}
				>
					{options}
				</Select>
			)}
		</Fragment>
	);
};

export default SearchSelect;
