"use client";

import "src/common/utils/highlight";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { alpha } from "@mui/material/styles";
import { EditorProps } from "./types";
import { StyledEditor } from "./styles";
import Toolbar, { formats } from "./toolbar";

// ----------------------------------------------------------------------

export default function Editor({
    id = "quill",
    error,
    simple = false,
    helperText,
    sx,
    ...other
}: EditorProps) {
    const modules = {
        toolbar: {
            container: `#${id}`,
        },
        history: {
            delay: 500,
            maxStack: 100,
            userOnly: true,
        },
        syntax: true,
        clipboard: {
            matchVisual: false,
        },
    };

    return (
        <>
            <StyledEditor
                sx={{
                    ...(error && {
                        border: (theme) =>
                            `solid 1px ${theme.palette.error.main}`,
                        "& .ql-editor": {
                            bgcolor: (theme) =>
                                alpha(theme.palette.error.main, 0.08),
                        },
                    }),
                    ...sx,
                }}>
                <Toolbar id={id} isSimple={simple} />

                <ReactQuill
                    modules={modules}
                    formats={formats}
                    placeholder="Write something awesome..."
                    {...other}
                />
            </StyledEditor>

            {helperText && helperText}
        </>
    );
}

export type EditorType = typeof Editor;
