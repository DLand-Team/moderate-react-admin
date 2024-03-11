import { useEffect } from "react";

const useAsyncEffcet = (
  effect: () => any,
  deps?: React.DependencyList
) => {
  useEffect(() => {
    (async () => {
      await effect();
    })();
  },deps);
};

export default useAsyncEffcet;
