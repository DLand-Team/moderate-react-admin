import { ROUTE_ID_KEY, RouteItem } from "@/src/router";
import * as fs from "fs";
import * as path from "path";

const PAGE_FILES = ["page.tsx", "page.jsx", "page.js", "page.ts"];

// 检查文件夹是否包含 page 文件
function hasPageFile(dir: string): boolean {
	return PAGE_FILES.some((file) => fs.existsSync(path.join(dir, file)));
}

/**
 * 递归收集所有路由节点（排除 .next 文件夹）
 */
function collectRoutes(
	baseDir: string,
	parentPathArr: string[] = [],
): RouteItem[] {
	if (!fs.existsSync(baseDir)) return [];
	const entries = fs.readdirSync(baseDir, { withFileTypes: true });
	const folders = entries.filter((e) => e.isDirectory());
	const result: RouteItem[] = [];

	for (const folder of folders) {
		if (folder.name === ".next") continue; // 排除 .next 文件夹

		const folderPath = path.join(baseDir, folder.name);
		const currentPathArr = [...parentPathArr, folder.name];
		const routePath = "/" + currentPathArr.join("/");

		if (hasPageFile(folderPath)) {
			result.push({
				id: folder.name as ROUTE_ID_KEY,
				parentId: parentPathArr.length
					? (parentPathArr[parentPathArr.length - 1] as ROUTE_ID_KEY)
					: null,
				path: routePath,
			});
		}
		result.push(...collectRoutes(folderPath, currentPathArr));
	}
	return result;
}

/**
 * 用 path 做唯一 key 建树，彻底去重
 */
function buildRouteTree(list: RouteItem[]): RouteItem[] {
	const nodeMap = new Map<string, RouteItem>();
	list.forEach((item) => {
		nodeMap.set(item.path!, { ...item, children: [] });
	});

	const roots: RouteItem[] = [];
	list.forEach((item) => {
		const node = nodeMap.get(item.path!)!;
		if (item.parentId) {
			// 找到 parent 节点的 path
			const parent = list.find(
				(i) =>
					i.id === item.parentId &&
					node.path!?.startsWith(i.path + "/"),
			);
			if (parent && nodeMap.has(parent.path!)) {
				const parentNode = nodeMap.get(parent.path!)!;
				if (
					!parentNode.children?.find(
						(child) => child.path === node.path,
					)
				) {
					parentNode.children?.push(node);
				}
			} else {
				roots.push(node);
			}
		} else {
			roots.push(node);
		}
	});

	// 保证根节点无重复
	const uniqueRoots: RouteItem[] = [];
	const seen = new Set<string>();
	for (const root of roots) {
		if (!seen.has(root.path!)) {
			uniqueRoots.push(root);
			seen.add(root.path!);
		}
	}
	return uniqueRoots;
}

export function generateNextjsRouteStructure(baseDir: string): {
	list: RouteItem[];
	tree: RouteItem;
} {
	// 收集并用 path 去重
	const list = collectRoutes(baseDir);
	const uniqueList = Array.from(
		new Map(list.map((i) => [i.path, i])).values(),
	);
	const tree = buildRouteTree(uniqueList);
	return {
		list: uniqueList,
		tree: {
			id: "app" as ROUTE_ID_KEY,
			path: "/",
			children: tree,
		},
	};
}

export function generateRouteData() {
	const appDir = path.resolve(process.cwd(), "src/app");
	const { tree, list } = generateNextjsRouteStructure(appDir);
	return { tree, list };
}
