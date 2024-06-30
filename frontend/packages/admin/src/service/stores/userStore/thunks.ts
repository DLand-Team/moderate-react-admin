import { createThunks } from "src/service/setup";

const thunks = createThunks("userStore", {
	queryListAct: async (_: null) => {},
});
export default thunks;
