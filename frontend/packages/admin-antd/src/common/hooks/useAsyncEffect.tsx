import React, { useEffect } from "react";

const useAsyncEffect = (effect: () => any, deps?: React.DependencyList) => {
	useEffect(() => {
		(async () => {
			await effect();
		})();
	}, deps);
};

export default useAsyncEffect;
