import { theme } from "antd";
import {
  MutableRefObject,
  RefObject,
  memo,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import WinBox, { WinBoxPropType } from "react-winbox";
import { reduxStore, routerHelper } from "src/service";
import "winbox/dist/css/themes/white.min.css"; // optional
import "winbox/dist/css/winbox.min.css";
import "./index.scss";

export interface WinBoxModalProps {
  id: string | number;
  type?: string;
  handleClose: (
    force: boolean,
    id: string | number,
  ) => ReturnType<Required<WinBoxPropType>["onClose"]>;
  children?: WinBoxPropType["children"];
  winBoxMapRef: MutableRefObject<Record<PropertyKey, RefObject<WinBox>>>;
}

function WinBoxModal({
  handleClose,
  children,
  id,
  winBoxMapRef,
  type,
}: WinBoxModalProps) {
  const ref = useRef<WinBox>(null);
  const pos_x = useMemo(() => {
    return reduxStore.getState().appStore.winPosTemp.x;
  }, []);
  const pos_y = useMemo(() => {
    return reduxStore.getState().appStore.winPosTemp.y;
  }, []);
  const winBoxTitle = useMemo(() => {
    return reduxStore.getState().appStore.winBoxTitleTemp;
  }, []);
  // const [top] = useState(120);
  // const [left] = useState(260);
  // const [theme] = useState("modern");
  const [icon] = useState("");
  // const [icons] = useState(type == "page" ? [0] : []);
  const [noMin] = useState(false);
  const [noMax] = useState(false);
  const [noFull] = useState(false);
  const [noClose] = useState(false);
  const hide = useState(false);
  const isFocus = useState(false);
  const position = useState<ReturnType<WinBox["getPosition"]>>(undefined);
  const size = useState<ReturnType<WinBox["getSize"]>>(undefined);
  const refreshInfo = () => {
    position[1](ref.current!?.getPosition());
    size[1](ref.current!?.getSize());
  };
  useEffect(() => {
    winBoxMapRef.current[id] = ref;
    ref.current &&
      document
        .getElementsByTagName("main")[0]
        .appendChild(document.getElementById(ref.current.getId()!)!);
  }, []);
  const { token } = theme.useToken();
  const aref = useRef(
    type == "page"
      ? [
          {
            class: "wb-gh",
            image: "/link.svg",
            click: () => {
              handleClose(true, id);
              routerHelper.jumpToByPath(winBoxTitle);
            },
          },
        ]
      : [],
  );
  return (
    <WinBox
      className="modern"
      ref={ref}
      title={winBoxTitle}
      icon={icon}
      noMin={noMin}
      noMax={noMax}
      noFull={noFull}
      noClose={noClose}
      width={Math.min(document.body.clientWidth, 800)}
      height={Math.min(document.body.clientHeight, 500)}
      x={pos_x}
      y={pos_y}
      hide={hide[0]}
      onMaximize={refreshInfo}
      onMinimize={refreshInfo}
      onRestore={refreshInfo}
      onMove={refreshInfo}
      onResize={refreshInfo}
      onClose={(force) => {
        return handleClose?.(force, id);
      }}
      onFocus={() => isFocus[1](true)}
      onBlur={() => isFocus[1](false)}
      customControls={aref.current}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          background: token.colorBgContainer,
          overflow: "auto",
        }}
      >
        {children}
      </div>
    </WinBox>
  );
}

export default memo(WinBoxModal);
