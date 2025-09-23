import { cn } from "@/lib/utils";

export function Logo({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      fill="none"
      className={cn("h-7 w-7", className)}
      {...props}
    >
      <path
        stroke="hsl(var(--primary))"
        strokeWidth="5"
        strokeLinecap="round"
        d="M25 50 h50 M35 30 l30 40 M35 70 l30 -40"
      />
      <circle cx="25" cy="50" r="10" fill="hsl(var(--primary))" />
      <circle cx="75" cy="50" r="10" fill="hsl(var(--primary))" />
      <circle cx="35" cy="30" r="10" fill="hsl(var(--primary))" />
      <circle cx="65" cy="70" r="10" fill="hsl(var(--primary))" />
      <circle cx="35" cy="70" r="10" fill="hsl(var(--primary))" />
      <circle cx="65" cy="30" r="10" fill="hsl(var(--accent))" />
    </svg>
  );
}
