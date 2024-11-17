"use client";

import { Stack } from "@mui/material";
import { useState } from "react";
import { create } from "zustand";
import { toStream } from "zustand-rx";
import { combine } from "zustand/middleware";

const useStore = create(
    combine({ bears: 0 }, (set) => ({
        increase: (by: number) => set((state) => ({ bears: state.bears + by })),
    }))
);

const bears$ = toStream(useStore, (state) => state.bears, {
    fireImmediately: true,
});
bears$.subscribe({
    next() {},
});

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

export const View = () => {
    const [tabId, setTabId] = useState("1");
    const increasePopulation = useStore((state) => state.increase);
    return (
        <Stack
            sx={{
                width: "100%",
                padding: "32px",
            }}></Stack>
    );
};
