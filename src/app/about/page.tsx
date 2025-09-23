import Image from "next/image";
import { PageHeader } from "@/components/shared/PageHeader";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { cn } from "@/lib/utils";

const teamMembers = [
  {
    name: "Dr. Aris Thorne",
    role: "Founder & Chief Neuroscientist",
    imageId: "team-1",
  },
  {
    name: "Jena Valerius",
    role: "Lead BCI Engineer",
    imageId: "team-2",
  },
  {
    name: "Kaelen Rask",
    role: "Cognitive AI Specialist",
    imageId: "team-3",
  },
  {
    name: "Zyla Nyx",
    role: "Quantum Data Analyst",
    imageId: "team-4",
  },
];

export default function AboutPage() {
  return (
    <div>
      <PageHeader
        title="About FrontalMinds"
        subtitle="Unveiling the architects of tomorrow's consciousness. We are a collective of scientists, engineers, and visionaries dedicated to transcending the limits of the human mind."
      />

      <AnimatedSection className="mb-24">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-4">
            <h2 className="font-headline text-3xl md:text-4xl font-bold text-glow">Our Mission</h2>
            <p className="text-muted-foreground text-lg">
              To democratize cognitive enhancement through safe, accessible, and revolutionary neural interface technology. We believe in a future where human potential is not limited by biology, but expanded by ethical innovation.
            </p>
          </div>
          <div className="space-y-4">
            <h2 className="font-headline text-3xl md:text-4xl font-bold text-glow">Our Vision</h2>
            <p className="text-muted-foreground text-lg">
              To create a seamless symbiosis between human consciousness and artificial intelligence, fostering a new era of creativity, learning, and understanding. We envision a world connected not just by networks, but by minds.
            </p>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection>
        <h2 className="text-center font-headline text-4xl md:text-5xl font-bold mb-12 text-glow">Meet the Team</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => {
            const placeholder = PlaceHolderImages.find(p => p.id === member.imageId);
            return (
              <AnimatedSection key={member.name} delay={index * 0.1}>
                <Card className="bg-card/50 backdrop-blur-sm border-primary/20 overflow-hidden text-center group transition-all duration-300 hover:border-primary hover:scale-105 hover:box-glow">
                  <CardHeader className="p-0">
                    {placeholder && (
                       <Image
                        src={placeholder.imageUrl}
                        alt={`Portrait of ${member.name}`}
                        width={400}
                        height={400}
                        className="w-full h-auto object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                        data-ai-hint={placeholder.imageHint}
                      />
                    )}
                  </CardHeader>
                  <CardContent className="p-4">
                    <CardTitle className="font-headline text-xl text-primary">{member.name}</CardTitle>
                    <CardDescription className="text-muted-foreground">{member.role}</CardDescription>
                  </CardContent>
                </Card>
              </AnimatedSection>
            );
          })}
        </div>
      </AnimatedSection>
    </div>
  );
}
