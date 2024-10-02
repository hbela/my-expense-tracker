import { defineRouting } from "next-intl/routing";
import { createSharedPathnamesNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["en", "hu"],
  // Used when no locale matches
  defaultLocale: "en",
  pathnames: {
    // If locales use different paths, you can
    // specify each external path per locale
    "/bidon": {
      en: "/bad",
      hu: "/rossz",
    },
  },
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation(routing);
