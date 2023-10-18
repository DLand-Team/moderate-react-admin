import devHelper from "@/helper/devHelper";

const addPageHandler = async (ctx) => {
	const { name, path } = ctx.request.body; //获取post提交的数据
	let pathNew = `.${path}`;
	const newItem = {
		id: name,
		meta: {
			title: name,
		},
		component: devHelper.capitalizeFirstLetter(name),
		isMustShow: true,
	};
	devHelper.toRegistePage(newItem, pathNew, name);
	devHelper.toBuildPage(pathNew, name);
	ctx.response.body = {
		status: 1,
		code: "200",
		data: {},
	};
};

export default addPageHandler;
