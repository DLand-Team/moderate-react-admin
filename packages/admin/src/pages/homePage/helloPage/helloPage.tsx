import { useEffect, useState } from "react";

import styles from "./helloPage.module.scss";

const HelloPage = () => {
	const [timeRange] = useState("all");

	useEffect(() => {}, [timeRange]);

	return <div className={styles.content}></div>;
};

export default HelloPage;
