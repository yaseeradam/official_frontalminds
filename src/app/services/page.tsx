import { PageHeader } from "@/components/shared/PageHeader";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BrainCircuit, Zap, Puzzle, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";

const services = [
  {
    icon: BrainCircuit,
    title: "Neuro-Augmentation Suite",
    description: "Enhance cognitive functions like memory, focus, and learning speed with our flagship neural implant technology.",
  },
  {
    icon: Zap,
    title: "BCI Development Kits",
    description: "For researchers and developers. Create custom applications for Brain-Computer Interfaces with our open-source SDKs.",
  },
  {
    icon: Puzzle,
    title: "Cognitive AGI Integration",
    description: "Seamlessly integrate with advanced AI for collaborative problem-solving and expanded creative capabilities.",
  },
  {
    icon: Share2,
    title: "Collective Consciousness Network",
    description: "Participate in a secure, shared mental space for global collaboration and instantaneous knowledge transfer. (Alpha)",
  },
];

export default function ServicesPage() {
  return (
    <div>
      <PageHeader
        title="Our Services"
        subtitle="Explore our cutting-edge solutions designed to unlock the next stage of human evolution. Each service is a gateway to unparalleled cognitive abilities."
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service, index) => (
          <AnimatedSection key={service.title} delay={index * 0.1}>
            <Card className="h-full bg-card/50 backdrop-blur-sm border-primary/20 group transition-all duration-300 hover:border-primary hover:-translate-y-2 hover:box-glow">
              <CardHeader className="flex flex-row items-start gap-4 space-y-0 pb-3">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <service.icon className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <CardTitle className="font-headline text-lg text-primary-foreground leading-tight">{service.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm text-muted-foreground">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          </AnimatedSection>
        ))}
      </div>
    </div>
  );
}
