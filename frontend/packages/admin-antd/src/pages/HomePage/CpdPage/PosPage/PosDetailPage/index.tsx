import { useSearchParams } from "react-router-dom";
import { useActive } from "src/common/hooks";
import { ROUTE_ID } from "src/router";
import { useFlat } from "src/service";
import DetailView from "../views/detailView";
import { PosEditViewProps } from "../views/editView";

const PosDetailPage = (props: PosEditViewProps) => {
	const { isSub, id: subId } = props;
	const [searchParams] = useSearchParams();
	const id = isSub ? subId : searchParams.get("id");
	const branchName = ROUTE_ID.PosDetailPage;
	const { getCurrentDetailAct, setCurrentDetail } = useFlat([
		"posStore",
		branchName,
	]);
	useActive({
		onActive() {
			getCurrentDetailAct({
				id,
			});
		},
		onLeave() {
			setCurrentDetail(null);
		},
	});

	return <DetailView id={id!} branchName={branchName} {...props} />;
};

export default PosDetailPage;
