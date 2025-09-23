import { cn } from "@/lib/utils";

export function Logo({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 84 74"
      fill="none"
      className={cn("h-7 w-7", className)}
      {...props}
    >
      <path
        d="M26.46 29.54v14.92m26.88-14.92v14.92m-26.88 0l-16.13 22.1m42.37-36.4L26.46 1.5M53.34 29.54H26.46m26.88 14.92H26.46"
        stroke="hsl(var(--primary))"
        strokeWidth="3"
        strokeLinecap="round"
      ></path>
      <circle
        cx="26.46"
        cy="29.54"
        r="6.96"
        fill="hsl(var(--primary))"
      ></circle>
      <circle
        cx="26.46"
        cy="44.46"
        r="6.96"
        fill="hsl(var(--primary))"
      ></circle>
      <circle
        cx="10.33"
        cy="66.56"
        r="6.96"
        transform="rotate(-90 10.33 66.56)"
        fill="hsl(var(--primary))"
      ></circle>
      <circle
        cx="42.59"
        cy="66.56"
        r="6.96"
        transform="rotate(-90 42.59 66.56)"
        fill="hsl(var(--primary))"
      ></circle>
      <circle
        cx="53.34"
        cy="29.54"
        r="6.96"
        fill="hsl(var(--primary))"
      ></circle>
      <circle
        cx="53.34"
        cy="44.46"
        r="6.96"
        fill="hsl(var(--primary))"
      ></circle>
      <circle
        cx="73.54"
        cy="10.46"
        r="8.96"
        fill="hsl(var(--accent))"
        stroke="#22274A"
        strokeWidth="3"
      ></circle>
    </svg>
  );
}
