import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { ROUTE_ID } from "src/router/name";
import { useFlat } from "src/service";
import PosEditView, { PosEditViewProps } from "../views/editView";

const PosEditPage = (props: PosEditViewProps) => {
	const branchName = ROUTE_ID.PosEditPage;
	let [searchParams] = useSearchParams();
	const id = searchParams.get("id");
	const { getCurrentDetailAct, setCurrentDetail } = useFlat([
		"posStore",
		branchName,
	]);
	useEffect(() => {
		getCurrentDetailAct({
			id,
		});
		return () => {
			setCurrentDetail(null);
		};
	}, []);
	return <PosEditView branchName={branchName} {...props} />;
};

export default PosEditPage;
