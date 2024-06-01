import { Alignment, Fit, Layout } from "@rive-app/react-canvas";
import { RiveAni } from "plugins/moderate-plugin-rive/common/components/riveAni";
import LoginCard from "./loginCard";
import LoginForm from "./loginForm";
import styles from "./loginPage.module.scss";

const LoginPage = () => {
	return (
		<div className={styles.content}>
			<LoginCard>
				<LoginForm />
			</LoginCard>
			<div
				style={{
					flex: 1,
				}}
			>
				{/* <RiveAni
					options={{
						// This is optional.Provides additional layout control.
						layout: new Layout({
							fit: Fit.Cover, // Change to: rive.Fit.Contain, or Cover
							alignment: Alignment.TopRight,
						}),
						autoplay: true,
						stateMachines: "Motion",
						automaticallyHandleEvents: true,
						animations: ["Water", "butterfly"],
					}}
					// url="https://cdn.rive.app/animations/vehicles.riv"
					// url="https://public.rive.app/community/runtime-files/3293-6929-spring-demo.riv"
					url="https://public.rive.app/community/runtime-files/3188-6721-superman.riv"
				/> */}
				{/* <RiveAni
					options={{
						// This is optional.Provides additional layout control.
						layout: new Layout({
							fit: Fit.Cover, // Change to: rive.Fit.Contain, or Cover
						}),
						autoplay: true,
						automaticallyHandleEvents: true,
					}}
					// url="https://cdn.rive.app/animations/vehicles.riv"
					// url="https://public.rive.app/community/runtime-files/3293-6929-spring-demo.riv"
					url="https://public.rive.app/community/runtime-files/3188-6721-superman.riv"
				/> */}
				<RiveAni
					options={{
						// This is optional.Provides additional layout control.
						layout: new Layout({
							fit: Fit.Cover, // Change to: rive.Fit.Contain, or Cover
						}),
						autoplay: true,
						automaticallyHandleEvents: true,
					}}
					// url="https://cdn.rive.app/animations/vehicles.riv"
					// url="https://public.rive.app/community/runtime-files/3293-6929-spring-demo.riv"
					url="/beach_icon.riv"
				/>
			</div>
		</div>
	);
};

export default LoginPage;
