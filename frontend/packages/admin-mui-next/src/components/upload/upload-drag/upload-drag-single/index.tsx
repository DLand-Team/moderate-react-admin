import { CircularProgress } from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { alpha } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useBoolean } from "src/common/hooks";
import { Iconify } from "../../../iconify";
import icon from "../../ic-eva_cloud-upload-fill.svg";
import { UploadProps } from "../../types";
import SingleFilePreview from "./preview-single-file";

export function UploadDragSingle({
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
    const [fileList, setFileList] = useState<File[]>([]);
    const { getRootProps, getInputProps, isDragActive, isDragReject } =
        useDropzone({
            multiple,
            disabled,
            onDropAccepted: () => {
                document.body.focus();
            },
            onDrop: async (acceptedFiles) => {
                onDel!?.(fileNameList?.[0] as string);
                showLoading.onTrue();
                if (acceptedFiles[0]) {
                    const newFile = await uploadAction?.(
                        acceptedFiles[0]
                    ).finally(() => {
                        showLoading.onFalse();
                    });
                    if (newFile!) {
                        onAdd!?.(newFile);
                        setFileList([...fileList, ...acceptedFiles]);
                    }
                }
            },
            ...other,
        });
    useEffect(() => {
        files && setFilenameList((files as string[])!);
    }, [files]);
    // 单文件模式：存在文件
    const hasFile = fileNameList.length > 0;
    // 存在错误
    const hasError = isDragReject || !!error;
    // Placeholder
    const renderPlaceholder = (
        <Stack
            spacing={3}
            alignItems="center"
            justifyContent="center"
            flexWrap="wrap">
            <Box
                component="img"
                src={"src" in (icon as any) ? icon["src"] : icon}
                sx={{
                    width: 52,
                    height: 52,
                    flexShrink: 0,
                    ...sx,
                }}
            />
            <Stack spacing={1} sx={{ textAlign: "center" }}>
                {placeholder || uploadLoabel ? (
                    <>{uploadLoabel}</>
                ) : (
                    <Typography sx={{ color: "#919EAB", fontSize: "14px" }}>
                        {"Drag and drop or click to choose files"}
                    </Typography>
                )}
            </Stack>
        </Stack>
    );

    // 显示单文件
    const renderSinglePreview = RenderPreview ? (
        <RenderPreview
            src={typeof fileNameList?.[0] == "string" ? fileNameList?.[0] : ""}
        />
    ) : (
        !multiple && (
            <SingleFilePreview
                type={fileList?.[0]?.type}
                imgUrl={
                    typeof fileNameList?.[0] == "string"
                        ? fileNameList?.[0]
                        : ""
                }
            />
        )
    );
    // 去除单文件按钮
    const removeSinglePreview = hasFile && onDel && (
        <IconButton
            size="small"
            onClick={() => {
                onDel!?.(fileNameList?.[0] as string);
            }}
            sx={{
                top: 16,
                right: 16,
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

    return (
        <Box sx={{ width: 1, position: "relative", ...sx }}>
            <Box
                {...getRootProps()}
                sx={{
                    p: 5,
                    outline: "none",
                    borderRadius: `var(--radius-15, 12px)`,
                    cursor: "pointer",
                    overflow: "hidden",
                    position: "relative",
                    background: "var(--grey-8, rgba(145, 158, 171, 0.08))",
                    border: `1px dashed var(--Scaling-Grey2, #696969)`,
                    // border: (theme) => `1px dashed ${alpha(theme.palette.grey[500], 0.2)}`,
                    transition: (theme) =>
                        theme.transitions.create(["opacity", "padding"]),
                    "&:hover": {
                        opacity: 0.72,
                    },
                    ...(isDragActive && {
                        opacity: 0.72,
                    }),
                    ...(disabled && {
                        opacity: 0.48,
                        pointerEvents: "none",
                    }),
                    ...(hasError && {
                        color: "error.main",
                        borderColor: "error.main",
                        bgcolor: (theme) =>
                            alpha(theme.palette.error.main, 0.08),
                    }),
                    ...(hasFile && {
                        padding: "24% 0",
                    }),
                }}>
                <input {...getInputProps()} />
                {hasFile ? renderSinglePreview : renderPlaceholder}

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
            {removeSinglePreview}
            {helperText && helperText}
        </Box>
    );
}
