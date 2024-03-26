import devHelper from "@/helper/devHelper";

const addApiHr = async (ctx) => {
	const { name } = ctx.request.body; //获取post提交的数据
	devHelper.toRegistApi(name);
	devHelper.toBuildApi(name);
	ctx.response.body = {
		status: 1,
		code: "200",
		data: {},
	};
};

export default addApiHr;
