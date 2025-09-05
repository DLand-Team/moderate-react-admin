import { Fit, Layout } from "@rive-app/react-canvas";
import { RiveAni } from "plugins/moderate-plugin-rive/common/components/riveAni";
import { useIsMobile } from "src/common/hooks";
import LoginCard from "./loginCard";
import LoginForm from "./loginForm";
import styles from "./loginPage.module.scss";

const LoginPage = () => {
	const isMobile = useIsMobile();
	return (
		<div className={styles.content}>
			<LoginCard>
				<LoginForm />
			</LoginCard>
			{!isMobile && (
				<div
					style={{
						flex: 1,
					}}
				>
					<RiveAni
						options={{
							// This is optional.Provides additional layout control.
							layout: new Layout({
								fit: Fit.Cover, // Change to: rive.Fit.Contain, or Cover
							}),
							autoplay: true,
							automaticallyHandleEvents: true,
						}}
						url="/beach_icon.riv"
					/>
				</div>
			)}
		</div>
	);
};

export default LoginPage;
