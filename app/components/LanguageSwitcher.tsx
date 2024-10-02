"use client";

import { useRouter, usePathname } from "next/navigation";
import { useLocale } from "next-intl";
//import { locales } from "../../config";
import { routing } from "@/i18n/routing";

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;
    router.push(pathname.replace(`/${currentLocale}`, `/${newLocale}`));
  };

  return (
    <select onChange={handleChange} value={currentLocale} className="mt-4">
      {routing.locales.map((locale) => (
        <option key={locale} value={locale}>
          {locale === "en" ? "English" : "Hungarian"}
        </option>
      ))}
    </select>
  );
}
