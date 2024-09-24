import { useRef } from "react";
import { Banner } from "./banner";
import styles from "./helloPage.module.scss";
import { Info } from "./info";

export default () => {
	const containerRef = useRef<HTMLElement | undefined>(undefined);
	return (
		<div
			id="helloConent"
			className={styles.content}
			ref={(e) => {
				if (e) {
					containerRef.current = e;
				}
			}}
		>
			<Banner />
			<Info containerRef={containerRef}></Info>
		</div>
	);
};
