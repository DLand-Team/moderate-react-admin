import { theme } from "antd";
import { motion, useCycle } from "framer-motion";
import { useRef } from "react";
import { useLocationListen } from "src/common/hooks";
import { NameInfo, SliderMenu } from "src/components";
import { MenuToggle } from "./MenuToggle";
import styles from "./styles.module.scss";
import { useDimensions } from "./use-dimensions";
const sidebar = {
	open: (height = 1000) => ({
		clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
		transition: {
			type: "spring",
			stiffness: 20,
			restDelta: 2,
		},
	}),
	closed: {
		clipPath: "circle(00px at 0px 0px)",
		transition: {
			delay: 0.1,
			type: "spring",
			stiffness: 400,
			damping: 40,
		},
	},
};

export const MenuAni = () => {
	const [isOpen, toggleOpen] = useCycle(false, true);
	const containerRef = useRef(null);
	const { height } = useDimensions(containerRef);
	const {
		token: { colorBgContainer },
	} = theme.useToken();
	const ref = useRef(false);
	ref.current = isOpen;
	useLocationListen(() => {
		ref.current && toggleOpen();
	});

	return (
		<div>
			<motion.nav
				initial={false}
				animate={isOpen ? "open" : "closed"}
				custom={height}
				ref={containerRef}
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					width: "60px",
				}}
				onClick={() => {}}
			>
				<motion.div className={styles.background} variants={sidebar}>
					<div
						style={{
							background: colorBgContainer,
							position: "relative",
							height: "100dvh",
							overflow: "hidden",
						}}
					>
						<NameInfo />
						<SliderMenu isMobile={true}></SliderMenu>
					</div>
				</motion.div>
				<MenuToggle isOpen={isOpen} toggle={() => toggleOpen()} />
			</motion.nav>
		</div>
	);
};
