import {
	ReactElement,
	RefObject,
	createContext,
	useRef,
	useState,
} from "react";
import WinBox, { WinBoxPropType } from "react-winbox";
import { UUID } from "src/common/utils";
import { useFlat } from "src/service";
import WinBoxCustom, { WinBoxModalProps } from "../components/winbox";
import GlobalVar from "src/static/globalVar";
type WinBoxModalFuncProps = Omit<
	WinBoxModalProps,
	"winBoxMapRef" | "handleClose"
> & {
	content: () => Required<WinBoxPropType>["children"];
};
type WinBoxModalFunc = (
	props: Omit<WinBoxModalFuncProps, "id" | "handleClose">,
) => void;
export const WinBoxContext = createContext<{
	winBoxModal: WinBoxModalFunc;
} | null>(null);

export const WinBoxProvider = ({ children }: React.PropsWithChildren) => {
	const { winBoxList } = useFlat("appStore");
	const winBoxMapRef = useRef<Record<PropertyKey, RefObject<WinBox>>>({});
	const [winBoxMap, setWinBoxMap] = useState<
		Record<PropertyKey, WinBoxModalFuncProps>
	>({});
	const handleClose: WinBoxModalProps["handleClose"] = (_, id) => {
		if (id in winBoxMap) {
			const temp = { ...winBoxMap };
			Reflect.deleteProperty(temp, id);
			setWinBoxMap(temp);
		}
	};

	const winBoxModal = ({
		content,
	}: Omit<WinBoxModalFuncProps, "id" | "handleClose">) => {
		const id = UUID();
		setWinBoxMap({
			...winBoxMap,
			[id]: {
				id,
				content,
			},
		});
	};
	return (
		<>
			<WinBoxContext.Provider
				value={{
					winBoxModal,
				}}
			>
				{children}
				{winBoxList.map((item) => {
					const Comp = GlobalVar.service
						.get("winBoxContent")
						?.get(item) as ReactElement;
					return (
						<WinBoxCustom
							id={item}
							handleClose={handleClose}
							winBoxMapRef={winBoxMapRef}
							key={item}
						>
							{Comp}
						</WinBoxCustom>
					);
				})}
			</WinBoxContext.Provider>
		</>
	);
};
