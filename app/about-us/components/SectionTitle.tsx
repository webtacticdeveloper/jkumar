import { cn } from "@/lib/utils";

export default function SectionTitle({ title,white }: { title: string,white?:boolean}) {
  return (
    <div className="relative text-center mb-16">
      {/* Accent Lines */}
      <div className="flex items-center justify-center gap-4 mb-4">
        <div className="h-[2px] w-14 md:w-16 bg-gradient-to-r via-primary to-primary" />
        <h2 className={cn("text-2xl md:text-4xl font-bold tracking-tight capitalize text-center",white?"text-white":"text-black")}>
          {title}
        </h2>
        <div className="h-[2px] w-14 md:w-16 bg-gradient-to-r via-primary from-primary" />
      </div>

      {/* Subtle shadow line below (optional aesthetic line) */}
      <div className="absolute left-1/2 -bottom-3 w-24 h-[1px] -translate-x-1/2 bg-[var(--primary)]/30 rounded-full" />
    </div>
  );
}
