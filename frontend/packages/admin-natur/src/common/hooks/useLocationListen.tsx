import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const useLocationListen =  (listener) => {
  let location = useLocation();
  useEffect(() => {
    listener(location);
  }, [location]);
};

export default useLocationListen;