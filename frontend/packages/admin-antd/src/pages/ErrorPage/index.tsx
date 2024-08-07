import { Button, Result } from "antd";
import React from "react";
import { ROUTE_ID } from "src/router";
import { routerHelper, useFlat } from "src/service";
import { useTranslation } from "react-i18next";


const ErrPage: React.FC = () => {
	const { routesPermissions } = useFlat("authStore");
	const { t } = useTranslation(["errorPage"]);
	return (
		<>
			{routesPermissions && (
				<Result
					status="404"
					title="404"

					subTitle={t`error.url`}
					extra={
						<Button
							onClick={() => {

								routerHelper.jumpTo(ROUTE_ID.HelloPage);
							}}
							type="primary"
						>

							{t`error.home`}
						</Button>
					}
				/>
			)}
		</>
	);
};
export default ErrPage;
