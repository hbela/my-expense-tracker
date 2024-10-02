"use client";

import clsx from "clsx";
import { useParams } from "next/navigation";
import { ChangeEvent, ReactNode, useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/routing";

type Props = {
  children: ReactNode;
  defaultValue: string;
  label: string;
};

export default function LocaleSwitcherSelect({
  children,
  defaultValue,
  label,
}: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();

  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value as string;
    console.log("LocaleSwitcherSelect nextLocale: ", nextLocale);

    if (isPending) return; // Prevent multiple transitions during pending state

    startTransition(() => {
      if (typeof pathname === "string") {
        // Get current query parameters from the URL
        const currentSearchParams = new URLSearchParams(window.location.search);

        // Update the locale in the query parameters
        currentSearchParams.set("locale", nextLocale);

        // Replace the router with updated params
        router.replace(`${pathname}?${currentSearchParams.toString()}`, {
          locale: nextLocale as "en" | "hu",
        });
      } else {
        console.error("Invalid pathname:", pathname);
      }
    });
  }

  return (
    <label
      className={clsx(
        "relative text-gray-400",
        isPending && "transition-opacity [&:disabled]:opacity-30"
      )}
    >
      <p className="sr-only">{label}</p>
      <select
        className="inline-flex appearance-none bg-transparent py-3 pl-2 pr-6"
        defaultValue={defaultValue}
        disabled={isPending}
        onChange={onSelectChange}
      >
        {children}
      </select>
      <span className="pointer-events-none absolute right-2 top-[8px]">⌄</span>
    </label>
  );
}
