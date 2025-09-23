import { PropsWithChildren } from "react";
import { motion, Variants } from "framer-motion";
import { getRouteTransition, getTransition } from "./framerVariant";
import { usePathname } from "next/navigation";
const AnimationWrapper = ({ children }: PropsWithChildren) => {
  const { PushVariants } = getTransition("fade");
  const RouteTransition = getRouteTransition("fade");
  const pathName = usePathname();
  return (
    <motion.div
      key={pathName}
      animate="in"
      exit="out"
      initial="initial"
      transition={RouteTransition}
      style={{
        height: "100%",
      }}
      variants={PushVariants as Variants}
    >
      {children}
    </motion.div>
  );
};

export default AnimationWrapper;
