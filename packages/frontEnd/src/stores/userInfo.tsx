const userInfo = {
  // 存放数据
  state: {
    number: 0,
  },
  // state的映射
  maps: {
    isEven: ["number", (number) => number % 2 === 0],
  },
  // actions用来修改state
  actions: {
    inc: (number) => ({ number: number + 1 }),
    dec: (number) => ({ number: number - 1 }),
  },
};

export default userInfo;
