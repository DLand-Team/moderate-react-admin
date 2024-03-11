import { useFlatInject } from "@/common/hooks";
import styles from "./style.module.scss";

const TestPage = () => {
	const [testPageStore] = useFlatInject("testPageStore");
	const { pageNum, setIsDetailAct } = testPageStore;
	setIsDetailAct(false);
	return <div className={styles.content}>welcome!{pageNum}</div>;
};

export default TestPage;
