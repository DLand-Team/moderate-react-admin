import devHelper from "@/helper/devHelper";

const addStoreHr = async (ctx) => {
  const { name } = ctx.request.body;
  devHelper.toRegistStore(name);
  devHelper.toBuildStore(name);
  ctx.response.body = {
    status: 1,
    code: "200",
    data: {},
  };
};

export default addStoreHr;
