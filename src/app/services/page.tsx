
import { PageHeader } from "@/components/shared/PageHeader";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, Smartphone, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const services = [
  {
    icon: Globe,
    title: "Website Development",
    description: "We build modern, responsive, and high-performance websites tailored to our clients' needs, from simple landing pages to complex e-commerce platforms.",
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    description: "We design and develop intuitive, robust native and cross-platform mobile applications for both iOS and Android, focusing on user experience and scalability.",
  },
  {
    icon: ShieldCheck,
    title: "Cybersecurity Services",
    description: "We offer comprehensive cybersecurity solutions, including security audits, penetration testing, and implementing defensive measures to protect your digital assets.",
  },
];

export default function ServicesPage() {
  return (
    <div>
      <PageHeader
        title="Our Core Services"
        subtitle="We deliver cutting-edge digital solutions tailored to your business needs. Explore our expertise in development and security."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <AnimatedSection key={service.title} delay={index * 0.1}>
            <Card className="h-full bg-card/50 backdrop-blur-sm border-primary/20 group transition-all duration-300 hover:border-primary hover:-translate-y-2 hover:box-glow text-center">
              <CardHeader className="flex flex-col items-center p-6 pb-4">
                <div className="bg-primary/10 p-4 rounded-full mb-4 box-glow">
                  <service.icon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="font-headline text-xl text-primary">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <CardDescription className="text-base text-muted-foreground">
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
