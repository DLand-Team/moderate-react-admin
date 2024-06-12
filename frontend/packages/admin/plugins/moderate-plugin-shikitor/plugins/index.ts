import type { ShikitorPlugin } from "@shikitor/core";
import type { ModuleNamespace } from "vite/types/hot.d.ts";

//@ts-ignore
const bundledPluginModules = import.meta.glob(
	[
		"./*.ts",
		"./*/index.ts",
		"../../../packages/core/src/plugins/*.ts",
		"../../../packages/core/src/plugins/*/index.ts",
	],
	{
		eager: true,
	},
) as Record<
	string,
	{
		default: ShikitorPlugin | (() => ShikitorPlugin);
	}
>;

function getId(path: string) {
	return path
		.replace(/^\.\//, "")
		.replace(/^\.\.\/\.\.\/\.\.\/packages\/core\/src\/plugins\//, "")
		.replace(/^\/@fs\/.*?\/plugins\//, "")
		.replace(/(\/index)?(.jsx?|.tsx?)$/, "");
}
export const bundledPluginsInfo = Object.entries(bundledPluginModules).map(
	([path, module]) => {
		const name = getId(path);
		return { id: name, name, module };
	},
);

type Listener = (
	mods: (ModuleNamespace | undefined)[],
	paths?: string[],
) => void;
const listeners: Set<Listener> = new Set();
//@ts-ignore
if (import.meta.hot) {
	//@ts-ignore
	import.meta.hot.accept(
		[
			"./*.ts",
			"./*/index.ts",
			"../../../packages/core/src/plugins/*.ts",
			"../../../packages/core/src/plugins/*/index.ts",
		],
		//@ts-ignore
		(mods, paths) => {
			for (const listener of listeners) listener(mods, paths);
		},
	);
}

export function onPluginChange(
	lis: (index: number, id: string, module: ShikitorPlugin) => void,
) {
	const listener: Listener = (mods, paths = []) => {
		for (const [index, mod] of mods.entries()) {
			if (!mod) continue;
			const d = mod.default as ShikitorPlugin;
			if (!d) {
				console.warn(
					"Plugin file must export a default value, skipping",
					paths[index],
				);
				continue;
			}
			lis(index, getId(paths[index] ?? "") ?? "", d);
		}
	};
	listeners.add(listener);
	return () => (listeners.delete(listener), void 0);
}
