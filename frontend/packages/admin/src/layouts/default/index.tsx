import { Layout } from "antd";
import styles from "./index.module.scss";
import MainContent from "./mainContent";
import NavHeader from "./navHeader";
import SliderMenu from "./sliderMenu";

export const DefaultLayout = ({
	children,
	...rest
}: React.PropsWithChildren) => {
	return (
		<Layout className={styles.content} {...rest}>
			<SliderMenu />
			<Layout>
				<NavHeader />
				<Layout>
					<MainContent>{children}</MainContent>
				</Layout>
			</Layout>
		</Layout>
	);
};
