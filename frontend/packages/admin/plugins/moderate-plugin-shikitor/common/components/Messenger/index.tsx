import "./index.scss";

import MarkdownItPluginShiki from "@shikijs/markdown-it";
import type { Shikitor } from "@shikitor/core";
//@ts-ignore
import provideCompletions from "@shikitor/core/plugins/provide-completions";
//@ts-ignore
import providePopup from "@shikitor/core/plugins/provide-popup";
//@ts-ignore
import provideSelectionToolbox from "@shikitor/core/plugins/provide-selection-toolbox";
//@ts-ignore
import selectionToolboxForMd from "@shikitor/core/plugins/selection-toolbox-for-md";
//@ts-ignore
import { WithoutCoreEditor } from "@shikitor/react";
import MarkdownIt from "markdown-it";
import type { ClientOptions } from "openai";
import OpenAI from "openai";
import { useCallback, useMemo, useRef, useState } from "react";
import type { BundledLanguage, BundledTheme } from "shiki";
import {
	Avatar,
	Button,
	Drawer,
	Input,
	Link,
	MessagePlugin,
	Popconfirm,
	Select,
} from "tdesign-react";

import { useQueries } from "plugins/moderate-plugin-shikitor/common/hooks/useQueries.tsx";
import { useShikitorCreate } from "plugins/moderate-plugin-shikitor/common/hooks/useShikitorCreate.ts";
import { useColor } from "../../hooks/useColor";
import type { IMessage, IUser } from "./components/Message";
import { Message } from "./components/Message";
import atUser from "./plugins/at-user";

type MessageItem = IMessage & {
	hidden?: boolean;
};

const bundledPlugins = [
	providePopup,
	provideCompletions({
		popupPlacement: "top",
		footer: false,
	}),
	atUser({
		targets: ["Shikitor", "YiJie", "ShikitorBot"],
	}),
	provideSelectionToolbox,
	selectionToolboxForMd,
];

const currentUser = {
	name: "YiJie",
} as IUser;
type Bot = IUser & {
	description: string;
};
const bots = {
	documentHelper: {
		name: "Document Helper Bot",
		avatar: `${import.meta.env.BASE_URL}public/favicon.svg`,
		description:
			"A bot that helps you document your to code. The shikitor is a editor that supports markdown and code highlighting.",
	},
} satisfies Record<string, Bot>;

function messageTransform(
	bot: Bot,
	m: MessageItem,
): OpenAI.ChatCompletionMessageParam {
	const isBot = m.user?.name === bot.name;
	return {
		role: isBot ? "assistant" : "user",
		content: `${isBot ? "" : `${m.user?.name}:\n`}${m.text}`,
	};
}

export default function Messenger() {
	const {
		value: { theme = "github-dark" },
	} = useQueries<{
		theme: BundledTheme;
		language: BundledLanguage;
	}>();
	const mdRef = useRef<MarkdownIt>();
	if (!mdRef.current) {
		mdRef.current = MarkdownIt();
		MarkdownItPluginShiki({
			themes: {
				light: theme,
			},
		}).then((plugin) => mdRef.current?.use(plugin));
	}
	const [text, setText] = useState("");

	const storageConfig = JSON.parse(
		localStorage.getItem("openai-config") ??
			'{ "baseURL": "https://api.openai.com/v1" }',
	);
	const [config, setConfig] = useState({
		...storageConfig,
		dangerouslyAllowBrowser: true,
	} as ClientOptions);
	const openaiRef = useRef<OpenAI | null>(null);
	function createOpenAI() {
		if (!config.apiKey || !config.baseURL) return;
		openaiRef.current = new OpenAI(config);
	}
	openaiRef.current === null && createOpenAI();

	const [messages, setMessages] = useState<MessageItem[]>([]);
	const sendMessage = async (message: string) => {
		const newMessages = [
			...messages,
			{
				text: message,
				user: currentUser,
				ctime: Date.now(),
			},
		] satisfies MessageItem[];
		setMessages(newMessages);
		setText("");
		if (!openaiRef.current) {
			await MessagePlugin.error("OpenAI not initialized");
			return;
		}
		const bot = bots.documentHelper;
		const completions = await openaiRef.current.chat.completions.create({
			model: "gpt-4o",
			// eslint-disable-next-line camelcase
			max_tokens: 4096,
			messages: [
				{
					content:
						`Your name is "${bot.name}" and your description is "${bot.description}".\n` +
						"Every message except yours has a corresponding username, in the format where the current message username appears at the beginning of each message.",
					role: "system",
				},
				...newMessages.map(
					messageTransform.bind(null, bots.documentHelper),
				),
			],
			stream: true,
		});
		newMessages.push({
			text: "",
			user: bots.documentHelper,
			ctime: Date.now(),
		});
		const latestMessage = newMessages[newMessages.length - 1];
		let streamMessage = "";
		for await (const {
			choices: [{ delta }],
		} of completions) {
			streamMessage += delta.content ?? "";
			latestMessage.text = streamMessage;
			setMessages([...newMessages]);
		}
	};

	const shikitorRef = useRef<Shikitor>(null);
	const shikitorCreate = useShikitorCreate();

	const [configDrawerVisible, setConfigDrawerVisible] = useState(false);
	const { setColor } = useColor(
		useCallback((style, { fg, bg }) => {
			const hoverColor = `color-mix(in srgb, ${fg}, ${bg} 10%)`;
			style.setProperty("--hover", hoverColor);
		}, []),
		["hover"],
	);
	return (
		<div className="chatroom">
			<Drawer
				visible={configDrawerVisible}
				size="40vw"
				header="OpenAI Config"
				footer={null}
				onClose={() => {
					setConfigDrawerVisible(false);
					createOpenAI();
					localStorage.setItem(
						"openai-config",
						JSON.stringify(config),
					);
				}}
			>
				<div className="config">
					<div className="config-item">
						<label>API Key</label>
						<Input
							value={config.apiKey}
							onChange={(v) =>
								setConfig((old) => ({ ...old, apiKey: v }))
							}
						/>
					</div>
					<div className="config-item">
						<label>Base URL</label>
						<Select
							filterable
							creatable
							options={[
								{
									label: "OpenAI",
									value: "https://api.openai.com/v1",
								},
								{
									label: "AIProxy",
									value: "https://api.aiproxy.io/v1",
								},
							]}
							value={config.baseURL ?? ""}
							onChange={(v) =>
								setConfig((old) => ({
									...old,
									baseURL: v as string,
								}))
							}
						/>
					</div>
				</div>
			</Drawer>
			<div className="header">
				<div className="left">
					<div className="title">Shikitor Chatroom</div>
				</div>
				<div className="right">
					<Popconfirm
						placement="bottom-right"
						content="Are you sure to clear all messages?"
						popupProps={{
							popperOptions: {
								modifiers: [
									{
										name: "offset",
										options: { offset: [-4, -14] },
									},
								],
							},
						}}
						onConfirm={() => {
							setMessages([]);
							localStorage.removeItem("openai-config");
						}}
					>
						<Button
							variant="text"
							shape="square"
							disabled={messages.length === 0}
						>
							<span className="shikitor-icon">
								delete_forever
							</span>
						</Button>
					</Popconfirm>
					<Button
						variant="text"
						shape="square"
						onClick={() => setConfigDrawerVisible(true)}
					>
						<span className="shikitor-icon">settings</span>
					</Button>
				</div>
			</div>
			<div className="messages">
				{messages.map((message, i) => (
					<Message
						key={i}
						value={message}
						textRender={(text) => (
							<div className="message-text">
								<div
									className="s-md"
									dangerouslySetInnerHTML={{
										__html:
											mdRef.current?.render(text) ?? "",
									}}
								/>
							</div>
						)}
					/>
				))}
				{messages.length === 0 && (
					<>
						{!config.apiKey || !config.baseURL ? (
							<div className="not-initialized">
								Not initialized OpenAI config, please
								<Link
									theme="primary"
									onClick={() => setConfigDrawerVisible(true)}
								>
									&nbsp;
									<span className="shikitor-icon">
										settings
									</span>
									set it&nbsp;
								</Link>
								up first
							</div>
						) : (
							<div className="initialized"></div>
						)}
					</>
				)}
			</div>
			<div className="message-sender">
				<Avatar size="small">YiJie</Avatar>
				<WithoutCoreEditor
					//@ts-ignore
					ref={shikitorRef}
					//@ts-ignore
					create={shikitorCreate}
					value={text}
					onChange={setText}
					options={useMemo(
						() => ({
							theme,
							language: "markdown",
							lineNumbers: "off",
							placeholder: "Typing here...",
							autoSize: { maxRows: 10 },
						}),
						[theme],
					)}
					//@ts-ignore
					plugins={bundledPlugins}
					onColorChange={setColor}
					//@ts-ignore
					onMounted={(shikitor) => shikitor.focus()}
					//@ts-ignore
					onKeydown={(e) => {
						if (
							e.key === "Enter" &&
							e.metaKey &&
							text.length !== 0
						) {
							e.preventDefault();
							sendMessage(text);
							return;
						}
					}}
				/>
				<div className="send-tooltip">
					<kbd>⌘ enter</kbd>
				</div>
			</div>
		</div>
	);
}
