import { Skeleton } from "antd";
import { DescriptionsItemType } from "antd/es/descriptions";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useFlat } from "src/service";

// 获取详情配置数据的hook
const useDetailConfig = (branchName?: string) => {
	const { currentData } = useFlat(["posStore", branchName], {
		currentData: "IN",
	});
	const { t } = useTranslation();
	const items: DescriptionsItemType[] = useMemo(() => {
		return [
			{
				label: t`pos:posPage.posName`,
				children: currentData ? (
					currentData?.posName
				) : (
					<Skeleton.Input block={true} active={true} />
				),
				span: 4,
			},
			{
				label: t`pos:posPage.comment`,
				children: currentData ? (
					currentData?.comment
				) : (
					<Skeleton.Input block={true} active={true} />
				),
				span: 4,
			},
		];
	}, [currentData]);
	return items;
};

export default useDetailConfig;
