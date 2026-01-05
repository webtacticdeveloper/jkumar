"use client";

export default function NavbarSkeleton() {
  return (
    <nav
      className="
        fixed top-0 z-50 flex w-full items-center justify-between 
        px-4 md:px-16 py-5
      "
    >
      {/* --- LEFT: LOGO + TITLE SKELETON --- */}
      <div className="flex items-center gap-3">
        <div className="h-14 w-14 rounded-full bg-neutral-800/40 animate-pulse" />

        <div className="h-4 w-40 md:w-64 rounded bg-neutral-800/40 animate-pulse" />
      </div>

      {/* --- RIGHT SIDE SKELETON --- */}
      <div className="flex items-center gap-8">
        {/* Contact info (hidden on mobile) */}
        <div className="hidden tablet:flex items-center gap-7">
          <div className="h-4 w-40 rounded bg-neutral-800/40 animate-pulse" />
          <div className="h-4 w-32 rounded bg-neutral-800/40 animate-pulse" />
        </div>

        {/* Menu icon */}
        <div className="h-10 w-10 rounded-lg bg-neutral-800/40 animate-pulse" />
      </div>
    </nav>
  );
}
