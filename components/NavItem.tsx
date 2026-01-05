/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";

function NavItem({ item, scrolled, depth = 0 }: any) {
  const [isOpen, setIsOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });

  // FIX: Separate refs for <div> (depth=0) and <li> (depth>=1)
  const rootRef = useRef<HTMLDivElement | null>(null);
  const liRef = useRef<HTMLLIElement | null>(null);

  // choose correct ref automatically
  const itemRef = depth === 0 ? rootRef : liRef;

  const hasChildren = item.submenu && item.submenu.length > 0;

  const handleMouseEnter = () => {
    const el = itemRef.current;
    if (el && hasChildren) {
      const rect = el.getBoundingClientRect();

      if (depth > 0) {
        setCoords({ top: rect.top, left: rect.right });
      } else {
        setCoords({ top: rect.bottom, left: rect.left });
      }
      setIsOpen(true);
    }
  };

  const handleMouseLeave = () => setIsOpen(false);

  // --------------- LEVEL 1 -----------------
  if (depth === 0) {
    return (
      <div
        ref={rootRef}
        className="relative group"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className={cn(
            "relative flex items-center gap-x-2 transition cursor-pointer group-hover:text-[var(--primary)]",
            scrolled
              ? "text-[var(--overlay-light)]"
              : "text-[var(--overlay-light)]"
          )}
        >
          {item.title}

          <span className="transition-transform group-hover:rotate-180">
            <ChevronDown size={20} />
          </span>

          {/* Underline hover */}
          <span className="absolute left-1/2 -bottom-[2px] w-0 h-[2px] bg-[var(--primary)] transition-all group-hover:w-full group-hover:left-0" />
        </div>

        {hasChildren && isOpen && (
          <div className="absolute left-[-15] top-full pt-2 w-64 z-50">
            <ul className="bg-background w-[180px]  text-gray-800 shadow-xl rounded-sm py-2 max-h-90 overflow-y-auto">
              {item.submenu.map((child: any, idx: number) => (
                <NavItem key={idx} item={child} depth={1} />
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }

  // ---------------- LEVEL 2+ ----------------
  return (
    <li
      ref={liRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <a
        href={item.href}
        className={`
          flex items-center justify-between px-5 py-3 text-sm transition-colors cursor-pointer
          hover:bg-yellow-300 hover:text-black
          ${hasChildren ? "pr-4" : ""}
        `}
      >
        <span className="flex-1">{item.title}</span>

        {hasChildren && (
          <div className="w-4 flex justify-center flex-shrink-0">
            <ChevronRight className="w-4 h-4 text-gray-500" />
          </div>
        )}
      </a>

      {hasChildren && isOpen && (
        <div
          className="fixed w-72 z-[9999]"
          style={{
            top: coords.top,
            left: coords.left,
          }}
        >
          <ul
            className="bg-background w-[210px] text-gray-800 shadow-2xl rounded-sm border-l border-gray-100 py-2 max-h-[460px] overflow-y-auto"
          >
            {item.submenu.map((child: any, idx: number) => (
              <NavItem key={idx} item={child} depth={depth + 1} />
            ))}
          </ul>
        </div>
      )}
    </li>
  );
}

export default NavItem;
