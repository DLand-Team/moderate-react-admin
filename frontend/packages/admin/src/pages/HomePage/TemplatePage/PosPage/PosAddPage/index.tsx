import { useEffect } from "react";
import { ROUTE_ID } from "src/router/name";
import { useFlat } from "src/service";
import PosEditView, { PosEditViewProps } from "../views/editView";

const PosEditPage = (props: PosEditViewProps) => {
	const branchName = ROUTE_ID.PosEditPage;
	const { initCurrentDetail, setCurrentDetail } = useFlat([
		"posStore",
		branchName,
	]);
	useEffect(() => {
		initCurrentDetail();
		return () => {
			setCurrentDetail(null);
		};
	}, []);
	return <PosEditView branchName={branchName} {...props} />;
};

export default PosEditPage;
