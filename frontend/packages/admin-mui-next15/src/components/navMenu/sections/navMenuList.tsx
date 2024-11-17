import { usePathname } from "@/routes/hooks";
import { useActiveLink } from "@/routes/hooks/use-active-link";
import { isExternalLink } from "@/routes/utils";
import { useCallback, useEffect, useState } from "react";
import { NavCollapse, NavLi, NavUl } from ".";
import { useCss } from "../useCss";
import { NavMenuItem } from "./navMenuItem";
import { MenuItem } from "./navMenuVertical";

// ----------------------------------------------------------------------
interface NavMenuListProps {
    depth: number;
    data: MenuItem;
}
export function NavMenuList({ data, depth }: NavMenuListProps) {
    const { classNameObj } = useCss();
    const pathname = usePathname();
    const [lineCount, setLineCount] = useState(0);
    // const active = useActiveLink(data.path, !!data.children);
    let active = false;
    const [openMenu, setOpenMenu] = useState(active);

    useEffect(() => {
        if (!active) {
            handleCloseMenu();
        }
    }, [pathname]);

    const handleToggleMenu = useCallback(() => {
        if (data.children) {
            setOpenMenu((prev) => !prev);
        }
    }, [data.children]);

    const handleCloseMenu = useCallback(() => {
        setOpenMenu(false);
    }, []);

    const renderNavItem = (
        <NavMenuItem
            data={data}
            // state
            depth={depth}
            active={active}
            hasChild={!!data.children}
            open={data.children && openMenu}
            onClick={handleToggleMenu}
        />
    );
    useEffect(() => {
        if (data.children) {
            let count = data.children.length;
            for (let i = count - 1; i >= 0; i--) {
                if (data.children[i].children?.length) {
                    count = i + 1;
                    break;
                }
            }
            setLineCount(count);
        }
    }, [data.children]);
    // Has children
    if (data.children) {
        return (
            <NavLi
                sx={{
                    [`& .${classNameObj.li}`]: {
                        "&:first-of-type": { mt: "var(--nav-item-gap)" },
                    },
                }}>
                {renderNavItem}

                <NavCollapse
                    data-group={data.title}
                    in={openMenu}
                    depth={depth}
                    unmountOnExit
                    mountOnEnter>
                    <NavSubList
                        lineCount={lineCount}
                        data={data.children}
                        depth={depth}
                    />
                </NavCollapse>
            </NavLi>
        );
    }

    // Default
    return <NavLi>{renderNavItem}</NavLi>;
}

// ----------------------------------------------------------------------
interface NavSubListProps {
    depth: number;
    data: MenuItem[];
    lineCount: number;
}
function NavSubList({ lineCount, data, depth }: NavSubListProps) {
    return (
        <NavUl sx={{ gap: "var(--nav-item-gap)" }}>
            <div
                style={{
                    position: "absolute",
                    width: "2px",
                    left: 0,
                    top: 0,
                    background: "var(--nav-bullet-light-color)",
                    height: `calc(var(--nav-item-sub-height) * ${lineCount}  + 4px * ${lineCount} - 28px`,
                }}></div>
            {data.map((list) => (
                <NavMenuList key={list.title} data={list} depth={depth + 1} />
            ))}
        </NavUl>
    );
}
