import devHelper from "@/helper/devHelper";
import { v4 as uuidv4 } from "uuid";

const getApiListHr = async (ctx) => {
	const { name } = ctx.request.body; //获取post提交的数据
	const matches = devHelper.getApiList(name);
	ctx.response.body = {
		status: 1,
		code: "200",
		data: {
			list: matches.map((item) => {
				return {
					id: uuidv4(),
					name: item,
				};
			}),
		},
	};
};

export default getApiListHr;
