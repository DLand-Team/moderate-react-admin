import Avatar from "@mui/material/Avatar";
import type { IconButtonProps } from "@mui/material/IconButton";
import IconButton from "@mui/material/IconButton";

// ----------------------------------------------------------------------

export type AccountButtonProps = IconButtonProps & {
	open: boolean;
	photoURL: string;
	displayName: string;
};

export function AccountButton({
	open,
	photoURL,
	displayName,
	sx,
	...other
}: AccountButtonProps) {
	return (
		<IconButton sx={{ p: 0, ...sx }} {...other}>
			<Avatar
				src={photoURL}
				sx={{
					zIndex: 1,
				}}
			>
				{displayName?.charAt(0).toUpperCase()}
			</Avatar>
		</IconButton>
	);
}
