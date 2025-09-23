import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { Button } from '@/components/ui/button';
import { ArrowRight, BrainCircuit, Zap, Puzzle } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const featuredServices = [
  {
    icon: BrainCircuit,
    title: 'Neuro-Augmentation',
    description: 'Enhance cognitive functions like memory, focus, and learning speed.',
  },
  {
    icon: Zap,
    title: 'BCI Development Kits',
    description: 'Create custom applications for Brain-Computer Interfaces with our open-source SDKs.',
  },
  {
    icon: Puzzle,
    title: 'Cognitive AGI Integration',
    description: 'Seamlessly integrate with advanced AI for collaborative problem-solving.',
  },
];

export default function Home() {
  return (
    <div className="space-y-24 md:space-y-32">
      <AnimatedSection className="flex flex-col items-center justify-center text-center pt-16 md:pt-24">
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

      <AnimatedSection>
        <div className="text-center">
            <h2 className="font-headline text-4xl md:text-5xl font-bold mb-4 text-glow">Unlock Your Potential</h2>
            <p className="max-w-2xl mx-auto text-lg text-muted-foreground mb-12">
                Our services are at the forefront of cognitive enhancement technology.
            </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredServices.map((service, index) => (
                <AnimatedSection key={service.title} delay={index * 0.1}>
                    <Card className="h-full bg-card/50 backdrop-blur-sm border-primary/20 group transition-all duration-300 hover:border-primary hover:-translate-y-2 hover:box-glow text-center">
                         <CardHeader className="flex flex-col items-center text-center p-6 pb-2">
                            <div className="bg-primary/10 p-4 rounded-full mb-4">
                                <service.icon className="h-8 w-8 text-white" />
                            </div>
                            <CardTitle className="font-headline text-xl text-primary-foreground leading-tight">{service.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 pt-0">
                             <CardDescription className="text-muted-foreground">
                                {service.description}
                            </CardDescription>
                        </CardContent>
                    </Card>
                </AnimatedSection>
            ))}
        </div>
      </AnimatedSection>
      
      <AnimatedSection className="text-center">
          <h2 className="font-headline text-4xl md:text-5xl font-bold mb-4 text-glow">Our Blueprint for the Future</h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground mb-8">
            Explore the groundbreaking projects that are paving the way for a new era of human consciousness.
          </p>
          <Button asChild size="lg" className="font-bold text-lg group transition-all duration-300 hover:box-glow">
              <Link href="/projects">
                  View Our Projects
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
          </Button>
      </AnimatedSection>
    </div>
  );
}
