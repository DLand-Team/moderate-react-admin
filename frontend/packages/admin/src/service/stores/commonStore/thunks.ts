/* Instruments */
import { dp } from "src/service";
import { createThunks } from "src/service/setup";
import httpApi from "./api";

const thunks = createThunks("commonStore", {
  getLocationListAct: async () => {
    const { data } = await httpApi.getLocationListApi();
    dp("commonStore", "setLocaionList", data);
  },
});
export default thunks;
