
import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/shared/PageHeader";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { cn } from "@/lib/utils";
import { Target, Eye, ArrowRight, Linkedin, Twitter, Github, Mail, MessageCircle } from "lucide-react";

const teamMembers = [
  {
    name: "Alhafiz Yaseer K Adam",
    role: "Founder & Chief Dev",
    imageId: "team-1",
    social: {
      linkedin: "https://linkedin.com/in/yaseer-adam",
      twitter: "https://x.com/yaseerkadam",
      github: "https://github.com/yaseeradam/",
      whatsapp: "https://wa.me/8104827838",
      email: "engineeryaseerdl@gmail.com"
    }
  },
  {
    name: "Yusuf Abdullahi",
    role: "Chief Operating Officer",
    imageId: "team-2",
    social: {
      linkedin: "https://linkedin.com/in/yusuf-abdullahi",
      whatsapp: "https://wa.me/1234567891",
      email: "yusuf@frontalminds.com"
    }
  },
  {
    name: "Ibrahim Hamza",
    role: "Chief Technology Officer",
    imageId: "team-3",
    social: {
      linkedin: "https://linkedin.com/in/ibrahim-hamza",
      whatsapp: "https://wa.me/1234567892",
      email: "ibrahim@frontalminds.com"
    }
  },
  {
    name: "Abbas Aliyu",
    role: "Chief Finance Officer",
    imageId: "team-4",
    social: {
      linkedin: "https://linkedin.com/in/abbas-aliyu",
      whatsapp: "https://wa.me/1234567893",
      email: "abbas@frontalminds.com"
    }
  },
];

export default function AboutPage() {
  return (
    <div>
      <PageHeader
        title="About FrontalMinds"
        subtitle="Meet the innovative minds behind FrontalMinds. We're a passionate team of developers, engineers, and tech enthusiasts committed to building cutting-edge solutions that shape the future of technology and push the boundaries of what's possible."
      />

      <AnimatedSection className="mb-24">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          <Card className="flex flex-col bg-card/50 backdrop-blur-sm border-primary/20 transition-all duration-300 hover:border-primary hover:box-glow">
            <CardHeader className="flex-row gap-4 items-center">
               <div className="bg-primary/10 p-3 rounded-full box-glow">
                <Target className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="font-headline text-3xl text-glow">Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-lg">
                To democratize cognitive enhancement through safe, accessible, and revolutionary neural interface technology. We believe in a future where human potential is not limited by biology, but expanded by ethical innovation.
              </p>
            </CardContent>
          </Card>
          
          <Card className="flex flex-col bg-card/50 backdrop-blur-sm border-primary/20 transition-all duration-300 hover:border-primary hover:box-glow">
             <CardHeader className="flex-row gap-4 items-center">
               <div className="bg-primary/10 p-3 rounded-full box-glow">
                <Eye className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="font-headline text-3xl text-glow">Our Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-lg">
                To create a seamless symbiosis between human consciousness and artificial intelligence, fostering a new era of creativity, learning, and understanding. We envision a world connected not just by networks, but by minds.
              </p>
            </CardContent>
          </Card>
        </div>
      </AnimatedSection>

      <AnimatedSection className="mb-24">
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
                    <CardDescription className="text-muted-foreground mb-4">{member.role}</CardDescription>

                    {/* Social Media Buttons */}
                    <div className="flex justify-center space-x-3">
                      {member.social.linkedin && (
                        <Link
                          href={member.social.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-primary/10 hover:bg-primary/20 p-2 rounded-full transition-all duration-300 hover:scale-110 hover:text-primary"
                        >
                          <Linkedin className="h-4 w-4" />
                        </Link>
                      )}
                      {member.social.twitter && (
                        <Link
                          href={member.social.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-primary/10 hover:bg-primary/20 p-2 rounded-full transition-all duration-300 hover:scale-110 hover:text-primary"
                        >
                          <Twitter className="h-4 w-4" />
                        </Link>
                      )}
                      {member.social.github && (
                        <Link
                          href={member.social.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-primary/10 hover:bg-primary/20 p-2 rounded-full transition-all duration-300 hover:scale-110 hover:text-primary"
                        >
                          <Github className="h-4 w-4" />
                        </Link>
                      )}
                      {member.social.email && (
                        <Link
                          href={`mailto:${member.social.email}`}
                          className="bg-primary/10 hover:bg-primary/20 p-2 rounded-full transition-all duration-300 hover:scale-110 hover:text-primary"
                        >
                          <Mail className="h-4 w-4" />
                        </Link>
                      )}
                      {member.social.whatsapp && (
                        <Link
                          href={member.social.whatsapp}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-primary/10 hover:bg-primary/20 p-2 rounded-full transition-all duration-300 hover:scale-110 hover:text-primary"
                        >
                          <MessageCircle className="h-4 w-4" />
                        </Link>
                      )}
                    </div>
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
