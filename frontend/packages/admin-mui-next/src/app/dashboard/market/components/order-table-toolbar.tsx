import { useCallback } from "react";

import Stack from "@mui/material/Stack";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { formHelperTextClasses } from "@mui/material/FormHelperText";
import { Iconify } from "@/components/iconify";
import { usePopover, CustomPopover } from "@/components/customPopover";
import { UseSetStateReturn } from "@/common/hooks";
import { IOrderTableFilters } from "../types";
import { IDatePickerControl } from "@/types/common";

// ----------------------------------------------------------------------

type Props = {
    dateError: boolean;
    onResetPage: () => void;
    filters: UseSetStateReturn<IOrderTableFilters>;
};

const TableCustom = () => {
    return <div></div>;
};

export function OrderTableToolbar({ filters, onResetPage, dateError }: Props) {
    const popover = usePopover();

    const handleFilterName = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            onResetPage();
            filters.setState({ name: event.target.value });
        },
        [filters, onResetPage]
    );

    const handleFilterStartDate = useCallback(
        (newValue: IDatePickerControl) => {
            onResetPage();
            filters.setState({ startDate: newValue });
        },
        [filters, onResetPage]
    );

    const handleFilterEndDate = useCallback(
        (newValue: IDatePickerControl) => {
            onResetPage();
            filters.setState({ endDate: newValue });
        },
        [filters, onResetPage]
    );

    return (
        <>
            <Stack
                spacing={2}
                alignItems={{ xs: "flex-end", md: "center" }}
                direction={{ xs: "column", md: "row" }}
                sx={{ p: 2.5, pr: { xs: 2.5, md: 1 } }}>
                <DatePicker
                    label="开始日期"
                    value={filters.state.startDate as any}
                    onChange={handleFilterStartDate}
                    slotProps={{ textField: { fullWidth: true } }}
                    sx={{ maxWidth: { md: 200 } }}
                />

                <DatePicker
                    label="截止日期"
                    value={filters.state.endDate as any}
                    onChange={handleFilterEndDate}
                    slotProps={{
                        textField: {
                            fullWidth: true,
                            error: dateError,
                            helperText: dateError
                                ? "End date must be later than start date"
                                : null,
                        },
                    }}
                    sx={{
                        maxWidth: { md: 200 },
                        [`& .${formHelperTextClasses.root}`]: {
                            position: { md: "absolute" },
                            bottom: { md: -40 },
                        },
                    }}
                />

                <Stack
                    direction="row"
                    alignItems="center"
                    spacing={2}
                    flexGrow={1}
                    sx={{ width: 1 }}>
                    <TextField
                        fullWidth
                        value={filters.state.name}
                        onChange={handleFilterName}
                        placeholder="搜索"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Iconify
                                        icon="eva:search-fill"
                                        sx={{ color: "text.disabled" }}
                                    />
                                </InputAdornment>
                            ),
                        }}
                    />

                    <IconButton onClick={popover.onOpen}>
                        <Iconify icon="eva:more-vertical-fill" />
                    </IconButton>
                </Stack>
            </Stack>

            <CustomPopover
                open={popover.open}
                anchorEl={popover.anchorEl}
                onClose={popover.onClose}
                slotProps={{ arrow: { placement: "right-top" } }}>
                <MenuList>
                    <MenuItem
                        onClick={() => {
                            popover.onClose();
                        }}>
                        <Iconify icon="solar:printer-istic-bold" />
                        Print
                    </MenuItem>

                    <MenuItem
                        onClick={() => {
                            popover.onClose();
                        }}>
                        <Iconify icon="solar:import-bold" />
                        Import
                    </MenuItem>

                    <MenuItem
                        onClick={() => {
                            popover.onClose();
                        }}>
                        <Iconify icon="solar:export-bold" />
                        Export
                    </MenuItem>
                </MenuList>
            </CustomPopover>
        </>
    );
}
