import Collapse from "@mui/material/Collapse";
import Stack from "@mui/material/Stack";
import { useCallback, useState } from "react";
import { NavLi, NavUl, Subheader } from ".";
import { NavMenuList } from "./navMenuList";
import { useCss } from "../useCss";
import { SxProps, Theme } from "@mui/material";

// ----------------------------------------------------------------------
export type MenuItem = {
    key?: string;
    children?: MenuItem[];
    icon?: React.ReactNode;
    label?: string;
    title: string;
    info?: string;
    path: string;
    type?: "common" | "group";
};
export interface NavMenuVerticalProps {
    sx?: SxProps<Theme>;
    data: MenuItem[];
}
export function NavMenuVertical({ sx, data }: NavMenuVerticalProps) {
    const { cssVars } = useCss();
    return (
        <Stack component="nav" sx={{ ...cssVars, ...sx }}>
            <NavUl sx={{ flex: "1 1 auto", gap: "var(--nav-item-gap)" }}>
                {data.map((item, index) => (
                    <NavItem
                        data={item}
                        key={item.key || index}
                        items={item.children || []}
                    />
                ))}
            </NavUl>
        </Stack>
    );
}

// ----------------------------------------------------------------------
export interface NavItemProps {
    data: MenuItem;
    items: MenuItem[];
}
function NavItem({ data, items }: NavItemProps) {
    const [open, setOpen] = useState(true);

    const handleToggle = useCallback(() => {
        setOpen((prev) => !prev);
    }, []);

    const renderContent = (
        <NavUl sx={{ gap: "var(--nav-item-gap)" }}>
            {items.map((list) => (
                <NavMenuList key={list.title} data={list} depth={1} />
            ))}
        </NavUl>
    );
    return (
        <NavLi>
            {data.type == "group" ? (
                <>
                    <Subheader
                        data-title={data.title}
                        open={open}
                        onClick={handleToggle}>
                        {data.title}
                    </Subheader>

                    <Collapse in={open}>{renderContent}</Collapse>
                </>
            ) : (
                renderContent
            )}
        </NavLi>
    );
}
