"use client";
import { forwardRef } from "react";
import { Icon } from "@iconify/react";

import { iconifyClasses } from "./classes";

import type { IconifyProps } from "./types";

import { useEffect, useState } from "react";

export function NoSsr({ children, fallback = null }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return fallback;
  return children;
}
// ----------------------------------------------------------------------

export const Iconify = forwardRef<SVGElement, IconifyProps>(
  ({ className, width = 20, sx, ...other }, ref) => {
    const baseStyles = {
      width,
      height: width,
      flexShrink: 0,
      display: "inline-flex",
    };

    const renderFallback = (
      <span
        className={iconifyClasses.root.concat(className ? ` ${className}` : "")}
        style={{ ...baseStyles, ...sx }}
      />
    );

    return (
      <NoSsr fallback={renderFallback}>
        <Icon
          ref={ref}
          className={iconifyClasses.root.concat(
            className ? ` ${className}` : "",
          )}
          style={{ ...baseStyles, ...sx }}
          {...other}
        />
      </NoSsr>
    );
  },
);
