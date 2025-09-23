import { AnimatedSection } from "./AnimatedSection";

interface PageHeaderProps {
  title: string;
  subtitle: string;
}

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <AnimatedSection className="text-center mb-16">
      <h1 className="font-headline text-5xl md:text-6xl font-bold tracking-tighter mb-4">
        <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent text-glow">
          {title}
        </span>
      </h1>
      <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground">
        {subtitle}
      </p>
    </AnimatedSection>
  );
}
