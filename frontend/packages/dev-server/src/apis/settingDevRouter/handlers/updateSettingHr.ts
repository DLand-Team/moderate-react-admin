import devHelper from "@/helper/devHelper";
import pathHelper from "@/helper/pathHelper";
import fs from "fs";

const updateSettingHr = async (ctx) => {
	const data = ctx.request.body;
	fs.writeFileSync(
		pathHelper.webSettingPath,
		devHelper.toFromat(JSON.stringify(data), {
			parser: "json",
		}),
	);
	ctx.response.body = {
		status: 1,
		code: "200",
		data: {
			code: "200",
		},
	};
};

export default updateSettingHr;
