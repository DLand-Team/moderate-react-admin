import type { BoxProps } from "@mui/material/Box";
import type { Theme, SxProps } from "@mui/material/styles";
import type { LazyLoadImageProps } from "react-lazy-load-image-component";

// ----------------------------------------------------------------------

type BaseRatioType =
    | "2/3"
    | "3/2"
    | "4/3"
    | "3/4"
    | "6/4"
    | "4/6"
    | "16/9"
    | "9/16"
    | "21/9"
    | "9/21"
    | "1/1"
    | string;

export type ImageRatioType = BaseRatioType | { [key: string]: string };

export type ImageProps = BoxProps &
    LazyLoadImageProps & {
        ratio?: ImageRatioType;
        disabledEffect?: boolean;
        slotProps?: {
            overlay: SxProps<Theme>;
        };
    };
