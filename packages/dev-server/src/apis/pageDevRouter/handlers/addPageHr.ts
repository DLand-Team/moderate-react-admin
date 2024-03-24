import devHelper from "@/helper/devHelper";

const addPageHandler = async (ctx) => {
	const {
		name,
		path,
		isNoAuth,
		isOutlet = false,
		index = false,
		depands,
	} = ctx.request.body; //获取post提交的数据
	let pathNew = `.${path}`;
	const newItem: any = {
		id: name,
		meta: {
			title: name,
		},
		component: devHelper.capitalizeFirstLetter(name),
		isNoAuth,
		index,
	};
	if (depands) {
		newItem.depands = [depands.split("/").slice(-1)[0]];
	}
	devHelper.toRegistePage(newItem, pathNew, name);
	devHelper.toBuildPage({ pagePath: pathNew, pageName: name, isOutlet });
	ctx.response.body = {
		status: 1,
		code: "200",
		data: {},
	};
};

export default addPageHandler;
