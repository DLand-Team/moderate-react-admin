"use client";

import { Skeleton } from "../shadcn/components/ui/skeleton";

export function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[65px] max-w-(--skeleton-width) rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 max-w-(--skeleton-width) rounded" />
        <Skeleton className="h-4 max-w-(--skeleton-width) rounded" />
      </div>
    </div>
  );
}

export const KeepAliveSlot = (
  id: any,
  skeleton?: React.ReactNode | "TABLE" | "DEFAULT",
) => {
  return (
    <div id={id}>
      <SkeletonCard />
    </div>
  );
};
