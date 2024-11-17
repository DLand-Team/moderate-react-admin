import type { Theme, Components } from "@mui/material/styles";

// ----------------------------------------------------------------------

const MuiAppBar: Components<Theme>["MuiAppBar"] = {
	defaultProps: { color: "transparent" },
	styleOverrides: { root: { boxShadow: "none" } },
};

// ----------------------------------------------------------------------

export const appBar = { MuiAppBar };
