import { Stack, TextField } from "@mui/material";
import Link from "next/link";

export default function View() {
    return (
        <Stack
            sx={{
                width: "100%",
                padding: "32px",
            }}>
            App
            <TextField />
            <Link prefetch={true} href={"/dashboard/market"}>
                to testA
            </Link>
        </Stack>
    );
}
