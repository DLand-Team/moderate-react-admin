"use client";

import Drawer from "@mui/material/Drawer";
import type { IconButtonProps } from "@mui/material/IconButton";
import IconButton from "@mui/material/IconButton";
import { useCallback, useState } from "react";
import { Iconify } from "src/components/iconify";
import { Scrollbar } from "src/components/scrollbar";
import { AccountButton } from "./accountButton";

// ----------------------------------------------------------------------

export type AccountDrawerProps = IconButtonProps & {
	data?: {
		label: string;
		href: string;
		icon?: React.ReactNode;
		info?: React.ReactNode;
	}[];
};

export function AccountDrawer({ data = [], sx, ...other }: AccountDrawerProps) {
	const [open, setOpen] = useState(false);

	const handleCloseDrawer = useCallback(() => {
		setOpen(false);
	}, []);
	const handleOpenDrawer = () => {
		setOpen(true);
	};
	return (
		<>
			<AccountButton
				open={open}
				onClick={handleOpenDrawer}
				photoURL={"/imgs/logo.png"}
				displayName={"dland"}
				sx={sx}
				{...other}
			/>
			<Drawer
				open={open}
				onClose={handleCloseDrawer}
				anchor="right"
				slotProps={{ backdrop: { invisible: true } }}
				PaperProps={{ sx: { width: 320 } }}
			>
				<IconButton
					onClick={handleCloseDrawer}
					sx={{ top: 12, left: 12, zIndex: 9, position: "absolute" }}
				>
					<Iconify icon="mingcute:close-line" />
				</IconButton>

				<Scrollbar></Scrollbar>
			</Drawer>
		</>
	);
}
