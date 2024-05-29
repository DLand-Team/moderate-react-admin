import { dp } from "src/service";
import { createThunks } from "../../setup";
import names from "../names";
import httpApi from "./api";
import { QueryListParams } from "./model";

const thunks = createThunks(names.userStore, {
	queryListAct: async (params: QueryListParams) => {
		const data = await httpApi.queryList(params);
		dp("userStore", "setUserList", { list: data, total: data.length });
	},
});
export default thunks;
