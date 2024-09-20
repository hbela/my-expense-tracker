"use client";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Moon, Sun, ReceiptText } from "lucide-react";
import { useTranslations } from "next-intl";

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const t = useTranslations();

  return (
    <nav className="flex justify-between items-center p-4 bg-background">
      <div className="flex items-center space-x-2">
        <ReceiptText className="h-6 w-6 text-primary" />
        <div className="text-2xl font-bold">{t("appName")}</div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    </nav>
  );
}
