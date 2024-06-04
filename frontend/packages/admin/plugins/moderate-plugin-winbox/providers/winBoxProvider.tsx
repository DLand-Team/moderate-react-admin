import React, {
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
	const { winBoxList, deleteWinBox } = useFlat("appStore");
	const winBoxMapRef = useRef<Record<PropertyKey, RefObject<WinBox>>>({});
	const [winBoxMap, setWinBoxMap] = useState<
		Record<PropertyKey, WinBoxModalFuncProps>
	>({});
	const handleClose: WinBoxModalProps["handleClose"] = (_, id) => {
		if (id in winBoxMapRef.current) {
			Reflect.deleteProperty(winBoxMapRef.current, id);
			deleteWinBox({ id });
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
				<div id="winboxWrapper" style={{ zIndex: 1000 }}>
					{winBoxList.map((item) => {
						const Comp = GlobalVar.service
							.get("winBoxContent")
							?.get(item.id) as ReactElement;
						return (
							<WinBoxCustom
								id={item.id}
								handleClose={handleClose}
								winBoxMapRef={winBoxMapRef}
								key={item.id}
								type={item.type}
							>
								{Comp}
							</WinBoxCustom>
						);
					})}
				</div>
			</WinBoxContext.Provider>
		</>
	);
};
