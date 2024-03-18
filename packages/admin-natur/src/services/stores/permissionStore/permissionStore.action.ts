import { RoutesStructDataItem } from "@/config/types";
import { permissionHelper } from "@/services";

const actions = {
	createPermissionTree: (routesData: RoutesStructDataItem[]) => {
		let permissionTreeData = [];
		permissionHelper.createPermissionByRoutesLoop(
			routesData,
			permissionTreeData,
		);
		return {
			permissionTreeData,
		};
	},
};

export default actions;
