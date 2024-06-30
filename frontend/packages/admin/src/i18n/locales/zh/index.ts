import dev from "./dev.json";
import app from "./app.json";
import rule from "./rule.json";
import pos from "./pos.json";
import pluginsResourcesZh from "plugins/config/i18n/locales/zh";
const resourcesZh = {
	dev,
	app,
	rule,
	pos,
	...pluginsResourcesZh,
};
export default resourcesZh;
