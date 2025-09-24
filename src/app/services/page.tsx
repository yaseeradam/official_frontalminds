
import { PageHeader } from "@/components/shared/PageHeader";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, Smartphone, ShieldCheck } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
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

const faqs = [
  {
    category: "Website Development",
    questions: [
      {
        q: "How long does it take to build a website?",
        a: "The timeline for a website project varies depending on its complexity. A simple marketing site might take 4-6 weeks, while a complex e-commerce platform could take 3-6 months. We provide a detailed project timeline after our initial discovery phase."
      },
      {
        q: "Will my website be mobile-friendly?",
        a: "Absolutely. All websites we build are fully responsive, meaning they are optimized to look and function perfectly on all devices, including desktops, tablets, and smartphones."
      },
       {
        q: "Do you provide website maintenance?",
        a: "Yes, we offer ongoing maintenance and support packages to ensure your website remains secure, updated, and performs optimally after launch. We can tailor a plan to fit your specific needs."
      }
    ]
  },
  {
    category: "Mobile App Development",
    questions: [
      {
        q: "Do you develop for both iOS and Android?",
        a: "Yes, we have expertise in developing native apps for both iOS and Android platforms. We can also build cross-platform apps that work on both operating systems using a single codebase to save time and cost."
      },
      {
        q: "Can you help me publish my app to the app stores?",
        a: "We do! Our service includes managing the entire submission process for both the Apple App Store and Google Play Store, ensuring your app meets all guidelines and is successfully published."
      }
    ]
  },
  {
    category: "Cybersecurity Services",
    questions: [
      {
        q: "What is a penetration test?",
        a: "A penetration test, or pen test, is a simulated cyberattack against your computer system to check for exploitable vulnerabilities. It helps identify security weaknesses before malicious hackers can."
      },
      {
        q: "How often should we conduct a security audit?",
        a: "We recommend a comprehensive security audit at least once a year. However, for businesses handling sensitive data or those in high-risk industries, more frequent audits (e.g., quarterly) may be necessary."
      }
    ]
  }
];

export default function ServicesPage() {
  return (
    <div>
      <PageHeader
        title="Our Core Services"
        subtitle="We deliver cutting-edge digital solutions tailored to your business needs. Explore our expertise in development and security."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
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

      <AnimatedSection>
        <div className="text-center">
          <h2 className="font-headline text-4xl md:text-5xl font-bold mb-4 text-glow">Frequently Asked Questions</h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground mb-12">
            Answers to common questions about our services.
          </p>
        </div>
        <div className="max-w-3xl mx-auto">
          {faqs.map((categoryItem, index) => (
            <div key={categoryItem.category} className="mb-12">
              <h3 className="font-headline text-2xl text-primary mb-4">{categoryItem.category}</h3>
              <Accordion type="single" collapsible className="w-full bg-card/50 backdrop-blur-sm border border-primary/20 rounded-lg p-4 box-glow">
                {categoryItem.questions.map((faq, faqIndex) => (
                  <AccordionItem value={`item-${index}-${faqIndex}`} key={faqIndex} className={cn(faqIndex === categoryItem.questions.length - 1 && "border-b-0")}>
                    <AccordionTrigger className="text-left hover:no-underline">{faq.q}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </AnimatedSection>

    </div>
  );
}
