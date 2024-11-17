import { Avatar, CircularProgress, IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { alpha, styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Image } from "src/components/image";
import { useBoolean } from "src/common/hooks";
import { UploadProps } from "../types";
import { Iconify } from "@/components";

// ----------------------------------------------------------------------

const BoxContent = styled(Box)(({ theme }) => ({
    position: "relative",
    display: "flex",
}));
export interface CustomFile extends File {
    path?: string;
    preview?: string;
    lastModifiedDate?: Date;
}

// ----------------------------------------------------------------------

export function UploadAvatar({
    renderPreview: RenderPreview,
    disabled,
    multiple = false,
    error,
    placeholder,
    helperText,
    onDel,
    onDelete,
    files,
    thumbnail,
    onUpload,
    onRemove,
    onAdd,
    onRemoveAll,
    sx,
    uploadAction,
    uploadLoabel,
    ...other
}: UploadProps) {
    const showLoading = useBoolean(false);
    const [fileNameList, setFilenameList] = useState<string[]>(
        (files as string[]) || []
    );
    const {
        getRootProps,
        getInputProps,
        isDragActive,
        fileRejections,
        isDragReject,
    } = useDropzone({
        multiple,
        disabled,
        onDropAccepted: () => {
            document.body.focus();
        },
        onDrop: async (acceptedFiles) => {
            onDel!?.(fileNameList?.[0] as string);
            showLoading.onTrue();
            if (acceptedFiles[0]) {
                const newFile = await uploadAction?.(acceptedFiles[0]).finally(
                    () => {
                        showLoading.onFalse();
                    }
                );
                if (newFile!) {
                    onAdd!?.(newFile);
                }
            }
        },
        ...other,
    });
    useEffect(() => {
        setFilenameList(files ? (files as string[])! : []);
    }, [files]);
    // 单文件模式：存在文件
    const hasFile = fileNameList.length > 0;
    // 存在错误
    const hasError = isDragReject || !!error;

    const imgUrl =
        typeof fileNameList?.[0] === "string" ? fileNameList?.[0] : "";

    const renderPreview = hasFile && (
        <Image
            alt="avatar"
            src={imgUrl}
            sx={{
                width: 1,
                height: 1,
                borderRadius: "50%",
            }}
        />
    );

    const renderPlaceholder = (
        <Stack
            alignItems="center"
            justifyContent="center"
            spacing={1}
            className="upload-placeholder"
            sx={{
                top: 0,
                left: 0,
                width: 1,
                height: 1,
                zIndex: 9,
                borderRadius: "50%",
                position: "absolute",
                color: "text.disabled",
                bgcolor: (theme) => alpha(theme.palette.grey[500], 0.08),
                transition: (theme) =>
                    theme.transitions.create(["opacity"], {
                        duration: theme.transitions.duration.shorter,
                    }),
                "&:hover": {
                    opacity: 0.72,
                },
                ...(hasError && {
                    color: "error.main",
                    bgcolor: (theme) => alpha(theme.palette.error.main, 0.08),
                }),
                ...(hasFile && {
                    zIndex: 9,
                    opacity: 0,
                    color: "common.white",
                    bgcolor: (theme) => alpha(theme.palette.grey[900], 0.64),
                }),
            }}>
            <Iconify icon="solar:camera-add-bold" width={32} />
        </Stack>
    );
    const removeSinglePreview = hasFile && onDel && (
        <IconButton
            size="small"
            onClick={(e) => {
                e.stopPropagation();
                onDel!?.(fileNameList?.[0] as string);
            }}
            sx={{
                top: 0,
                right: 0,
                zIndex: 9,
                position: "absolute",
                color: (theme) => alpha(theme.palette.common.white, 0.8),
                bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
                "&:hover": {
                    bgcolor: (theme) => alpha(theme.palette.grey[900], 0.48),
                },
            }}>
            <Iconify icon="mingcute:close-line" width={18} />
        </IconButton>
    );
    const renderContent = (
        <Box
            sx={{
                width: 1,
                height: 1,
                overflow: "hidden",
                borderRadius: "50%",
                position: "relative",
            }}>
            {renderPreview}
            {renderPlaceholder}
        </Box>
    );

    return (
        <BoxContent
            sx={{
                width: "100px",
            }}
            {...getRootProps()}>
            <Box
                sx={{
                    position: "relative",
                }}>
                {imgUrl && (
                    <Avatar src={imgUrl} sx={{ width: 90, height: 90 }} />
                )}
                {!imgUrl && (
                    <Box
                        sx={{
                            p: 1,
                            m: "auto",
                            width: 90,
                            height: 90,
                            cursor: "pointer",
                            overflow: "hidden",
                            borderRadius: "50%",
                            border: (theme) =>
                                `1px dashed ${alpha(
                                    theme.palette.grey[500],
                                    0.2
                                )}`,
                            ...(isDragActive && {
                                opacity: 0.72,
                            }),
                            ...(disabled && {
                                opacity: 0.48,
                                pointerEvents: "none",
                            }),
                            ...(hasError && {
                                borderColor: "error.main",
                            }),
                            ...(hasFile && {
                                ...(hasError && {
                                    bgcolor: (theme) =>
                                        alpha(theme.palette.error.main, 0.08),
                                }),
                                "&:hover .upload-placeholder": {
                                    opacity: 1,
                                },
                            }),
                            ...sx,
                        }}>
                        <input {...getInputProps()} />
                        {renderContent}
                        {showLoading.value && (
                            <Box
                                sx={{
                                    position: "absolute",
                                    top: 0,
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    /*设置背景样式*/
                                    background: "rgba(255,255,255,0.1)",
                                    /*让透过card的底部元素模糊化,达到毛玻璃效果*/
                                    backdropFilter: "blur(5px)",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}>
                                <CircularProgress color="inherit" />
                            </Box>
                        )}
                    </Box>
                )}
                {removeSinglePreview}
                {helperText && helperText}
            </Box>
        </BoxContent>
    );
}
