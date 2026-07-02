import { cn } from "@/lib/utils"

export function LogBrasilLogo({
  light = false,
  className,
}: {
  light?: boolean
  className?: string
}) {
  const primary = light ? "text-white" : "text-[#13234d]"
  const sub = light ? "text-white/70" : "text-[#13234d]/60"

  return (
    <span className={cn("inline-flex items-center gap-1.5", className)}>
      <span className="flex items-center rounded-md bg-[#f2b63d] px-1.5 py-0.5">
        <span className="font-heading text-lg font-black italic leading-none tracking-tighter text-[#13234d]">LB</span>
      </span>
      <span className="flex flex-col leading-none">
        <span className="flex items-baseline">
          <span className={cn("font-heading text-lg font-black tracking-tight", primary)}>LOG</span>
          <span className="font-heading text-lg font-black tracking-tight text-[#f2b63d]">BRASIL</span>
        </span>
        <span className={cn("mt-1 text-[8px] font-semibold uppercase tracking-[0.3em]", sub)}>Logística</span>
      </span>
    </span>
  )
}
