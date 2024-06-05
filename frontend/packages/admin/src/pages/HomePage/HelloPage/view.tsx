import { useRef, useState } from "react";
import { Banner } from "./banner";
import styles from "./helloPage.module.scss";
import { Info } from "./info";

export default () => {
	const containerRef = useRef<HTMLElement>();
	const [imgHeight, setImgHeight] = useState(0);
	return (
		<div
			id="helloConent"
			className={styles.content}
			ref={(e) => {
				if (e) {
					containerRef.current = e;
					setImgHeight(e?.clientHeight);
				}
			}}
		>
			<Banner />
			<Info containerRef={containerRef} maxHeight={imgHeight}></Info>
		</div>
	);
};
