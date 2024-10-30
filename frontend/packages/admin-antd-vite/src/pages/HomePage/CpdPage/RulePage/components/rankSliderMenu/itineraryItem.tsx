import { CloseCircleFilled } from "@ant-design/icons";
import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useTranslation } from "react-i18next";

let CARD = "CARD";
const style = {
    border: "1px dashed gray",
    padding: "0.5rem 1rem",
    marginBottom: ".5rem",
    backgroundColor: "white",
    cursor: "move",
    height: 40,
    display: "flex",
    alignItems: "center",
};
export default ({
    title,
    it,
    itIndex,
    rankIndex,
    id,
    handleSwitchClick,
    handleItSwitch,
}: any) => {
    const { t } = useTranslation();
    const ref = useRef(null);
    const [{ handlerId }, drop] = useDrop({
        accept: CARD,
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        drop(item: any) {
            if (!ref.current) {
                return;
            }
            handleItSwitch(
                {
                    rankId: item.data.rankId,
                    itineraryId: item.index,
                    itemData: item.data,
                },
                it
            );
        },
    });
    const [{ isDragging }, drag] = useDrag({
        type: "CARD",
        item: { type: CARD, id, index: itIndex, data: it },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });
    const opacity = isDragging ? 0 : 1;
    drop(drag(ref));
    return (
        <div
            ref={ref}
            style={{ ...style, opacity }}
            data-handler-id={handlerId}
        >
            <div key={`${rankIndex}-${itIndex}`}>
                <span style={{ marginLeft: 30 }}>
                    {title || t("rule:rulePage_itinerary") + `${itIndex + 1}`}
                </span>
                <a
                    className="itemSwap"
                    onClick={() => {
                        handleSwitchClick();
                    }}
                >
                    <CloseCircleFilled />
                </a>
            </div>
        </div>
    );
};
