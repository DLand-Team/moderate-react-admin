import { ArrowRightOutlined } from "@ant-design/icons";
import { Card, Tag, Typography } from "antd";
import {
	CSSProperties,
	MutableRefObject,
	useEffect,
	useRef,
	useState,
} from "react";
import { useIsMobile } from "src/common/hooks";
const BtnItem = ({
	title,
	desc,
	tag = [],
	logo,
	logoStyle = {},
	url,
}: {
	logo: string;
	title: string;
	desc: React.ReactNode;
	tag: string[];
	logoStyle?: CSSProperties;
	url?: string;
}) => {
	const [isHover, setIsHover] = useState(false);
	return (
		<Card
			hoverable
			onMouseEnter={() => setIsHover(true)}
			onMouseLeave={() => setIsHover(false)}
			style={{
				marginLeft: "1px",
				width: "100%",
				minHeight: "198px",
				borderRadius: "24px",
			}}
			onClick={() => {
				url && window.open(url, "_blank");
			}}
		>
			<div
				style={{
					display: "flex",
					width: "100%",
					height: "100%",
				}}
			>
				<div
					style={{
						height: "100%",
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						textAlign: "left",
					}}
				>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							marginBottom: "12px",
						}}
					>
						{logo && (
							<img
								style={{
									width: "46px",
									height: "46px",
									marginRight: "6px",
									...logoStyle,
								}}
								src={logo}
								alt={logo}
							/>
						)}
						<Typography
							style={{
								fontSize: "24px",
								fontWeight: "475",
							}}
						>
							{title}
						</Typography>
					</div>

					<div
						style={{
							marginBottom: "12px",
						}}
					>
						{tag.map((item, key) => {
							return <Tag key={key}>{item}</Tag>;
						})}
					</div>
					<Typography
						style={{
							fontSize: "16px",
							fontWeight: "400",
							whiteSpace: "wrap",
						}}
					>
						{desc}
					</Typography>
				</div>

				<div
					style={{
						position: "absolute",
						top: "25px",
						right: "20px",
					}}
				>
					<div
						style={{
							position: "relative",
							width: "40px",
							height: "40px",
						}}
					>
						<svg
							_ngcontent-pwx-c15=""
							width="100%"
							height="100%"
							viewBox="0 0 40 40"
							xmlns="http://www.w3.org/2000/svg"
							style={{
								transition: "all cubic-bezier(.4,0,.2,1) .25s",
							}}
						>
							<path
								_ngcontent-pwx-c15=""
								d="M.887 14.467C-2.845 5.875 5.875-2.845 14.467.887l1.42.617a10.323 10.323 0 0 0 8.225 0l1.42-.617c8.593-3.732 17.313 4.988 13.581 13.58l-.617 1.42a10.323 10.323 0 0 0 0 8.225l.617 1.42c3.732 8.593-4.989 17.313-13.58 13.581l-1.42-.617a10.323 10.323 0 0 0-8.225 0l-1.42.617C5.874 42.845-2.846 34.125.886 25.533l.617-1.42a10.323 10.323 0 0 0 0-8.225l-.617-1.42Z"
								fill={isHover ? "#00639b" : "#fff"}
								style={{
									transition:
										"fill .3s cubic-bezier(.2,0,0,1)",
								}}
							></path>
						</svg>
						<ArrowRightOutlined
							style={{
								position: "absolute",
								left: "9px",
								top: "9px",
								fontSize: "20px",
							}}
							color={isHover ? "#fff" : "rgb(68, 71, 70)"}
						/>
					</div>
				</div>
			</div>
		</Card>
	);
};
export const Info = ({
	containerRef,
}: {
	containerRef: MutableRefObject<HTMLElement | undefined>;
}) => {
	const [maxHeight, setTableHeight] = useState(0);
	useEffect(() => {
		if (containerRef.current) {
			const height = containerRef.current.clientHeight;
			setTableHeight(height);
		}

		const resizeObserver = new ResizeObserver((entries) => {
			for (const entry of entries) {
				if (entry.target === containerRef.current) {
					setTableHeight(containerRef.current.clientHeight);
				}
			}
		});

		if (containerRef.current) {
			resizeObserver.observe(containerRef.current);
		}

		return () => {
			if (containerRef.current) {
				resizeObserver.unobserve(containerRef.current);
			}
		};
	}, []);

	const isMobile = useIsMobile();
	const ref1 = useRef<HTMLDivElement>(null);
	const ref2 = useRef<HTMLDivElement>(null);
	const ref3 = useRef<HTMLDivElement>(null);
	const ref4 = useRef<HTMLDivElement>(null);
	const [step, setStep] = useState(1);
	function isInViewPortOfTwo(el: HTMLElement, height: number) {
		const rect = el.getBoundingClientRect();
		if (rect.top < height && rect.bottom > 0) {
			return true;
		} else {
			return false;
		}
	}
	const checkElementVisibility = () => {
		const flag1 =
			ref1.current &&
			isInViewPortOfTwo(
				ref1.current,
				containerRef.current?.clientHeight!,
			);
		const flag2 =
			ref2.current &&
			isInViewPortOfTwo(
				ref2.current,
				containerRef.current?.clientHeight!,
			);
		const flag3 =
			ref3.current &&
			isInViewPortOfTwo(
				ref3.current,
				containerRef.current?.clientHeight!,
			);
		const flag4 =
			ref4.current &&
			isInViewPortOfTwo(
				ref4.current,
				containerRef.current?.clientHeight!,
			);
		if (flag2) {
			setStep(2);
		} else if (flag3) {
			setStep(3);
		} else if (flag4) {
			setStep(4);
		} else if (flag1) {
			setStep(1);
		}
	};

	useEffect(() => {
		containerRef.current!?.addEventListener(
			"scroll",
			checkElementVisibility,
		);
	}, []);
	return (
		<div
			style={{
				display: "flex",
			}}
		>
			<div
				style={{
					flex: 1,
					padding: "0 20px",
				}}
			>
				<div
					style={{
						width: "100%",
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						marginTop: isMobile ? "36px" : "200px",
						margin: "24px 0px",
					}}
				>
					<Typography
						ref={ref1}
						style={{
							fontWeight: "475",
							fontSize: "57px",
							marginBottom: "20px",
						}}
					>
						Dland生态
					</Typography>

					<Typography
						style={{
							fontSize: "16px",
							marginBottom: "20px",
							fontWeight: "bold",
						}}
					>
						整个生态是对”搬砖“这件事儿，不断思考，进而生发的。
					</Typography>
					<Typography
						style={{
							fontSize: "16px",
							marginBottom: "20px",
							fontWeight: "bold",
						}}
					>
						从平凡处着眼问题，设计出可以深层次解决问题的方案。
					</Typography>
					<Typography
						style={{
							fontSize: "16px",
							fontWeight: "bold",
						}}
					>
						打通搬砖各环节，为摸鱼事业不遗余力提供强力支持。
					</Typography>
					<div
						style={{
							gap: "24px",
							marginTop: "40px",
							display: "flex",
							flexDirection: "column",
							width: "100%",
							paddingLeft: 3,
						}}
					>
						<BtnItem
							title="Redux Eazy"
							desc="基于Redux设计出的一套极简体验的状态管理模式，“易”体系中的核心"
							tag={[
								"爽快的Ts类型支持",
								"同步迭代的配套文档",
								"SSR和CSR全支持",
								"已投产Nexjs、Admin和公众号h5",
							]}
							logo="/mui-eazy.svg"
							url="https://dland-team.github.io/redux-eazy/"
						/>
						<BtnItem
							desc={
								<>
									基于
									<Typography.Link href={"https://mui.com/"}>
										Mui
									</Typography.Link>
									打造的Pro组件库，提供轻便的高级组件，并支持动态加载和主题定制。
								</>
							}
							tag={[
								"灵活&简洁的表单",
								"同步迭代的文档",
								"SSR和CSR全支持",
								"已投产Nexjs、Admin",
							]}
							logo="/redux-eazy-logo.png"
							title="Mui Eazy"
							url="https://dland-core.github.io/mui-eazy/"
						/>
						<BtnItem
							title="DevServer Eazy"
							tag={[
								"约定式路由",
								"生成代码",
								"插件系统",
								"快捷设置",
								"打包剔除，仅开发",
							]}
							desc="基于Koa+Ts打造的开发工具，运用NodeJs能力为开发提供助力，方便扩展维护。"
							logo={"/devserver.svg"}
							logoStyle={{
								width: "35px",
								margin: "0px 10px 0 6px",
							}}
							url="https://github.com/DLand-Team/moderate-react-admin/tree/master/frontend/packages/dev-server"
						/>
					</div>
				</div>
				<div
					style={{
						width: "100%",
						display: "flex",
						justifyContent: "center",
					}}
				>
					<svg
						_ngcontent-pwx-c25=""
						aria-hidden="true"
						width="155"
						height="9"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						style={{
							margin: "80px 0px",
						}}
					>
						<path
							_ngcontent-pwx-c25=""
							d="M1.5 4.5c5.067-4.667 10.133-4.667 15.2 0s10.133 4.667 15.2 0 10.133-4.667 15.2 0 10.133 4.667 15.2 0 10.133-4.667 15.2 0 10.133 4.667 15.2 0 10.133-4.667 15.2 0 10.133 4.667 15.2 0 10.133-4.667 15.2 0 10.133 4.667 15.2 0"
							stroke="#a8c7fa"
							strokeWidth="2"
							strokeLinecap="round"
						></path>
					</svg>
				</div>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<div
						ref={ref2}
						style={{
							width: "100%",
							margin: "24px 0px",
						}}
					>
						<Typography
							style={{
								fontWeight: "475",
								fontSize: "57px",
								marginBottom: "20px",
							}}
						>
							主题随心配
						</Typography>
					</div>
					<Typography.Title level={1}>明</Typography.Title>
					<div
						style={{
							gap: "24px",
							marginTop: "40px",
							display: "flex",
							flexDirection: "column",
							width: "100%",
						}}
					>
						<BtnItem title="月光" desc="" tag={[]} logo="" />
						<BtnItem logo="" desc={""} tag={[]} title="阳光" />
					</div>
				</div>
				<div
					style={{
						width: "100%",
						display: "flex",
						justifyContent: "center",
					}}
				>
					<svg
						_ngcontent-pwx-c25=""
						aria-hidden="true"
						width="155"
						height="9"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						style={{
							margin: "80px 0px",
						}}
					>
						<path
							_ngcontent-pwx-c25=""
							d="M1.5 4.5c5.067-4.667 10.133-4.667 15.2 0s10.133 4.667 15.2 0 10.133-4.667 15.2 0 10.133 4.667 15.2 0 10.133-4.667 15.2 0 10.133 4.667 15.2 0 10.133-4.667 15.2 0 10.133 4.667 15.2 0 10.133-4.667 15.2 0 10.133 4.667 15.2 0"
							stroke="#a8c7fa"
							strokeWidth="2"
							strokeLinecap="round"
						></path>
					</svg>
				</div>
				<div
					style={{
						width: "100%",
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<div
						ref={ref3}
						style={{
							width: "100%",
							margin: "24px 0px",
						}}
					>
						<Typography
							style={{
								fontWeight: "475",
								fontSize: "57px",
								marginBottom: "20px",
							}}
						>
							闲D岛社区
						</Typography>
						<Typography
							style={{
								fontSize: "16px",
								fontWeight: "400",
								marginBottom: "20px",
							}}
						>
							QQ群
						</Typography>
						<Typography
							style={{
								fontSize: "16px",
								fontWeight: "400",
							}}
						>
							Discord
						</Typography>
						<div
							style={{
								gap: "24px",
								marginTop: "40px",
								display: "flex",
								flexDirection: "column",
								width: "100%",
							}}
						>
							<BtnItem title="QQ群" desc="" tag={[]} logo="" />
							<BtnItem
								logo=""
								desc={""}
								tag={[]}
								title="Discord"
								url="https://discord.gg/pA5xvehD4G"
							/>
						</div>
					</div>
				</div>
				<div
					style={{
						width: "100%",
						display: "flex",
						justifyContent: "center",
					}}
				>
					<svg
						_ngcontent-pwx-c25=""
						aria-hidden="true"
						width="155"
						height="9"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						style={{
							margin: "80px 0px",
						}}
					>
						<path
							_ngcontent-pwx-c25=""
							d="M1.5 4.5c5.067-4.667 10.133-4.667 15.2 0s10.133 4.667 15.2 0 10.133-4.667 15.2 0 10.133 4.667 15.2 0 10.133-4.667 15.2 0 10.133 4.667 15.2 0 10.133-4.667 15.2 0 10.133 4.667 15.2 0 10.133-4.667 15.2 0 10.133 4.667 15.2 0"
							stroke="#a8c7fa"
							strokeWidth="2"
							strokeLinecap="round"
						></path>
					</svg>
				</div>
			</div>
			{!isMobile && (
				<div
					style={{
						position: "sticky",
						top: 0,
						height: maxHeight,
						flex: 1,
						marginLeft: "12px",
					}}
				>
					<div
						style={{
							position: "absolute",
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							width: "100%",
							height: "100%",
							borderRadius: "24px",
							backgroundPosition: "center",
							objectFit: "cover",
							transform: "translateZ(0)",
							transition: "opacity .5s cubic-bezier(.2,0,0,1)",
							opacity: step == 1 ? 1 : 0,
							overflow: "hidden",
							justifyContent: "center",
						}}
					>
						<img
							style={{
								height: "100%",
							}}
							src={"/bg_group1.png"}
						/>
						<img
							style={{
								position: "absolute",
							}}
							src={"/eazy.png"}
						/>
					</div>
					<img
						style={{
							position: "absolute",
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							width: "100%",
							height: "100%",
							borderRadius: "24px",
							backgroundPosition: "center",
							objectFit: "cover",
							opacity: step == 2 ? 1 : 0,
							transform: "translateZ(0)",
							transition: "opacity .5s cubic-bezier(.2,0,0,1)",
						}}
						src="/Group 183.png"
					/>
					<img
						style={{
							position: "absolute",
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							width: "100%",
							height: "100%",
							borderRadius: "24px",
							backgroundPosition: "center",
							objectFit: "cover",
							opacity: step == 3 ? 1 : 0,
							transform: "translateZ(0)",
							transition: "opacity .5s cubic-bezier(.2,0,0,1)",
						}}
						src="/Group 184.png"
					/>
				</div>
			)}
		</div>
	);
};
