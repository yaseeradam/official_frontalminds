"use client";

import { PageHeader } from "@/components/shared/PageHeader";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Send, Mail, User, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ContactPage() {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // This is a dummy handler. In a real app, this would send data to a server.
    toast({
      title: "Transmission Sent",
      description: "Your message has been successfully transmitted to FrontalMinds HQ. We will respond shortly.",
    });
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div>
      <PageHeader
        title="Connect Terminal"
        subtitle="Establish a direct connection to our central command. Your inquiries will be processed by our quantum communication network."
      />

      <AnimatedSection>
        <div className="max-w-2xl mx-auto p-6 md:p-8 bg-card/50 backdrop-blur-sm border border-primary/20 rounded-lg box-glow">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-2 relative">
              <Label htmlFor="name" className="text-lg font-headline text-primary/80 flex items-center gap-2">
                <User className="h-5 w-5"/>Identifier (Name)
              </Label>
              <Input
                id="name"
                type="text"
                required
                placeholder="Enter your callsign"
                className="bg-background/50 h-12 text-lg focus:border-primary focus:box-glow-accent transition-all"
              />
            </div>
            <div className="space-y-2 relative">
              <Label htmlFor="email" className="text-lg font-headline text-primary/80 flex items-center gap-2">
                <Mail className="h-5 w-5" />Comm-Link (Email)
              </Label>
              <Input
                id="email"
                type="email"
                required
                placeholder="Enter your secure channel address"
                className="bg-background/50 h-12 text-lg focus:border-primary focus:box-glow-accent transition-all"
              />
            </div>
            <div className="space-y-2 relative">
               <Label htmlFor="message" className="text-lg font-headline text-primary/80 flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />Message Datapacket
              </Label>
              <Textarea
                id="message"
                required
                placeholder="Compose your transmission..."
                className="bg-background/50 text-lg min-h-[150px] focus:border-primary focus:box-glow-accent transition-all"
              />
            </div>
            <Button type="submit" size="lg" className="w-full text-lg font-bold group hover:box-glow">
              Transmit Message <Send className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </form>
        </div>
      </AnimatedSection>
    </div>
  );
}
