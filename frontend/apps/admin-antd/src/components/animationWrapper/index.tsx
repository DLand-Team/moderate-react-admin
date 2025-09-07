import { PropsWithChildren } from "react";
import { useLocation, useNavigationType } from "react-router-dom";
import { useFlat } from "src/service";

import { motion, Variants } from "framer-motion";
import { getRouteTransition, getTransition } from "./framerVariants";
const AnimationWrapper = ({ children }: PropsWithChildren) => {
	const action: ReturnType<typeof useNavigationType> = useNavigationType();
	const { settingData } = useFlat("appStore");
	const { routerAni } = settingData;
	const { PushVariants, PopVariants } = getTransition(routerAni);
	const RouteTransition = getRouteTransition(routerAni);
	return (
		<motion.div
			key={useLocation().pathname}
			animate="in"
			exit="out"
			initial="initial"
			transition={RouteTransition}
			style={{
				height: "100%",
			}}
			variants={
				action === "PUSH"
					? (PushVariants as Variants)
					: (PopVariants as Variants)
			}
		>
			{children}
		</motion.div>
	);
};

export default AnimationWrapper;
