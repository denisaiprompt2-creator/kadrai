import { cn } from "@/lib/utils";

export function KadrMark({
  className,
  tone = "default",
}: {
  className?: string;
  tone?: "default" | "accent";
}) {
  const outerFill = tone === "accent" ? "fill-[#ccff00]" : "fill-foreground";
  const midFill = tone === "accent" ? "fill-[#ccff00]" : "fill-primary";
  const holeFill = tone === "accent" ? "fill-[#09090b]" : "fill-foreground";
  const windowFill = tone === "accent" ? "fill-[#09090b]" : "fill-background";

  return (
    <svg
      viewBox="0 0 32 32"
      className={cn("size-8", className)}
      aria-hidden="true"
    >
      <rect width="32" height="32" rx="6" className={outerFill} />
      <rect x="3" y="5" width="26" height="22" rx="2" className={midFill} />
      <rect x="5" y="8" width="3" height="3" className={holeFill} />
      <rect x="5" y="14.5" width="3" height="3" className={holeFill} />
      <rect x="5" y="21" width="3" height="3" className={holeFill} />
      <rect x="24" y="8" width="3" height="3" className={holeFill} />
      <rect x="24" y="14.5" width="3" height="3" className={holeFill} />
      <rect x="24" y="21" width="3" height="3" className={holeFill} />
      <rect x="10" y="8" width="12" height="16" className={holeFill} />
      <rect x="11" y="9" width="10" height="14" className={windowFill} />
    </svg>
  );
}
