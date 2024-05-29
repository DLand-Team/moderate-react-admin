import { QueriesProvider } from "../common/hooks/useQueries";

export const ShiProvider = ({
	children,
}: React.PropsWithChildren) => {
	return <QueriesProvider>{children}</QueriesProvider>;
};
