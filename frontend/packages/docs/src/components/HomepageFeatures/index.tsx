import clsx from "clsx";
//@ts-ignore
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

type FeatureItem = {
	title: string;
	Svg: string;
	description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
	{
		title: "简约&类型",
		Svg: require("@site/static/img/icon3.png").default,
		description: (
			<>
				Redux Eazy 是一个简单易用、TypeScript 类型支持强大的 Redux
				整合方案
			</>
		),
	},
	{
		title: "聚焦&解耦",
		Svg: require("@site/static/img/icon2.png").default,
		description: (
			<>
				聚焦业务场景，打通开发任务流转环节，提高开发效率，降低业务耦合度，方便迭代重构
			</>
		),
	},
	{
		title: "整合&优化",
		Svg: require("@site/static/img/icon1.png").default,
		description: (
			<>整合完整的Redux生态，简化环节，优化使用体验，扩展更多实用功能。</>
		),
	},
];

function Feature({ title, Svg, description }: FeatureItem) {
	return (
		<div
			className={clsx("col col--4 ")}
			style={{
				marginBottom: "12px",
			}}
		>
			<div className={styles.card}>
				<div className="text--center">
					<img src={Svg} className={styles.featureSvg} role="img" />
				</div>
				<div className="text--center padding-horiz--md">
					<Heading as="h3">{title}</Heading>
					<p>{description}</p>
				</div>
			</div>
		</div>
	);
}

export default function HomepageFeatures(): JSX.Element {
	return (
		<section className={styles.features}>
			<div className="container">
				<div className="row">
					{FeatureList.map((props, idx) => (
						<Feature key={idx} {...props} />
					))}
				</div>
			</div>
		</section>
	);
}
