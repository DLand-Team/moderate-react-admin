"use client";

import type { IconButtonProps } from "@mui/material/IconButton";
import type { LanguageValue } from "src/locales";
import { m } from "framer-motion";
import { useCallback } from "react";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import { useTranslate } from "src/locales";
import { CustomPopover, usePopover } from "src/components";
import { FlagIcon } from "src/components/iconify";

// ----------------------------------------------------------------------

export type LanguagePopoverProps = IconButtonProps & {
	data?: {
		value: string;
		label: string;
		countryCode: string;
	}[];
};

export function LanguagePopover({
	data = [],
	sx,
	...other
}: LanguagePopoverProps) {
	const popover = usePopover();

	const { onChangeLang, currentLang } = useTranslate();

	const handleChangeLang = useCallback(
		(newLang: LanguageValue) => {
			onChangeLang(newLang);
			popover.onClose();
		},
		[onChangeLang, popover],
	);

	return (
		<>
			<IconButton
				component={m.button}
				whileTap="tap"
				whileHover="hover"
				onClick={popover.onOpen}
				sx={{
					p: 0,
					width: 40,
					height: 40,
					...(popover.open && { bgcolor: "action.selected" }),
					...sx,
				}}
				{...other}
			>
				<FlagIcon code={currentLang.countryCode} />
			</IconButton>

			<CustomPopover
				open={popover.open}
				anchorEl={popover.anchorEl}
				onClose={popover.onClose}
			>
				<MenuList sx={{ width: 160, minHeight: 72 }}>
					{data?.map((option) => (
						<MenuItem
							key={option.value}
							selected={option.value === currentLang.value}
							onClick={() =>
								handleChangeLang(option.value as LanguageValue)
							}
						>
							<FlagIcon code={option.countryCode} />
							{option.label}
						</MenuItem>
					))}
				</MenuList>
			</CustomPopover>
		</>
	);
}
