import {
  MutableRefObject,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import WinBox, { WinBoxPropType } from "react-winbox";
import "winbox/dist/css/themes/modern.min.css"; // optional
import "winbox/dist/css/themes/white.min.css"; // optional
import "winbox/dist/css/winbox.min.css";

const IconsTable = [
  {
    class: "wb-gh",
    image: "",
    click: () => {
      window.open("https://github.com/rickonono3/react-winbox", "_blank");
    },
  },
  {
    image: "",
    class: "wb-logo",
    click: () => alert("Hello!"),
  },
];

export interface WinBoxModalProps {
  id: string | number;
  handleClose: (
    force: boolean,
    id: string | number
  ) => ReturnType<Required<WinBoxPropType>["onClose"]>;
  children?: WinBoxPropType["children"];
  winBoxMapRef: MutableRefObject<Record<PropertyKey, RefObject<WinBox>>>;
}

function WinBoxModal({
  handleClose,
  children,
  id,
  winBoxMapRef,
}: WinBoxModalProps) {
  const ref = useRef<WinBox>(null);
  const [title] = useState("Hello");
  const [top] = useState(120);
  const [left] = useState(260);
  const [theme] = useState("modern");
  const [icon] = useState("");
  const [icons] = useState([0]);
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
  }, []);
  return (
    <WinBox
      ref={ref}
      title={title}
      icon={icon}
      noMin={noMin}
      noMax={noMax}
      noFull={noFull}
      noClose={noClose}
      width={Math.min(document.body.clientWidth, 700)}
      height={Math.min(document.body.clientHeight, 500)}
      x="center"
      y="center"
      top={top}
      left={left}
      hide={hide[0]}
      className={theme ? theme : ""}
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
      customControls={icons.map((i) => IconsTable[i])}>
      {children}
    </WinBox>
  );
}

export default WinBoxModal;
