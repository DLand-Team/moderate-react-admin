import { CircularProgress } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { alpha } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useBoolean } from "src/common/hooks";
import icon from "../../ic-eva_cloud-upload-fill.svg";
import { UploadProps } from "../../types";
import CropModal from "../cropModal";
import MultiFilePreview from "./preview-multi-file";
// ----------------------------------------------------------------------
function file2DataUrl(
    file: File,
    callback: (res: string | ArrayBuffer | null) => void
) {
    var reader = new FileReader();
    reader.onload = function () {
        callback(reader.result);
    };
    reader.readAsDataURL(file); //FileReader对象的方法，可以读取Blob或者File对象的数据，转化为dataURL格式
}
export function UploadDragMul({
    onDel,
    onDelete,
    onUpload,
    onRemove,
    onAdd,
    onRemoveAll,
    uploadAction,
    onOrder,
    validateFunc,
    renderPreviewItem,
    disabled,
    multiple = false,
    error,
    placeholder,
    helperText,
    sx,
    files,
    thumbnail,
    isCrop,
    uploadLoabel,
    ...other
}: UploadProps) {
    // crop
    // crop 临时本地预览
    const [previewUrl, setPreviewUrl] = useState("");
    // cropModal
    const [isCropModalOpen, setIsCropModalOpen] = useState(false);
    const [fileName, setFileName] = useState("");
    const showLoading = useBoolean(false);
    // file类型的数组
    const [fileList, setFileList] = useState<File[]>([]);
    // 文件名数组
    const [fileNameList, setFilenameList] = useState<string[]>(
        (files as string[]) || []
    );
    useEffect(() => {
        files && setFilenameList((files as string[])!);
    }, [files]);
    const { getRootProps, getInputProps, isDragActive, isDragReject } =
        useDropzone({
            multiple,
            disabled,
            onDropAccepted: () => {
                document.body.focus();
            },
            onDrop: async (acceptedFiles) => {
                if (isCrop) {
                    file2DataUrl(acceptedFiles[0], (res) => {
                        setPreviewUrl(res as string);
                        setFileName(acceptedFiles[0].name);
                        setIsCropModalOpen(true);
                    });
                } else {
                    showLoading.onTrue();
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

    // 多文件模式：存在文件
    const hasFiles = fileNameList.length;
    // 存在错误
    const hasError = isDragReject || !!error;
    // Placeholder
    const renderPlaceholder = (
        <Stack
            className="uploadDragMul"
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
    // 移动文件
    const moveCard = (dragIndex: number, hoverIndex: number) => {
        // 调整顺序
        const fileNameListTemp = [...fileNameList];
        let temp = fileNameListTemp[dragIndex];
        fileNameListTemp[dragIndex] = fileNameListTemp[hoverIndex];
        fileNameListTemp[hoverIndex] = temp;
        // 设置外部驱动的数据源头
        onOrder?.(fileNameListTemp);
    };
    const renderMultiPreview = (hasFiles || fileNameList.length > 0) && (
        <>
            <Box sx={{ my: 3 }}>
                <MultiFilePreview
                    renderPerviewItem={renderPreviewItem}
                    moveCard={moveCard}
                    onRemove={(fileName, index) => {
                        if (typeof fileName == "string") {
                            onDel!?.(fileName);
                            if (typeof index == "number") {
                                fileNameList.splice(index!, 1);
                                fileList.splice(index, 1);
                                setFilenameList([...fileNameList]);
                                setFileList([...fileList]);
                            }
                        }
                    }}
                    files={fileList}
                    fileNameList={fileNameList}
                />
            </Box>

            <Stack direction="row" justifyContent="flex-end" spacing={1.5}>
                {onRemoveAll && (
                    <Button
                        color="inherit"
                        variant="outlined"
                        size="small"
                        onClick={onRemoveAll}>
                        Remove All
                    </Button>
                )}
            </Stack>
        </>
    );
    const handleOpenChange = () => {
        if (isCropModalOpen) {
            setIsCropModalOpen(false);
            setPreviewUrl("");
            setFileName("");
        }
    };
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
                    bgcolor: (theme) => alpha(theme.palette.grey[500], 0.08),
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
                }}>
                <input {...getInputProps()} />
                {renderPlaceholder}
            </Box>
            {showLoading.value && (
                <Box
                    sx={{
                        position: "absolute",
                        top: -10,
                        bottom: -10,
                        left: -10,
                        right: -10,
                        /*设置背景样式*/
                        background: "rgba(255,255,255,0.1)",
                        /*让透过card的底部元素模糊化,达到毛玻璃效果*/
                        backdropFilter: "blur(5px)",
                        boxShadow: "inset 0 0 6px rgba(255, 255, 255, 0.2)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 10,
                    }}>
                    <CircularProgress color="inherit" />
                </Box>
            )}
            <CropModal
                name={fileName}
                onComplete={async (file) => {
                    showLoading.onTrue();
                    const newFile = await uploadAction?.(file).finally(() => {
                        showLoading.onFalse();
                    });
                    if (newFile!) {
                        onAdd!?.(newFile);
                        setFileList([...fileList, file]);
                    }
                }}
                src={previewUrl}
                open={isCropModalOpen}
                setOpen={handleOpenChange}
                validateFunc={validateFunc}></CropModal>
            {helperText && helperText}
            {renderMultiPreview}
        </Box>
    );
}
