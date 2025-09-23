import { cn } from "@/lib/utils";

export function Logo({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-7 w-7", className)}
      {...props}
    >
      <path d="M12 2a10 10 0 1 0 10 10" stroke="hsl(var(--primary))" />
      <path d="M12 22a10 10 0 1 0-10-10" stroke="hsl(var(--primary))" />
      <circle cx="12" cy="12" r="2" fill="hsl(var(--accent))" />
      <path d="M12 2v2" stroke="hsl(var(--primary))" />
      <path d="M12 20v2" stroke="hsl(var(--primary))" />
      <path d="M2 12h2" stroke="hsl(var(--primary))" />
      <path d="M20 12h2" stroke="hsl(var(--primary))" />
      <path d="m5 5 2 2" stroke="hsl(var(--primary))" />
      <path d="m17 17 2 2" stroke="hsl(var(--primary))" />
      <path d="m5 19 2-2" stroke="hsl(var(--primary))" />
      <path d="m17 7-2-2" stroke="hsl(var(--primary))" />
    </svg>
  );
}
