/* eslint-disable react-hooks/rules-of-hooks */
"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import InvestorPaginatedList from "@/components/PaginatedList";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  subcategoryName: string;
  groups: any[];
}

export default function SubcategoryDropdownClient({
  subcategoryName,
  groups,
}: Props) {
  if (!groups || groups.length === 0) return null;

  // 🔹 Actual applied selection
  const [selectedGroupId, setSelectedGroupId] = React.useState<string>(
    String(groups[groups.length - 1].id)
  );

  // 🔹 Radix navigation value (fast)
  const [pendingValue, setPendingValue] = React.useState<string>(
    String(groups[groups.length - 1].id)
  );

  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const selectedGroup = groups.find(
    (g) => String(g.id) === selectedGroupId
  );

  const handleValueChange = (val: string) => {
    setPendingValue(val);

    // ⏱ debounce commit
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setSelectedGroupId(val);
    }, 150); // 👈 adjust if needed (120–200ms sweet spot)
  };

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className="p-6 min-h-screen max-w-5xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-bold text-black">
        {subcategoryName}
      </h1>

      {/* Dropdown */}
      <div className="mt-10 max-w-sm">
        <Select
          value={pendingValue}
          onValueChange={handleValueChange}
        >
          <SelectTrigger className="w-full bg-white">
            <SelectValue placeholder="Select year" />
          </SelectTrigger>

          <SelectContent
            position="popper"
            side="bottom"
            sideOffset={8}
            align="start"
            collisionPadding={20}
            className="z-50 max-h-72 overflow-y-auto"
          >
            {groups.map((g) => (
              <SelectItem
                key={String(g.id)}
                value={String(g.id)}
              >
                {g.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Documents */}
      {selectedGroup && (
        <div className="mt-10">
          <div className="bg-accent text-white font-semibold px-5 py-3 rounded-t-xl">
            {selectedGroup.title}
          </div>

          <InvestorPaginatedList
            items={selectedGroup.documents.map((d: any) => ({
              type: "file",
              id: d.id,
              name: d.name,
              url: d.url,
            }))}
          />
        </div>
      )}
    </div>
  );
}
