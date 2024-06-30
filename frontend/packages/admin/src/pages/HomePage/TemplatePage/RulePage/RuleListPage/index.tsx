/*
 * @Author: Do not edit
 * @Date: 2024-03-18 11:51:26
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-03-19 11:35:29
 * @Description: Do not edit
 */
import { RouterHelper, useFlat } from "src/service";
import { Button, Card, Table } from "antd";
import SearchForm from "./components/searchForm/searchForm";
import styles from "./style.module.scss";
import { useEffect } from "react";
import { ROUTE_ID } from "src/router/name";
import useConfig from "./useConfig";

const Page = () => {
	const { columns } = useConfig();
	const { queryRuleListAct, ruleList } = useFlat("ruleStore");
	useEffect(() => {
		queryRuleListAct();
	}, []);

	return (
		<div className={styles.content}>
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

export default Page;
