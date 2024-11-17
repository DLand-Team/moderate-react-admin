"use client";

import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import GlobalStyles from "@mui/material/GlobalStyles";
import { PropsWithChildren } from "react";
import { Header } from "./components/header";
import { SliderSection } from "./sliderSection";
import { useCss } from "./useCss";

// ----------------------------------------------------------------------

export function DashboardLayout({ children }: PropsWithChildren) {
	const { cssVars } = useCss();
	const inputGlobalStyles = (
		<GlobalStyles
			styles={{
				body: {
					...cssVars,
				},
			}}
		/>
	);

	return (
		<>
			{inputGlobalStyles}
			<Box
				sx={{
					width: "100vw",
					height: "100vh",
					display: "flex",
				}}
				id="root__layout"
			>
				<SliderSection />
				<Box
					component="main"
					sx={{
						display: "flex",
						flex: "1 1 auto",
						flexDirection: "column",
					}}
				>
					<Header />
					<Container
						maxWidth={false}
						sx={{
							marginTop: "100px",
							maxWidth: "80%",
						}}
					>
						{children}
					</Container>
				</Box>
			</Box>
		</>
	);
}
