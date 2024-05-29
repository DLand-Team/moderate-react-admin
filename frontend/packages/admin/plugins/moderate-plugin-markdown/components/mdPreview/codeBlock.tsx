import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import * as themes from "react-syntax-highlighter/dist/esm/styles/prism";
import { customImg } from "./customRender/index";

// 生成在一个范围内的随机数
let defaultTheme = themes.materialDark;

const components: any = () => {
	return {
		code({ node, inline, className, children, ...props }: any) {
			let theme = defaultTheme;
			const match = /language-(\w+)/.exec(className || "");
			return (!inline && match) ||
				String(children).split("\n").length > 1 ? (
				<SyntaxHighlighter
					style={{ ...theme, whiteSpace: "pre-wrap" }}
					PreTag="div"
					children={String(children).replace(/\n$/, "")}
					{...props}
				/>
			) : (
				<code className={className} {...props}>
					{children[0]}
				</code>
			);
		},
		img: customImg,
		describe: () => {
			return <div></div>;
		},
	};
};
export default components;
