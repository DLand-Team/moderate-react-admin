import { LocalizationProvider } from "@/locales";
import ServiceProvider from "@/providers/serviceProvider";
import { ThemeProvider } from "@/theme/theme-provider";
import type { Metadata } from "next";
import { I18nProvider } from "src/locales/i18n-provider";

import "./globals.css";

export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="cn">
			<body>
				<ServiceProvider>
					<I18nProvider lang={"cn"}>
						<LocalizationProvider>
								<ThemeProvider>{children}</ThemeProvider>
						</LocalizationProvider>
					</I18nProvider>
				</ServiceProvider>
			</body>
		</html>
	);
}