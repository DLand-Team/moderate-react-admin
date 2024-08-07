import { useReducer } from "react";

const useForceUpdate = () => {
    return useReducer((bool: any) => !bool, true)[1]; // 强制渲染
};

export default useForceUpdate;
