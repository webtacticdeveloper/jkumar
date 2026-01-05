/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, SetStateAction } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export default function InvestorPaginatedList({ items }: any) {
  const ITEMS_PER_PAGE = 10;
  const [page, setPage] = useState(1);
  const [openId, setOpenId] = useState<string | undefined>();

  const start = (page - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;

  const paginatedItems = items.slice(start, end);
  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);

  return (
    <div className="space-y-8">
      {/* LIST */}
      <div className="bg-white border border-[var(--border)] rounded-b-xl shadow-sm divide-y divide-[var(--border)]">
        <Accordion
          type="single"
          collapsible
          value={openId}
          onValueChange={(v) => setOpenId(v || undefined)}
          className="w-full"
        >
          {paginatedItems.map((item: any) =>
            item.type === "file" ? (
              /* FILE ROW */
              <a
                href={item.url}
                target="_blank"
                key={item.id}
                className="group flex items-center justify-between px-5 py-4 transition-all text-[var(--foreground)] text-base font-medium hover:text-[var(--primary)]"
              >
                <p className="group-hover:text-primary">{item.name}</p>
                <p className="group-hover:text-primary text-xl">↗</p>
              </a>
            ) : (
              /* SHADCN ACCORDION ITEM */
              <AccordionItem key={item.id} value={item.id}>
                <AccordionTrigger
                  className="
                    px-5 cursor-pointer py-4 font-semibold text-[var(--foreground)]
                    hover:text-[var(--primary)] text-lg transition flex justify-between
                  "
                >
                  {item.title}
                </AccordionTrigger>

                <AccordionContent className="px-5 pb-4 space-y-3">
                  {item.documents.map((doc: any) => (
                    <a
                      key={doc.id}
                      href={doc.url}
                      target="_blank"
                      className="
                        flex group items-center justify-between
                        border-b border-[var(--border)]
                        pb-2 text-[var(--muted-foreground)]
                        text-sm group-hover:text-[var(--primary)]
                        transition-colors
                      "
                    >
                      <p className="group-hover:text-primary">{doc.name}</p>
                      <p className="group-hover:text-primary text-xl">↗</p>
                    </a>
                  ))}
                </AccordionContent>
              </AccordionItem>
            )
          )}
        </Accordion>
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <Pagination
          page={page}
          totalPages={totalPages}
          onChange={(p: SetStateAction<number>) => {
            setPage(p);
            setOpenId(undefined);
            window.scrollTo({ top: 0, behavior: "instant" });
          }}
        />
      )}
    </div>
  );
}

/* -----------------------------------------------------
   PAGINATION (unchanged)
------------------------------------------------------ */
function Pagination({ page, totalPages, onChange }: any) {
  const buttons: (number | string)[] = [];

  if (page <= 3) {
    const end = Math.min(5, totalPages);
    for (let i = 1; i <= end; i++) buttons.push(i);
    if (totalPages > 6) buttons.push("ellipsis-end");
    if (totalPages > 5) buttons.push(totalPages);
  } else if (page === 4 || page === 5) {
    const end = Math.min(6, totalPages);
    buttons.push(1);
    for (let i = 2; i <= end; i++) buttons.push(i);
    if (totalPages > 7) buttons.push("ellipsis-end");
    if (totalPages > 6) buttons.push(totalPages);
  } else if (page > 5 && page < totalPages - 3) {
    buttons.push(1);
    buttons.push("ellipsis-start");
    for (let i = page - 2; i <= page + 2; i++) buttons.push(i);
    buttons.push("ellipsis-end");
    buttons.push(totalPages);
  } else {
    buttons.push(1);
    if (totalPages > 7) buttons.push("ellipsis-start");
    const start = totalPages - 4;
    for (let i = start; i <= totalPages; i++) buttons.push(i);
  }

  return (
    <div className="flex justify-center items-center gap-2 mt-6">
      <button
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
        className="w-10 h-10 flex items-center justify-center rounded-full border border-[var(--border)] hover:bg-gray-100 text-sm disabled:opacity-40 transition"
      >
        ←
      </button>

      {buttons.map((btn, i) =>
        btn === "ellipsis-start" || btn === "ellipsis-end" ? (
          <span key={`ellipsis-${i}`} className="px-2 text-gray-400">
            …
          </span>
        ) : (
          <button
            key={`page-${btn}`}
            onClick={() => onChange(btn as number)}
            className={`
              w-10 h-10 flex items-center justify-center rounded-full border border-[var(--border)]
              text-sm transition
              ${
                page === btn
                  ? "bg-[var(--primary)] text-white border-[var(--primary)]"
                  : "hover:bg-gray-100"
              }
            `}
          >
            {btn}
          </button>
        )
      )}

      <button
        disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
        className="w-10 h-10 flex items-center justify-center rounded-full border border-[var(--border)] hover:bg-gray-100 text-sm disabled:opacity-40 transition"
      >
        →
      </button>
    </div>
  );
}
