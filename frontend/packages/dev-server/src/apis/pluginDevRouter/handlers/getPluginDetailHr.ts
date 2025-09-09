import { request } from "@/utils/request";

const getPageListApiHr = async (ctx) => {
  const { url } = ctx.request.body; //获取post提交的数据
  const detail = await request.get<any, string>(
    `${url.replace(".git", "")}/raw/master/readme.md`,
  );

  ctx.response.body = {
    status: 1,
    code: "200",
    data: {
      code: "200",
      content: detail,
    },
  };
};

export default getPageListApiHr;
