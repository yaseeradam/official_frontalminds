import Image from "next/image";
import { PageHeader } from "@/components/shared/PageHeader";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { projects } from "@/lib/projects-data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function ProjectsPage() {
  return (
    <div>
      <PageHeader
        title="Our Projects"
        subtitle="Discover our portfolio of innovative digital solutions. Each project showcases our expertise in modern web development, mobile applications, and cutting-edge technology implementations."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                      width={400}
                      height={250}
                      className="w-full h-auto object-cover transition-all duration-300 group-hover:scale-105"
                      data-ai-hint={placeholder.imageHint}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                </CardHeader>
                <CardContent className="p-4 relative">
                  <CardTitle className="font-headline text-lg mb-2 text-primary">{project.title}</CardTitle>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {project.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="font-code text-xs text-primary-foreground bg-primary/20 border-none">{tag}</Badge>
                    ))}
                  </div>
                  <CardDescription className="text-sm text-muted-foreground mb-3 line-clamp-2">{project.description}</CardDescription>
                  <Button variant="outline" asChild className="group/button hover:bg-primary/10 hover:text-primary">
                    <Link href={`/projects/${project.id}`}>
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
