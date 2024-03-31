import { useEffect, useState } from "react";

import styles from "./helloPage.module.scss";

const HelloPage = () => {
	const [timeRange] = useState("all");

	useEffect(() => {}, [timeRange]);

	return (
		<div className={styles.content}>
			<iframe
				style={{
					border: "none",
					width: "100%",
					height:'100%'
				}}
				src={"/hello/index.html"}
			></iframe>
		</div>
	);
};

export default HelloPage;
