import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <AnimatedSection className="flex flex-col items-center justify-center text-center h-full">
      <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6">
        <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent text-glow">
          Welcome to FrontalMinds
        </span>
      </h1>
      <p className="max-w-3xl text-lg md:text-xl text-muted-foreground mb-10">
        Pioneering the future of neural interfaces and cognitive enhancement. We merge technology with the mind to unlock human potential.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button asChild size="lg" className="font-bold text-lg group transition-all duration-300 hover:box-glow hover:text-primary-foreground">
          <Link href="/services">
            Explore Services
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
        <Button asChild size="lg" variant="outline" className="font-bold text-lg group transition-all duration-300 hover:border-primary hover:text-primary hover:bg-primary/10">
          <Link href="/contact">
            Contact Us
          </Link>
        </Button>
      </div>
    </AnimatedSection>
  );
}
