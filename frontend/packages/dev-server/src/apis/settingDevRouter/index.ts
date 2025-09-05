const Router = require("koa-router");
import { updateSettingHr } from "./handlers";
const settingDevRouter = new Router({ prefix: "/settingDev" });

// 更新设置
settingDevRouter.post("/updateSetting", updateSettingHr);

export default settingDevRouter;
