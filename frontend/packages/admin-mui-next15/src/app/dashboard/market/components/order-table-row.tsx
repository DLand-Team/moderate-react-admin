"use client";
import { useBoolean } from "@/common/hooks";
import { toCurrency, toDate, toTime } from "@/common/utils";
import { ConfirmDialog } from "@/components/customDialog";
import { CustomPopover, usePopover } from "@/components/customPopover";
import { Iconify } from "@/components/iconify";
import { Label } from "@/components/label";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { IOrderItem } from "../types";

// ----------------------------------------------------------------------

type Props = {
    row: IOrderItem;
    selected: boolean;
    onViewRow: () => void;
    onSelectRow: () => void;
    onDeleteRow: () => void;
};

export function OrderTableRow({
    row,
    selected,
    onViewRow,
    onSelectRow,
    onDeleteRow,
}: Props) {
    const confirm = useBoolean();

    const collapse = useBoolean();

    const popover = usePopover();

    const renderPrimary = (
        <TableRow hover selected={selected}>
            <TableCell padding="checkbox">
                <Checkbox
                    checked={selected}
                    onClick={onSelectRow}
                    inputProps={{
                        id: `row-checkbox-${row.id}`,
                        "aria-label": `Row checkbox`,
                    }}
                />
            </TableCell>
            <TableCell>
                <Link
                    color="inherit"
                    onClick={onViewRow}
                    underline="always"
                    sx={{ cursor: "pointer" }}>
                    {row.orderNumber}
                </Link>
            </TableCell>

            <TableCell>
                <Stack spacing={2} direction="row" alignItems="center">
                    <Avatar
                        alt={row.customer.name}
                        src={row.customer.avatarUrl}
                    />

                    <Stack
                        sx={{
                            typography: "body2",
                            flex: "1 1 auto",
                            alignItems: "flex-start",
                        }}>
                        <Box component="span">{row.customer.name}</Box>
                        <Box component="span" sx={{ color: "text.disabled" }}>
                            {row.customer.email}
                        </Box>
                    </Stack>
                </Stack>
            </TableCell>

            <TableCell>
                <ListItemText
                    primary={toDate(row.createdAt)}
                    secondary={toTime(row.createdAt)}
                    primaryTypographyProps={{
                        typography: "body2",
                        noWrap: true,
                    }}
                    secondaryTypographyProps={{
                        mt: 0.5,
                        component: "span",
                        typography: "caption",
                    }}
                />
            </TableCell>

            <TableCell align="center"> {row.totalQuantity} </TableCell>

            <TableCell> {toCurrency(row.subtotal)} </TableCell>

            <TableCell>
                <Label
                    variant="soft"
                    color={
                        (row.status === "completed" && "success") ||
                        (row.status === "pending" && "warning") ||
                        (row.status === "cancelled" && "error") ||
                        "default"
                    }>
                    {row.status}
                </Label>
            </TableCell>

            <TableCell align="right" sx={{ px: 1, whiteSpace: "nowrap" }}>
                <IconButton
                    color={collapse.value ? "inherit" : "default"}
                    onClick={collapse.onToggle}
                    sx={{ ...(collapse.value && { bgcolor: "action.hover" }) }}>
                    <Iconify icon="eva:arrow-ios-downward-fill" />
                </IconButton>

                <IconButton
                    color={popover.open ? "inherit" : "default"}
                    onClick={popover.onOpen}>
                    <Iconify icon="eva:more-vertical-fill" />
                </IconButton>
            </TableCell>
        </TableRow>
    );

    const renderSecondary = (
        <TableRow>
            <TableCell sx={{ p: 0, border: "none" }} colSpan={8}>
                <Collapse
                    in={collapse.value}
                    timeout="auto"
                    unmountOnExit
                    sx={{ bgcolor: "background.neutral" }}>
                    <Paper sx={{ m: 1.5 }}>
                        {row.items.map((item) => (
                            <Stack
                                key={item.id}
                                direction="row"
                                alignItems="center"
                                sx={{
                                    p: (theme) =>
                                        theme.spacing(1.5, 2, 1.5, 1.5),
                                    "&:not(:last-of-type)": {
                                        borderBottom: (theme) =>
                                            `solid 2px ${theme.vars.palette.background.neutral}`,
                                    },
                                }}>
                                <Avatar
                                    src={item.coverUrl}
                                    variant="rounded"
                                    sx={{ width: 48, height: 48, mr: 2 }}
                                />

                                <ListItemText
                                    primary={item.name}
                                    secondary={item.sku}
                                    primaryTypographyProps={{
                                        typography: "body2",
                                    }}
                                    secondaryTypographyProps={{
                                        component: "span",
                                        color: "text.disabled",
                                        mt: 0.5,
                                    }}
                                />

                                <div>x{item.quantity} </div>

                                <Box sx={{ width: 110, textAlign: "right" }}>
                                    {toCurrency(item.price)}
                                </Box>
                            </Stack>
                        ))}
                    </Paper>
                </Collapse>
            </TableCell>
        </TableRow>
    );

    return (
        <>
            {renderPrimary}

            {renderSecondary}

            <CustomPopover
                open={popover.open}
                anchorEl={popover.anchorEl}
                onClose={popover.onClose}
                slotProps={{ arrow: { placement: "right-top" } }}>
                <MenuList>
                    <MenuItem
                        onClick={() => {
                            confirm.onTrue();
                            popover.onClose();
                        }}
                        sx={{ color: "error.main" }}>
                        <Iconify icon="solar:trash-bin-trash-bold" />
                        Delete
                    </MenuItem>

                    <MenuItem
                        onClick={() => {
                            onViewRow();
                            popover.onClose();
                        }}>
                        <Iconify icon="solar:eye-bold" />
                        View
                    </MenuItem>
                </MenuList>
            </CustomPopover>

            <ConfirmDialog
                open={confirm.value}
                onClose={confirm.onFalse}
                title="Delete"
                content="Are you sure want to delete?"
                action={
                    <Button
                        variant="contained"
                        color="error"
                        onClick={onDeleteRow}>
                        Delete
                    </Button>
                }
            />
        </>
    );
}
