export const safeParse = (json: string): Record<string, any> => {
  try {
    return JSON.parse(json);
  } catch (error) {
    return {};
  }
};

export const safeGet = (obj: any, keyChain: string, defaultVal?: any): any => {
  if (typeof obj !== 'object' || obj === null) {
    return defaultVal;
  }

  let val = obj;
  const keys = keyChain.split('.');
  for (const key of keys) {
    if (val[key] === undefined) {
      return defaultVal;
    } else {
      val = val[key];
    }
  }

  return val;
};

export const executeScript = (code: string, type = 'module') => {
  const script = document.createElement('script');
  script.type = type;
  script.text = code;
  document.body.appendChild(script);
};
