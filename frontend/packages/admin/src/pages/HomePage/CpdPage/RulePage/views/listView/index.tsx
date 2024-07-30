import { Button, Card, Table } from "antd";
import { useTranslation } from "react-i18next";
import { ROUTE_ID } from "src/router";
import { routerHelper, useFlat } from "src/service";
import SearchForm from "../../components/searchForm/searchForm";
import styles from "./style.module.scss";
import useConfig from "./useTableConfig";

export interface ListViewProps {
    branchName?: string;
}
const ListView = ({ branchName }: ListViewProps) => {
    const { columns } = useConfig();
    const { ruleList } = useFlat(["ruleStore", branchName]);
    const { t } = useTranslation("rule");
    return (
        <div className={styles.container}>
            <Card>
                <SearchForm></SearchForm>
            </Card>

            <div className={styles.titleWapper}>
                <Button
                    type="primary"
                    onClick={() => {
                        routerHelper.jumpTo(ROUTE_ID.RuleAdd);
                    }}
                    style={{
                        marginBottom: 12,
                    }}>
                    + {t("rulePage_add")}
                </Button>
            </div>
            <Card title={t("rulePage_ruleList")}>
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
