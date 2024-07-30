import { PropsWithChildren } from "react";
import { useNavigationType } from "react-router-dom";
import { useFlat } from "src/service";

import { motion, Variants } from "framer-motion";
import { getRouteTransition, getTransition } from "./FramerVariants";

const AnimationWrapper = ({ children }: PropsWithChildren) => {
    const action: ReturnType<typeof useNavigationType> = useNavigationType();
    const { settingData } = useFlat("appStore");
    const { routerAni } = settingData;
    const { PushVariants, PopVariants } = getTransition(routerAni);
    const RouteTransition = getRouteTransition(routerAni);

    return (
        <motion.div
            animate="in"
            exit="out"
            initial="initial"
            key={location.pathname}
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
