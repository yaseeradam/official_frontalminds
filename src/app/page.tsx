import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { Button } from '@/components/ui/button';
import { ArrowRight, Globe, Smartphone, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Testimonials } from '@/components/home/Testimonials';

const featuredServices = [
  {
    icon: Globe,
    title: 'Website Development',
    description: 'Building modern, responsive websites tailored to your business needs.',
  },
  {
    icon: Smartphone,
    title: 'Mobile App Development',
    description: 'Creating intuitive and robust mobile applications for iOS and Android.',
  },
  {
    icon: ShieldCheck,
    title: 'Cybersecurity Solutions',
    description: 'Protecting your digital assets with comprehensive security services.',
  },
];

const techStack = [
    { name: "Next.js", icon: "/tech/nextjs.svg" },
    { name: "React", icon: "/tech/react.svg" },
    { name: "Tailwind CSS", icon: "/tech/tailwind.svg" },
    { name: "Firebase", icon: "/tech/firebase.svg" },
    { name: "Node.js", icon: "/tech/nodejs.svg" },
    { name: "TypeScript", icon: "/tech/typescript.svg" },
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
          Pioneering the future of digital solutions. We merge innovative technology with clear-minded strategy to unlock your business potential.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild size="lg" className="font-bold text-lg group transition-all duration-300 hover:box-glow">
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
            <h2 className="font-headline text-4xl md:text-5xl font-bold mb-4 text-glow">Our Core Expertise</h2>
            <p className="max-w-2xl mx-auto text-lg text-muted-foreground mb-12">
                We deliver cutting-edge digital solutions tailored to your business needs.
            </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredServices.map((service, index) => (
                <AnimatedSection key={service.title} delay={index * 0.1}>
                    <Card className="h-full bg-card/50 backdrop-blur-sm border-primary/20 group transition-all duration-300 hover:border-primary hover:-translate-y-2 hover:box-glow text-center">
                         <CardHeader className="flex flex-col items-center text-center p-6 pb-2">
                            <div className="bg-primary/10 p-4 rounded-full mb-4">
                                <service.icon className="h-8 w-8 text-primary" />
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

      <Testimonials />

       <AnimatedSection>
        <div className="text-center">
          <h2 className="font-headline text-4xl md:text-5xl font-bold mb-4 text-glow">Our Technology Stack</h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground mb-12">
            We use modern, robust, and scalable technologies to build our solutions.
          </p>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {techStack.map((tech) => (
            <div key={tech.name} className="flex flex-col items-center gap-2 text-center group">
              <div className="w-20 h-20 flex items-center justify-center p-3 bg-muted/50 rounded-full transition-all duration-300 group-hover:bg-primary/10 group-hover:scale-110 group-hover:box-glow">
                 <svg
                    role="img"
                    aria-label={`${tech.name} logo`}
                    className="w-full h-full text-foreground transition-colors group-hover:text-primary"
                    fill="currentColor"
                  >
                    <use href={tech.icon} />
                  </svg>
              </div>
              <p className="text-sm font-medium text-muted-foreground transition-colors group-hover:text-primary">{tech.name}</p>
            </div>
          ))}
        </div>
      </AnimatedSection>
      
      <AnimatedSection className="text-center">
          <h2 className="font-headline text-4xl md:text-5xl font-bold mb-4 text-glow">Our Blueprint for Success</h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground mb-8">
            Explore the groundbreaking projects that showcase our skills and innovation.
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
