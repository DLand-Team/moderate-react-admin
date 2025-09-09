import devHelper from "@/helper/devHelper";
import { v4 as uuidv4 } from "uuid";

const getStoreApiHr = async (ctx) => {
  const { name } = ctx.request.body;
  const matches = devHelper.getStoreList(name);
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

export default getStoreApiHr;
