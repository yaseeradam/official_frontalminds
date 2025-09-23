import { projects } from '@/lib/projects-data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

type ProjectPageProps = {
  params: {
    id: string;
  };
};

export function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id,
  }));
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = projects.find((p) => p.id === params.id);

  if (!project) {
    notFound();
  }
  
  const placeholder = PlaceHolderImages.find(p => p.id === project.imageId);

  return (
    <AnimatedSection>
        <Button asChild variant="outline" className="mb-8 group">
            <Link href="/projects">
                <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Back to Projects
            </Link>
        </Button>

      <div className="grid md:grid-cols-5 gap-8 lg:gap-12">
        <div className="md:col-span-3">
          <h1 className="font-headline text-4xl md:text-5xl font-bold mb-4 text-glow">{project.title}</h1>
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map(tag => (
              <Badge key={tag} variant="secondary" className="font-code text-primary-foreground bg-primary/20 border-none">{tag}</Badge>
            ))}
          </div>
          <p className="text-lg text-muted-foreground mb-8">
            {project.description}
          </p>

          <div className="space-y-6">
            {project.details?.map((detail, index) => (
                <div key={index}>
                    <h3 className="font-headline text-2xl font-semibold mb-2 text-primary">{detail.title}</h3>
                    <p className="text-muted-foreground">{detail.description}</p>
                </div>
            ))}
          </div>
        </div>
        <div className="md:col-span-2">
            {placeholder && (
            <Image
                src={placeholder.imageUrl}
                alt={`Screenshot of ${project.title}`}
                width={600}
                height={400}
                className="w-full h-auto object-cover rounded-lg border border-primary/20 box-glow"
                data-ai-hint={placeholder.imageHint}
            />
            )}
        </div>
      </div>
    </AnimatedSection>
  );
}
