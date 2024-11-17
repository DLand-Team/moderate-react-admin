import { autocompleteClasses } from "@mui/material/Autocomplete";
import { checkboxClasses } from "@mui/material/Checkbox";
import { dividerClasses } from "@mui/material/Divider";
import { menuItemClasses } from "@mui/material/MenuItem";
import type { Theme, CSSObject } from "@mui/material/styles";

export type BgBlurProps = {
	color: string;
	blur?: number;
	imgUrl?: string;
};

export function bgBlur({ color, blur = 6, imgUrl }: BgBlurProps): CSSObject {
	if (imgUrl) {
		return {
			position: "relative",
			backgroundImage: `url(${imgUrl})`,
			"&::before": {
				position: "absolute",
				top: 0,
				left: 0,
				zIndex: 9,
				content: '""',
				width: "100%",
				height: "100%",
				backdropFilter: `blur(${blur}px)`,
				WebkitBackdropFilter: `blur(${blur}px)`,
				backgroundColor: color,
			},
		};
	}
	return {
		backdropFilter: `blur(${blur}px)`,
		WebkitBackdropFilter: `blur(${blur}px)`,
		backgroundColor: color,
	};
}

export function menuItem(theme: Theme) {
	return {
		...theme.typography.body2,
		padding: theme.spacing(0.75, 1),
		borderRadius: theme.shape.borderRadius * 0.75,
		"&:not(:last-of-type)": { marginBottom: 4 },
		[`&.${menuItemClasses.selected}`]: {
			fontWeight: theme.typography.fontWeightSemiBold,
			backgroundColor: theme.vars.palette.action.selected,
			"&:hover": { backgroundColor: theme.vars.palette.action.hover },
		},
		[`& .${checkboxClasses.root}`]: {
			padding: theme.spacing(0.5),
			marginLeft: theme.spacing(-0.5),
			marginRight: theme.spacing(0.5),
		},
		[`&.${autocompleteClasses.option}[aria-selected="true"]`]: {
			backgroundColor: theme.vars.palette.action.selected,
			"&:hover": { backgroundColor: theme.vars.palette.action.hover },
		},
		[`&+.${dividerClasses.root}`]: { margin: theme.spacing(0.5, 0) },
	};
}

export const stylesMode = {
	light: '[data-mui-color-scheme="light"] &',
	dark: '[data-mui-color-scheme="dark"] &',
};

export const mediaQueries = {
	upXs: "@media (min-width:0px)",
	upSm: "@media (min-width:600px)",
	upMd: "@media (min-width:900px)",
	upLg: "@media (min-width:1200px)",
	upXl: "@media (min-width:1536px)",
};

export function setFont(fontName: string) {
	return `"${fontName}",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"`;
}

export function remToPx(value: string): number {
	return Math.round(parseFloat(value) * 16);
}

export function pxToRem(value: number): string {
	return `${value / 16}rem`;
}

export function responsiveFontSizes({
	sm,
	md,
	lg,
}: {
	sm: number;
	md: number;
	lg: number;
}) {
	return {
		[mediaQueries.upSm]: { fontSize: pxToRem(sm) },
		[mediaQueries.upMd]: { fontSize: pxToRem(md) },
		[mediaQueries.upLg]: { fontSize: pxToRem(lg) },
	};
}

export function hexToRgbChannel(hex: string) {
	if (!/^#[0-9A-F]{6}$/i.test(hex)) {
		throw new Error(`Invalid hex color: ${hex}`);
	}

	const r = parseInt(hex.substring(1, 3), 16);
	const g = parseInt(hex.substring(3, 5), 16);
	const b = parseInt(hex.substring(5, 7), 16);

	return `${r} ${g} ${b}`;
}

export function createPaletteChannel(hexPalette: Record<string, string>) {
	const channelPalette: Record<string, string> = {};

	Object.entries(hexPalette).forEach(([key, value]) => {
		channelPalette[`${key}Channel`] = hexToRgbChannel(value);
	});

	return { ...hexPalette, ...channelPalette };
}

export function varAlpha(color: string, opacity = 1) {
	const unsupported =
		color.startsWith("#") ||
		color.startsWith("rgb") ||
		color.startsWith("rgba") ||
		(!color.includes("var") && color.includes("Channel"));

	if (unsupported) {
		throw new Error(
			`[Alpha]: Unsupported color format "${color}".
         Supported formats are:
         - RGB channels: "0 184 217".
         - CSS variables with "Channel" prefix: "var(--palette-common-blackChannel, #000000)".
         Unsupported formats are:
         - Hex: "#00B8D9".
         - RGB: "rgb(0, 184, 217)".
         - RGBA: "rgba(0, 184, 217, 1)".
         `,
		);
	}

	return `rgba(${color} / ${opacity})`;
}

type PaperProps = {
	theme: Theme;
	color?: string;
	dropdown?: boolean;
};

export function paper({ theme, color, dropdown }: PaperProps) {
	return {
		...bgBlur({
			color:
				color ??
				varAlpha(theme.vars.palette.background.paperChannel, 0.9),
			blur: 20,
		}),
		backgroundRepeat: "no-repeat, no-repeat",
		backgroundPosition: "top right, left bottom",
		backgroundSize: "50%, 50%",
		...(theme.direction === "rtl" && {
			backgroundPosition: "top left, right bottom",
		}),
		...(dropdown && {
			padding: theme.spacing(0.5),
			boxShadow: theme.customShadows.dropdown,
			borderRadius: `${theme.shape.borderRadius * 1.25}px`,
		}),
	};
}

export type BorderGradientProps = {
	color?: string;
	padding?: string;
};

export function borderGradient(props?: BorderGradientProps): CSSObject {
	return {
		inset: 0,
		width: "100%",
		content: '""',
		height: "100%",
		margin: "auto",
		position: "absolute",
		borderRadius: "inherit",
		padding: props?.padding ?? "2px",
		//
		mask: "linear-gradient(#FFF 0 0) content-box, linear-gradient(#FFF 0 0)",
		WebkitMask:
			"linear-gradient(#FFF 0 0) content-box, linear-gradient(#FFF 0 0)",
		maskComposite: "exclude",
		WebkitMaskComposite: "xor",
		...(props?.color && {
			background: `linear-gradient(${props.color})`,
		}),
	};
}
