import { useActive } from "src/common/hooks";
import { ROUTE_ID } from "src/router";
import { useFlat } from "src/service";
import PosEditView, { PosEditViewProps } from "../views/editView";

const PosAddPage = (props: PosEditViewProps) => {
	const branchName = ROUTE_ID.PosAddPage;
	const { initCurrentDetail, setCurrentDetail } = useFlat([
		"posStore",
		branchName,
	]);
	useActive({
		onFirstActive() {
			initCurrentDetail();
		},
		onLastLeave() {
			setCurrentDetail(null);
		},
	});
	return <PosEditView branchName={branchName} {...props} />;
};

export default PosAddPage;
