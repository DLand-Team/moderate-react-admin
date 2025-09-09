import { useMediaQuery } from "react-responsive";

export const useIsMobile = () => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 968px)" });
  return isTabletOrMobile;
};
