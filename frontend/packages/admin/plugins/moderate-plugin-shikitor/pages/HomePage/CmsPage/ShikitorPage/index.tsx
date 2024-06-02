import "@shikitor/core/index.css";
import "./App.scss";
//@ts-ignore
import { classnames } from "@shikitor/core/utils";
import CodeEditorPreview from "plugins/moderate-plugin-shikitor/common/components/CodeEditor/Preview";
import MessengerPreview from "plugins/moderate-plugin-shikitor/common/components/Messenger/Preview";
import { useQueries } from "plugins/moderate-plugin-shikitor/common/hooks/useQueries";
import { lazy, Suspense, useMemo } from "react";

const examples = [
	[
		"Code Editor",
		lazy(
			() =>
				import(
					"plugins/moderate-plugin-shikitor/common/components/CodeEditor"
				),
		),
		CodeEditorPreview,
	],
	[
		"Messenger",
		lazy(
			() =>
				import(
					"plugins/moderate-plugin-shikitor/common/components/Messenger"
				),
		),
		MessengerPreview,
	],
] as const;

export default function App() {
	const { value, set } =
		useQueries<{
			active: "Code Editor" | "Markdown Editor" | "Messenger";
			topBarVisible: string;
		}>() || {};
	const { active = "Code Editor", topBarVisible = "true" } = value || {};
	const ActiveComponent = useMemo(() => {
		return examples.find(([n]) => n === active)?.[1];
	}, [active]);
	return (
		<div
			id="shiki"
			style={{
				position: "relative",
				height: "100%",
			}}
		>
			{ActiveComponent ? (
				<Suspense fallback={<div className="loading">Loading...</div>}>
					<ActiveComponent />
				</Suspense>
			) : (
				<div>Unknown component: {active}</div>
			)}
			<div
				className={classnames(
					"examples",
					topBarVisible === "false" && "examples__hide",
				)}
			>
				{examples.map(([name, _, Preview]) => (
					<div
						key={name}
						className={
							"example" + (name === active ? " active" : "")
						}
						onClick={() => set("active", name)}
					>
						<h4>{name}</h4>
						<div className="preview">
							<Preview />
						</div>
					</div>
				))}
				{/* <div
					className="switch"
					onClick={() => {
						set(
							"topBarVisible",
							topBarVisible === "true" ? "false" : "true",
						);
					}}
				>
					<span className="shikitor-icon">keyboard_arrow_up</span>
				</div> */}
			</div>
		</div>
	);
}
