import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default (listener) => {
  let location = useLocation();
  useEffect(() => {
    listener(location);
  }, [location]);
};
