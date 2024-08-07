import { createThunks } from "src/service";

const thunks = createThunks("userStore", {
	queryListAct: async (_: null) => {},
});
export default thunks;
