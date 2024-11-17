import CloseIcon from "@mui/icons-material/Close";
import { Stack, Theme } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import { styled, SxProps } from "@mui/material/styles";
import * as React from "react";
import { createRoot } from "react-dom/client";
import { useBoolean } from "src/common/hooks";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialog-container": {
        backdropFilter: "blur(5px)",
    },
    "& .MuiDialogContent-root": {
        padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(1),
    },
    "& .MuiDialog-paper": {
        position: "relative",
    },
}));

interface ModalProps {
    openFlag?: boolean;
    title?: string;
    content?: () => React.JSX.Element;
    actionConfig?: {
        label: string;
        handleClick?: () => void;
        render?: () => React.JSX.Element;
    }[];
    handleClose?: () => void;
    sx?: SxProps<Theme>;
}

export function Modal({
    children,
    openFlag = true,
    content,
    actionConfig,
    title,
    handleClose,
    sx = {},
}: React.PropsWithChildren<ModalProps>) {
    const isShow = useBoolean(openFlag);
    const Content = React.useMemo(() => content, [content]);
    const _handleClose = () => {
        isShow.onFalse();
        handleClose!?.();
    };
    React.useEffect(() => {
        isShow.setValue(openFlag);
    }, [openFlag]);
    return (
        <BootstrapDialog
            onClick={(e) => {
                e.stopPropagation();
            }}
            onClose={_handleClose}
            open={isShow.value}
            aria-labelledby="customized-dialog-title"
            scroll="paper"
            maxWidth={false}
            sx={{
                minHeight: "100vh",
                ...sx,
            }}
            disableAutoFocus={true}>
            <>
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    {title}
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={_handleClose}
                    sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}>
                    <CloseIcon />
                </IconButton>
                <DialogContent>
                    {Content ? (
                        <Stack>
                            <Content />
                        </Stack>
                    ) : (
                        children
                    )}
                </DialogContent>
                <DialogActions>
                    {actionConfig?.map((item) => {
                        const { label, handleClick, render } = item;
                        let node = render ? (
                            render()
                        ) : (
                            <Button autoFocus onClick={handleClick}>
                                {label}
                            </Button>
                        );
                        return node;
                    })}
                </DialogActions>
            </>
        </BootstrapDialog>
    );
}

const modalApi = (props: ModalProps) => {
    let dom = document.getElementById("modal_node");
    if (dom) {
        dom.remove();
    }
    dom = document.createElement("div");
    dom.setAttribute("id", "modal_node");
    document.body.getElementsByTagName("main")[0].appendChild(dom);
    const node = <Modal {...props} openFlag={true}></Modal>;
    createRoot(dom).render(node);
};

Modal.confirm = (props: ModalProps) => {
    return modalApi(props);
};
