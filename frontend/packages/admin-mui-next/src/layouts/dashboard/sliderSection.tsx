import { NavMenuVertical } from "@/components/navMenu";
import { Scrollbar } from "@/components/scrollbar";
import { useFlat } from "@/service";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import { varAlpha } from "src/common/utils";

// ----------------------------------------------------------------------

export function SliderSection() {
    const theme = useTheme();
    const { menuData } = useFlat("appStore");
    return (
        <Box
            sx={{
                height: 1,
                flexDirection: "column",
                zIndex: "var(--layout-nav-zIndex)",
                width: "var(--layout-nav-vertical-width)",
                borderRight: `1px solid var(--layout-nav-border-color, ${varAlpha(
                    theme.vars.palette.grey["500Channel"],
                    0.12
                )})`,
                transition: theme.transitions.create(["width"], {
                    easing: "var(--layout-transition-easing)",
                    duration: "var(--layout-transition-duration)",
                }),
            }}>
            <Box sx={{ pl: 3.5, pt: 2.5, pb: 1 }}>Dland</Box>
            <Scrollbar sx={{ px: 2, flex: "1 1 auto" }} fillContent>
                <NavMenuVertical data={menuData} />
            </Scrollbar>
        </Box>
    );
}
