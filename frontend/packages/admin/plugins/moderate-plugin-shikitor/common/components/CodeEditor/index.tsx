import "./index.scss";

import type { Shikitor } from "@shikitor/core";
//@ts-ignore
import { WithoutCoreEditor } from "@shikitor/react";
import { useMemo, useRef, useState } from "react";
import type { BundledLanguage, BundledTheme } from "shiki";

import { usePlugins } from "plugins/moderate-plugin-shikitor/common/hooks/usePlugins";
import { useQueries } from "plugins/moderate-plugin-shikitor/common/hooks/useQueries";
import { useShikitorCreate } from "plugins/moderate-plugin-shikitor/common/hooks/useShikitorCreate.ts";
import {
	analyzeHash,
	DEFAULT_CODE,
} from "plugins/moderate-plugin-shikitor/common/utils/analyzeHash.ts";
import type { GistFile } from "plugins/moderate-plugin-shikitor/common/utils/gist.ts";
import { getGist } from "plugins/moderate-plugin-shikitor/common/utils/gist.ts";
import { bundledPluginsInfo } from "plugins/moderate-plugin-shikitor/plugins";

import { useColor } from "../../hooks/useColor";
import { CardHeader } from "./components/CardHeader";

const plugins = bundledPluginsInfo.map(({ module: { default: d } }) => d);

async function initPlaygroundShikitor(shikitor: Shikitor) {
	const { type, content } = analyzeHash();
	if (type === "gist") {
		shikitor.value = "// Loading from gist...";
		const [hash, filename, revision] = content.split("/");
		let isNotFound = false;
		let files: GistFile[] | undefined;
		try {
			const { file, files: getFiles } = await getGist(
				hash,
				filename,
				revision,
			);
			if (file?.content) {
				shikitor.value = file?.content;
			} else {
				isNotFound = true;
				files = Object.values(getFiles);
			}
		} catch (e) {
			const error = e as Error;
			if ("message" in error && error.message === "Not Found") {
				isNotFound = true;
			} else {
				throw e;
			}
		}
		if (isNotFound) {
			if (files) {
				console.error(
					"File not found, available files are: " +
						files.map((file) => file.filename).join(", "),
				);
			} else {
				console.error(
					"Gist not found, the hash may be invalid or the gist is private",
				);
			}
		}
	}
}

const { code: hashCode } = analyzeHash();
export default function CodeEditor() {
	const [code, setCode] = useState(hashCode ?? DEFAULT_CODE);
	const {
		value: { theme = "github-dark", language = "typescript" },
	} = useQueries<{
		theme: BundledTheme;
		language: BundledLanguage;
	}>();

	const shikitorRef = useRef<Shikitor>(null);
	const shikitorCreate = useShikitorCreate();
	usePlugins(shikitorRef);
	const { setColor } = useColor(
		(style, { bg, fg }) => {
			style.setProperty("--td-font-gray-1", bg);
			style.setProperty("--td-bg-color-container", fg);
			style.setProperty("--td-gray-color-13", fg);
			const hoverColor = `color-mix(in srgb, ${fg}, ${bg} 10%)`;
			style.setProperty("--hover", hoverColor);
			style.setProperty("--td-gray-color-1", hoverColor);
		},
		[
			"td-font-gray-1",
			"td-bg-color-container",
			"td-gray-color-13",
			"hover",
			"td-gray-color-1",
		],
	);
	return (
		<div className="code-editor">
			<CardHeader />
			<WithoutCoreEditor
				//@ts-ignore
				ref={shikitorRef}
				//@ts-ignore
				create={shikitorCreate}
				value={code}
				onChange={setCode}
				options={useMemo(
					() => ({
						theme,
						language,
					}),
					[theme, language],
				)}
				//@ts-ignore
				plugins={plugins}
				onColorChange={setColor}
				//@ts-ignore
				onMounted={initPlaygroundShikitor}
			/>
		</div>
	);
}
