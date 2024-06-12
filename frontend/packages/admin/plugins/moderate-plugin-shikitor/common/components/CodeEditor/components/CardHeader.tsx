import "./CardHeader.scss";

import { useEffect } from "react";
import {
	bundledLanguagesInfo,
	bundledThemesInfo,
	type BundledLanguage,
	type BundledTheme,
} from "shiki";
import {
	ExtensionIcon,
	Fullscreen1Icon,
	FullscreenExit1Icon,
} from "tdesign-icons-react";
import { Button, Link, MessagePlugin, Select, Tooltip } from "tdesign-react";

import { useQueries } from "../../../hooks/useQueries";

export function CardHeader() {
	const queries = useQueries<{
		theme: BundledTheme;
		language: BundledLanguage;
		viewMode: "normal" | "fullview" | "fullscreen";
	}>();
	const {
		theme = "github-dark",
		language = "typescript",
		viewMode = "normal",
	} = queries?.value ?? {};
	useEffect(() => {
		document.body.classList.toggle("fullview", viewMode !== "normal");
		if (document.fullscreenElement) {
			document.exitFullscreen();
		}
		if (viewMode === "fullscreen") {
			document.documentElement.requestFullscreen();
		}
		return () => {
			if (document.fullscreenElement) document.exitFullscreen();
		};
	}, [viewMode]);
	return (
		<div className="card-header">
			<div className="left">
				<Select
					filterable
					borderless
					size="small"
					value={language}
					onChange={(v) => queries.set("language", v as string)}
					options={bundledLanguagesInfo.map((lang) => ({
						value: lang.id,
						label: lang.name,
					}))}
				/>
				<Select
					filterable
					borderless
					size="small"
					value={theme}
					onChange={(v) => queries.set("theme", v as string)}
					options={bundledThemesInfo.map((theme) => ({
						value: theme.id,
						label: theme.displayName,
					}))}
				/>
			</div>
			<div className="right">
				<Tooltip
					content={
						{
							normal: "Switch to full view",
							fullview: "Switch to fullscreen",
							fullscreen: "Exit fullscreen",
						}[viewMode]
					}
				>
					<Button
						ghost
						variant="text"
						shape="square"
						icon={
							{
								normal: <Fullscreen1Icon />,
								fullview: <Fullscreen1Icon />,
								fullscreen: <FullscreenExit1Icon />,
							}[viewMode]
						}
						onClick={() =>
							queries.set(
								"viewMode",
								viewMode === "normal"
									? "fullview"
									: viewMode === "fullview"
										? "fullscreen"
										: "normal",
							)
						}
					/>
				</Tooltip>
				<Tooltip content="Config extensions">
					<Button
						ghost
						variant="text"
						shape="square"
						icon={<ExtensionIcon />}
						onClick={() =>
							MessagePlugin.warning("Not implemented yet")
						}
					/>
				</Tooltip>
				<Link
					hover="color"
					href="https://github.com/nwylzw/shikitor"
					target="_blank"
				>
					<img
						src="https://github.githubassets.com/favicons/favicon.svg"
						alt="github"
						width="16"
						height="16"
					/>
				</Link>
			</div>
		</div>
	);
}
