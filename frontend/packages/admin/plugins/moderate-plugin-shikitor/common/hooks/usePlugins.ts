import type { Shikitor } from "@shikitor/core";
import type { RefObject } from "react";
import { useEffect } from "react";

import { onPluginChange } from "../../plugins";

export const usePlugins = (shikitorRef: RefObject<Shikitor>) => {
	useEffect(
		() =>
			onPluginChange((_, id, module) => {
				const shikitor = shikitorRef.current;
				if (!shikitor) return;

				const findIndex = shikitor.options.plugins.findIndex(
					(p) => p.name === id,
				);
				shikitor
					.upsertPlugin(
						module,
						findIndex === -1 ? undefined : findIndex,
					)
					.then(() => {
						console.log("Plugin updated:", id);
					});
			}),
		[shikitorRef],
	);
	return {};
};
