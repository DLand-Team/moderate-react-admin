import { CSSProperties, PropsWithChildren, useEffect, useRef } from "react";
import { useGuideContext } from "./guideCoreProvider";

export const GuideHook = <T extends string = any>(
  props: PropsWithChildren<{ readyId: T; style?: CSSProperties }>,
) => {
  const { children, readyId } = props;
  const { readyList, setReadyList } = useGuideContext<T>();
  useEffect(() => {
    if (readyList[readyId]) {
      return;
    }
    setReadyList((prevState) => ({
      ...prevState,
      [readyId]: true,
    }));
    if (ref.current && ref.current.parentElement) {
      ref.current.parentElement.id = readyId as string;
    }
  }, []);

  const ref = useRef<HTMLDivElement>(null);
  return <div ref={ref}>{children}</div>;
};
