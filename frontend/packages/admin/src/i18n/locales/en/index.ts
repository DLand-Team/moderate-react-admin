import dev from "./dev.json";
import app from "./app.json";
import rule from "./rule.json";
import pos from "./pos.json";
import pluginsResourcesEn from "plugins/config/i18n/locales/en";
import common from "./common.json";
const resourcesEn = {
	dev,
	app,
	rule,
	pos,
	common,
	...pluginsResourcesEn,
};
export default resourcesEn;
