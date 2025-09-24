import { RefObject, useEffect, useRef } from "react";
import { GuideIns } from "./useGuide";

export function useGuideRef() {
  const guideInsRef = useRef<GuideIns>(null);
  const pendingCalls = useRef<Function[]>([]);
  const handler = {
    get(target: any, prop: string) {
      if (prop === "current" && !target[prop]) {
        return new Proxy(
          {},
          {
            get(_, method: string) {
              return (...args: any[]) => {
                pendingCalls.current.push(() => target[prop][method](...args));
              };
            },
          },
        );
      }
      return target[prop];
    },
  };

  const guideIns = new Proxy(guideInsRef, handler);

  const calls = () => {
    pendingCalls.current.forEach((call) => call());
    pendingCalls.current.length = 0; // 清空已执行的调用
  };

  useEffect(() => {
    if (!guideInsRef.current) {
      setTimeout(() => {
        calls();
      }, 1000);
    }
  }, [guideInsRef.current]);

  return guideIns as RefObject<GuideIns>;
}
