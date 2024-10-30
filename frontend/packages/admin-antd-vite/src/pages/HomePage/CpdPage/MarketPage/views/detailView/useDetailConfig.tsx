import { Skeleton } from "antd";
import { DescriptionsItemType } from "antd/es/descriptions";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useFlat } from "src/service";

// 获取详情配置数据的hook
const useDetailConfig = (branchName?: string) => {
    const { currentData } = useFlat(["marketStore", branchName], {
        currentData: "IN",
    });

    const { t } = useTranslation("market");
    let optionArr = {
        [0]: t`marketPage.NORMAL`,
        [1]: t`marketPage.CONNECITON`,
    };
    const items: DescriptionsItemType[] = useMemo(() => {
        return [
            {
                label: t`marketPage.marketName`,
                children: currentData?.marketName || (
                    <Skeleton.Input block={true} active={true} />
                ),
                span: { xl: 2, xxl: 2 },
            },
            {
                label: t`marketPage.marketType`,
                children: currentData ? (
                    optionArr[currentData?.marketType as keyof typeof optionArr]
                ) : (
                    <Skeleton.Input block={true} active={true} />
                ),
                span: { xl: 2, xxl: 2 },
            },
            {
                label: t`marketPage.comment`,
                span: 12,
                children: currentData ? (
                    currentData?.comment
                ) : (
                    <Skeleton.Input block={true} active={true} />
                ),
            },
        ];
    }, [currentData]);
    return items;
};

export default useDetailConfig;
