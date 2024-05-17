import { Button } from "antd";
import { AppHelper } from "src/service/helper/appHelper";
import { RolePage } from "src/pages";
import { Suspense } from "react";

const WinboxPage = () => {
	return (
		<div>
			<Button
				onClick={() => {
					AppHelper.addWinbox({
						content: (
							<Suspense>
								<RolePage />
							</Suspense>
						),
					});
				}}
			>
				Show winbox
			</Button>
		</div>
	);
};

export default WinboxPage;
