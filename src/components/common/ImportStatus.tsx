"use client";

import clsx from "clsx";
import { FaCheck, FaSyncAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useImportStore } from "@/store/useImportStore";
import { FaX } from "react-icons/fa6";
import { useTranslations } from "next-intl";

export const ImportStatus = () => {
  const t = useTranslations("ImportStatus");
  const processType = useImportStore((s) => s.processType);
  const isImporting = useImportStore((s) => s.isImporting);
  const totalRecord = useImportStore((s) => s.totalRecord);
  const errorType = useImportStore((s) => s.errorType);

  const [show, setShow] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isImporting) {
      timeout = setTimeout(() => setShow(true), 0);
    } else {
      timeout = setTimeout(() => setShow(false), 3000);
    }

    return () => clearTimeout(timeout);
  }, [isImporting]);

  const errorMsg =
    errorType === "expired"
      ? t("urlExpired")
      : errorType === "network"
        ? t("networkError")
        : t("unknownError");

  const message = isImporting
    ? totalRecord
      ? t("found", { total: totalRecord })
      : processType === "import"
        ? t("importing")
        : t("syncing")
    : totalRecord
      ? t("added", { total: totalRecord })
      : errorType
        ? errorMsg
        : t("noNewRecords");

  const displayClass = show
    ? "translate-y-0 opacity-100 pointer-events-auto"
    : "-translate-y-full opacity-0 pointer-events-none";

  const coloringClass = isImporting
    ? "bg-neutral-300 text-black/80"
    : errorType
      ? "bg-red-500 text-white/80"
      : "bg-green-500 text-white/80";

  return (
    <div
      className={clsx(
        "fixed top-2 left-1/2 -translate-x-1/2 rounded-lg px-2 py-1 text-sm font-semibold flex items-center gap-2 transition-all duration-300 ease-out z-50",
        coloringClass,
        displayClass,
      )}
    >
      {isImporting ? (
        <FaSyncAlt className="animate-spin" />
      ) : errorType ? (
        <FaX />
      ) : (
        <FaCheck className="scale-110" />
      )}
      {message}
    </div>
  );
};
