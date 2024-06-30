import { useEffect } from "react";
import { useFlat } from "src/service";
import PosListView from "../views/listView";

const CategoryPage = () => {
	const { queryPostListAct } = useFlat("posStore");

	useEffect(() => {
		queryPostListAct();
	}, []);

	return <PosListView />;
};

export default CategoryPage;
