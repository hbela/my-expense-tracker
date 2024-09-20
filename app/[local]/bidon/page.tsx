import React from "react";
import { useTranslations } from "next-intl";

function PageBidon() {
  const t = useTranslations();
  return <div>PageBidon {t("appName")}</div>;
}

export default PageBidon;
