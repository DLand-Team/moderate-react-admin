import { useMediaQuery } from "react-responsive";

export const useIsMobile = () => {
	const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1248px)" });
	return isTabletOrMobile;
};
