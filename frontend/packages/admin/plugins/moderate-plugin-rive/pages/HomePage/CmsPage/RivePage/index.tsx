import { Alignment, Fit, Layout, useRive } from "@rive-app/react-canvas";
import "./styles.css";
import { UUID } from "src/common/utils";
import { RiveNode } from "plugins/moderate-plugin-rive/common/components/riveNode";

export const RiveDemo = () => {
	const { RiveComponent } = useRive({
		// Load a local riv `clean_the_car.riv` or upload your own!
		src: "clean_the_car.riv",
		// Be sure to specify the correct state machine (or animation) name
		stateMachines: "Motion",
		// This is optional.Provides additional layout control.
		layout: new Layout({
			fit: Fit.FitWidth, // Change to: rive.Fit.Contain, or Cover
			alignment: Alignment.Center,
		}),
		autoplay: true,
	});

	return <RiveComponent />;
};

// Another example loading a Rive file from a URL
export default function RivePage() {
	return (
		<div className="RiveContainer" key={UUID()}>
			<RiveNode
				options={{
					// This is optional.Provides additional layout control.
					layout: new Layout({
						fit: Fit.Cover, // Change to: rive.Fit.Contain, or Cover
						alignment: Alignment.Center,
					}),
					autoplay: true,
				}}
				url="https://cdn.rive.app/animations/vehicles.riv"
			/>
		</div>
	);
}
