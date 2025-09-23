import Image from "next/image";
import { PageHeader } from "@/components/shared/PageHeader";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const projects = [
  {
    title: "Project Chimera",
    description: "A foundational BCI operating system designed for stability and real-time neural data processing.",
    imageId: "project-1",
    tags: ["OS", "BCI", "Real-Time"],
  },
  {
    title: "Odyssey AGI",
    description: "An adaptive artificial general intelligence that learns and grows alongside its human partner.",
    imageId: "project-2",
    tags: ["AI", "Machine Learning"],
  },
  {
    title: "The Weaver Protocol",
    description: "A decentralized network protocol for secure, high-bandwidth mind-to-mind communication.",
    imageId: "project-3",
    tags: ["Networking", "Security", "Web3"],
  },
  {
    title: "Synapse Simulator",
    description: "A virtual environment for simulating and testing neural pathways and BCI applications before deployment.",
    imageId: "project-4",
    tags: ["Simulation", "Development Tool"],
  },
];

export default function ProjectsPage() {
  return (
    <div>
      <PageHeader
        title="Our Projects"
        subtitle="Witness the milestones of our journey into the future. Each project represents a leap forward in the fusion of mind and machine."
      />
      <div className="grid lg:grid-cols-2 gap-8">
        {projects.map((project, index) => {
          const placeholder = PlaceHolderImages.find(p => p.id === project.imageId);
          return (
            <AnimatedSection key={project.title} delay={index * 0.1}>
              <Card className="bg-card/50 backdrop-blur-sm border-primary/20 overflow-hidden group transition-all duration-300 hover:border-primary hover:box-glow">
                <CardHeader className="p-0 relative">
                  {placeholder && (
                    <Image
                      src={placeholder.imageUrl}
                      alt={`Screenshot of ${project.title}`}
                      width={600}
                      height={400}
                      className="w-full h-auto object-cover transition-all duration-300 group-hover:scale-105"
                      data-ai-hint={placeholder.imageHint}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                </CardHeader>
                <CardContent className="p-6 relative">
                  <CardTitle className="font-headline text-2xl mb-2 text-primary">{project.title}</CardTitle>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="font-code text-primary-foreground bg-primary/20 border-none">{tag}</Badge>
                    ))}
                  </div>
                  <CardDescription className="text-muted-foreground mb-4">{project.description}</CardDescription>
                  <Button variant="outline" asChild className="group/button hover:bg-primary/10 hover:text-primary">
                    <Link href="#">
                      View Details
                      <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover/button:translate-x-1 group-hover/button:-translate-y-1"/>
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </AnimatedSection>
          );
        })}
      </div>
    </div>
  );
}
