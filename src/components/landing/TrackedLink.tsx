"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { sendGtagEvent } from "@/lib/gtag";

type LinkProps = ComponentProps<typeof Link>;

type Props = LinkProps & {
  eventName: string;
  eventParams?: Record<string, string | number | boolean>;
};

export function TrackedLink({ eventName, eventParams, onClick, ...rest }: Props) {
  return (
    <Link
      {...rest}
      onClick={(e) => {
        sendGtagEvent(eventName, eventParams);
        onClick?.(e);
      }}
    />
  );
}
