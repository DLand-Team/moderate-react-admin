import { h } from "hastscript";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import gfm from "remark-gfm";
import codeBlock from "./codeBlock";
import styles from "./index.module.scss";
import rehypeComponents from "rehype-components";
import { PropsWithChildren } from "react";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";

const DocumentationPage = (properties: any, children: any) =>
	h("article.documentation", [h("button", properties.title), ...children]);

export function MdPreview({ children }: PropsWithChildren) {
	return (
		<ReactMarkdown
			className={styles.markdown_body}
			rehypePlugins={[
				rehypeKatex,
				rehypeRaw,
				[
					rehypeComponents,
					{
						components: {
							"info-box": DocumentationPage,
						},
					},
				],
			]}
			children={children as string}
			remarkPlugins={[gfm, remarkMath]}
			components={{ ...codeBlock() }}
		></ReactMarkdown>
	);
}
