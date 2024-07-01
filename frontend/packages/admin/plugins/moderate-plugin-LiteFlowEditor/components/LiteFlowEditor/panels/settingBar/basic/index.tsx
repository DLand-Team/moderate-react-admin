import React, { useEffect, useState } from "react";
import { Graph } from "@antv/x6";
import { useModel } from "../../../hooks/useModel";
import styles from "./index.module.scss";

interface IProps {
	flowGraph: Graph;
}

const Basic: React.FC<IProps> = (props) => {
	const { flowGraph } = props;
	const [elString, setELString] = useState<string>(useModel()?.toEL(" "));

	useEffect(() => {
		const handleModelChange = () => {
			setELString(useModel()?.toEL(" "));
		};
		flowGraph.on("model:change", handleModelChange);
		return () => {
			flowGraph.off("model:change", handleModelChange);
		};
	}, [flowGraph, setELString]);

	return (
		<div className={styles.liteflowEditorBasicContainer}>
			<div className={styles.liteflowEditorTitle}>EL表达式：</div>
			<div className={styles.elContentWrapper}>
				<pre>{elString}</pre>
			</div>
		</div>
	);
};

export default Basic;
