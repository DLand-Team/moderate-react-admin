import { useActive } from "src/common/hooks/useActive";
import { ROUTE_ID } from "src/router/name";
import { useFlat } from "src/service";
import PosEditView, { PosEditViewProps } from "../views/editView";

const PosEditPage = (props: PosEditViewProps) => {
	const branchName = ROUTE_ID.PosEditPage;
	const { initCurrentDetail, setCurrentDetail } = useFlat([
		"posStore",
		branchName,
	]);
	useActive({
		onActive(isFirst) {
			isFirst && initCurrentDetail();
		},
		onLeave(isLast) {
			isLast && setCurrentDetail(null);
		},
	});
	return <PosEditView branchName={branchName} {...props} />;
};

export default PosEditPage;
