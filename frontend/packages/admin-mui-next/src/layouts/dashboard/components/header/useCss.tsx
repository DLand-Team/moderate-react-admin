import { bgBlur, varAlpha } from "@/common/utils";
import { useTheme } from "@mui/material";

export const useCss = () => {
	const theme = useTheme();
	const toolbarStyles = {
		default: {
			padding: "0px 32px",
			minHeight: "auto",
			height: "var(--layout-header-mobile-height)",
			transition: theme.transitions.create(
				["height", "background-color"],
				{
					easing: theme.transitions.easing.easeInOut,
					duration: theme.transitions.duration.shorter,
				},
			),
			[theme.breakpoints.up("sm")]: {
				minHeight: "auto",
			},
			[theme.breakpoints.up("md")]: {
				height: "var(--layout-header-desktop-height)",
			},
		},
		offset: {
			...bgBlur({
				color: varAlpha(
					theme.vars.palette.background.defaultChannel,
					0.8,
				),
			}),
		},
	};
	return {
		toolbarStyles,
	};
};
