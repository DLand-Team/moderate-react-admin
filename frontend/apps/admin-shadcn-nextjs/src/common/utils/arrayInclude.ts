const arrayInclude = (arr: any[], val: any, key: string): boolean => {
  return arr.some((item: any) => item[key] === val);
};

export default arrayInclude;
