import type { Theme, SxProps } from "@mui/material/styles";
import type { UseSetStateReturn } from "@/common/hooks";
import { useCallback } from "react";
import Chip from "@mui/material/Chip";
import { toDateRangeShortLabel } from "@/common/utils";
import {
    chipProps,
    FiltersBlock,
    FiltersResult,
} from "@/components/filtersResult";
import { IOrderTableFilters } from "../types";

// ----------------------------------------------------------------------

type Props = {
    totalResults: number;
    sx?: SxProps<Theme>;
    onResetPage: () => void;
    filters: UseSetStateReturn<IOrderTableFilters>;
};

export function OrderTableFiltersResult({
    filters,
    totalResults,
    onResetPage,
    sx,
}: Props) {
    const handleRemoveKeyword = useCallback(() => {
        onResetPage();
        filters.setState({ name: "" });
    }, [filters, onResetPage]);

    const handleRemoveStatus = useCallback(() => {
        onResetPage();
        filters.setState({ status: "all" });
    }, [filters, onResetPage]);

    const handleRemoveDate = useCallback(() => {
        onResetPage();
        filters.setState({ startDate: null, endDate: null });
    }, [filters, onResetPage]);

    const handleReset = useCallback(() => {
        onResetPage();
        filters.onResetState();
    }, [filters, onResetPage]);

    return (
        <FiltersResult
            totalResults={totalResults}
            onReset={handleReset}
            sx={sx}>
            <FiltersBlock
                label="Status:"
                isShow={filters.state.status !== "all"}>
                <Chip
                    {...chipProps}
                    label={filters.state.status}
                    onDelete={handleRemoveStatus}
                    sx={{ textTransform: "capitalize" }}
                />
            </FiltersBlock>

            <FiltersBlock
                label="Date:"
                isShow={Boolean(
                    filters.state.startDate && filters.state.endDate
                )}>
                <Chip
                    {...chipProps}
                    label={toDateRangeShortLabel(
                        filters.state.startDate,
                        filters.state.endDate
                    )}
                    onDelete={handleRemoveDate}
                />
            </FiltersBlock>

            <FiltersBlock label="Keyword:" isShow={!!filters.state.name}>
                <Chip
                    {...chipProps}
                    label={filters.state.name}
                    onDelete={handleRemoveKeyword}
                />
            </FiltersBlock>
        </FiltersResult>
    );
}
