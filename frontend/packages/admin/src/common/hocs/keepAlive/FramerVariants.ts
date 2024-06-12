import { Transition, Variants } from "framer-motion";
import { RouterAni } from "src/service/stores/appStore/modal";

const RouteTransition: Transition = {
	type: "spring",
	duration: 1,
};

const RouteFadeTransition: Transition = {
	type: "spring",
	duration: 1.6,
};

function getTransition(mode: RouterAni) {
	if (mode === "fade") {
		return {
			PushVariants: {
				initial: {
					opacity: 0,
				},
				in: {
					opacity: 1,
				},
				out: {
					opacity: 0,
				},
			} as Variants,
			PopVariants: {
				initial: {
					opacity: 0,
				},
				in: {
					opacity: 1,
				},
				out: {
					opacity: 0,
				},
			} as Variants,
		};
	}
	if (mode === "slide") {
		return {
			PushVariants: {
				initial: {
					opacity: 0,
					x: "10vw",
				},
				in: {
					opacity: 1,
					x: 0,
				},
				out: {
					opacity: 0,
					x: "-10vw",
				},
			} as Variants,
			PopVariants: {
				initial: {
					opacity: 0,
					x: "-10vw",
				},
				in: {
					opacity: 1,
					x: 0,
				},
				out: {
					opacity: 0,
					x: "10vw",
				},
			} as Variants,
		};
	}
	if (mode === "up") {
		return {
			PushVariants: {
				initial: {
					opacity: 0,
					y: "-5vw",
				},
				in: {
					opacity: 1,
					y: 0,
				},
				out: {
					opacity: 0,
					y: "5vw",
				},
			} as Variants,
			PopVariants: {
				initial: {
					opacity: 0,
					y: "3vw",
				},
				in: {
					opacity: 1,
					y: 0,
				},
				out: {
					opacity: 0,
					y: "-3vw",
				},
			} as Variants,
		};
	}
	return {} as Variants;
}

function getRouteTransition(mode: RouterAni) {
	if (mode === "fade") {
		return RouteFadeTransition;
	}
	if (mode === "slide") {
		return RouteTransition;
	}

	if (mode === "up") {
		return RouteTransition;
	}
	return RouteTransition as Transition;
}

export { getRouteTransition, getTransition };
