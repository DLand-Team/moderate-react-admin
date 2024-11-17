import { Collapse, CollapseProps } from "@mui/material";
import { useCss } from "../useCss";

export type NavCollapseProps = {
    depth: number;
} & CollapseProps;

export function NavCollapse({
    sx,
    depth,
    children,
    ...other
}: NavCollapseProps) {
    const { classNameObj } = useCss();
    return (
        <>
            <Collapse
                sx={{
                    ...(depth + 1 !== 1 && {
                        pl: "calc(var(--nav-item-pl) + var(--nav-icon-size) / 2)",
                        [`& .${classNameObj.ul}`]: {
                            position: "relative",
                            pl: "var(--nav-bullet-size)",
                        },
                    }),
                    ...sx,
                }}
                {...other}>
                {children}
            </Collapse>
        </>
    );
}
