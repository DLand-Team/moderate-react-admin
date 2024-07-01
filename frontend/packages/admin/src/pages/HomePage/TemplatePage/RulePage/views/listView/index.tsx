import { Button, Card, Table } from "antd";
import { ROUTE_ID } from "src/router/name";
import { RouterHelper, useFlat } from "src/service";
import SearchForm from "./components/searchForm/searchForm";
import styles from "./style.module.scss";
import useConfig from "./useConfig";

export interface ListViewProps {
	branchName?: string;
}
const ListView = ({ branchName }: ListViewProps) => {
	const { columns } = useConfig();
	const { ruleList } = useFlat(["ruleStore", branchName]);

	return (
		<div className={styles.container}>
			<Card>
				<SearchForm></SearchForm>
			</Card>

			<div className={styles.titleWapper}>
				<Button
					type="primary"
					onClick={() => {
						RouterHelper.jumpTo(ROUTE_ID.RuleAddPage);
					}}
					style={{
						marginBottom: 12,
					}}
				>
					+ 添加
				</Button>
			</div>
			<Card>
				<Table
					rowKey={(record) => {
						return record.id;
					}}
					columns={columns}
					dataSource={ruleList}
				/>
			</Card>
		</div>
	);
};

export default ListView;
