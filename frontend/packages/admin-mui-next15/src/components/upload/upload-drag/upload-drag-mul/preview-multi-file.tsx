import { Box, Theme } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import { SxProps, alpha } from "@mui/material/styles";
import React, { useRef } from "react";
import { XYCoord, useDrag, useDrop } from "react-dnd";
import { FileThumbnail } from "src/components/fileThumbnail";
import { Iconify } from "../../../iconify";
import { CustomFile } from "../../types";

// ----------------------------------------------------------------------
export const ItemTypes = {
    CARD: "card",
};
interface DragItem {
    index: number;
    id: string;
    type: string;
}

export const PerviewCard: React.FC<
    React.PropsWithChildren<{
        index: number;
        onRemove:
            | ((
                  fileName: string | CustomFile,
                  fileIndex?: number | undefined
              ) => void)
            | undefined;
        fileName: string;
        file: File;
        sx: SxProps<Theme> | undefined;
        moveCard: (dragIndex: number, hoverIndex: number) => void;
    }>
> = ({ index, file, fileName, onRemove, sx = {}, moveCard }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [{ handlerId }, drop] = useDrop<
        DragItem,
        void,
        { handlerId: string | symbol | null }
    >({
        accept: ItemTypes.CARD,
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        hover(item: DragItem, monitor) {
            if (!ref.current) {
                return;
            }

            const dragIndex = item.index;
            const hoverIndex = index;
            if (dragIndex === hoverIndex) {
                return;
            }
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY =
                (clientOffset as XYCoord).y - hoverBoundingRect.top;
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            moveCard?.(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },
    });

    const [{ isDragging }, drag] = useDrag({
        type: ItemTypes.CARD,
        item: () => {
            return { id: file, index };
        },
        collect: (monitor: any) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const opacity = isDragging ? 0 : 1;
    drag(drop(ref));
    return (
        <Stack
            ref={ref}
            data-handler-id={handlerId}
            key={fileName}
            spacing={2}
            direction="row"
            alignItems="center"
            sx={{
                my: 1,
                py: 1,
                px: 1.5,
                borderRadius: 1,
                border: (theme) =>
                    `solid 1px ${alpha(theme.palette.grey[500], 0.16)}`,
                opacity: opacity,
                ...sx,
            }}>
            <FileThumbnail fileName={fileName} file={file} />

            <ListItemText
                primary={fileName.split("/").slice(-1)[0]}
                secondary={""}
                secondaryTypographyProps={{
                    component: "span",
                    typography: "caption",
                }}
            />

            {onRemove && (
                <IconButton
                    size="small"
                    onClick={() => {
                        onRemove(fileName);
                    }}>
                    <Iconify icon="mingcute:close-line" width={16} />
                </IconButton>
            )}
        </Stack>
    );
};
export type RenderPerviewItem = (props: {
    index: number;
    onRemove:
        | ((
              fileName: string | CustomFile,
              fileIndex?: number | undefined
          ) => void)
        | undefined;
    fileName: string;
    file: File;
    sx: SxProps<Theme> | undefined;
    moveCard: (dragIndex: number, hoverIndex: number) => void;
    Card: typeof PerviewCard;
}) => React.ReactNode;

export default function MultiFilePreview({
    fileNameList,
    onRemove,
    sx,
    moveCard,
    files,
    renderPerviewItem,
}: {
    fileNameList: string[];
    files?: File[];
    sx?: SxProps<Theme>;
    onRemove?: (fileName: CustomFile | string, fileIndex?: number) => void;
    moveCard?: (dragIndex: number, hoverIndex: number) => void;
    renderPerviewItem?: RenderPerviewItem;
}) {
    return (
        <Box>
            {fileNameList?.map((file, index) => {
                return (
                    <div key={file}>
                        {renderPerviewItem ? (
                            renderPerviewItem({
                                index: index,
                                moveCard: moveCard!,
                                file: files!?.[index],
                                fileName: file,
                                onRemove: onRemove,
                                sx: sx,
                                Card: PerviewCard,
                            })
                        ) : (
                            <PerviewCard
                                index={index}
                                moveCard={moveCard!}
                                file={files!?.[index]}
                                fileName={file}
                                onRemove={onRemove}
                                sx={sx}
                            />
                        )}
                    </div>
                );
            })}
        </Box>
    );
}
