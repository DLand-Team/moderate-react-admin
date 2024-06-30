import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { ROUTE_ID } from "src/router/name";
import { useFlat } from "src/service";
import { PosEditViewProps } from "../views/editView";
import DetailView from "../views/detailView";

const PosDetailPage = (props: PosEditViewProps) => {
	const branchName = ROUTE_ID.PosDetailPage;
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
	return <DetailView branchName={branchName} {...props} />;
};

export default PosDetailPage;
