import { Avatar } from "@mui/material";
import type { AppBarProps } from "@mui/material/AppBar";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import { useCss } from "./useCss";

export function Header({ sx, ...other }: AppBarProps) {
	const { toolbarStyles } = useCss();

	return (
		<AppBar
			position="sticky"
			sx={{
				zIndex: "var(--layout-header-zIndex)",
				...sx,
			}}
			{...other}
		>
			<Toolbar
				disableGutters
				sx={{
					...toolbarStyles.default,
					...toolbarStyles.offset,
				}}
			>
				<Container
					sx={{
						height: 1,
						display: "flex",
						alignItems: "center",
					}}
				>
					<Box
						sx={{
							flex: "1",
						}}
					></Box>
				</Container>
				<Avatar src="/imgs/logo.png"></Avatar>
			</Toolbar>
		</AppBar>
	);
}
