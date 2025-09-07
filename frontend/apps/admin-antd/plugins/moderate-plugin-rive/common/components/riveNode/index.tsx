import { RiveParameters, useRive } from "@rive-app/react-canvas";
import { useEffect } from "react";

export const RiveNode = ({
	url,
	options = {} as any,
}: {
	url: string;
	options?: Partial<RiveParameters>;
}) => {
	const { RiveComponent, rive } = useRive({
		src: url,
		...options,
		autoplay: true,
	});
	useEffect(() => {
		const timer = setInterval(() => {
			rive?.reset();
			rive?.play();
		}, 1000);
		return () => {
			clearInterval(timer);
		};
	}, [rive]);
	return (
		<RiveComponent
			onClick={() => {
				rive?.reset();
				rive?.play();
			}}
		/>
	);
};
