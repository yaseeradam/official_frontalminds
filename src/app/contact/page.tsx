
"use client";

import { useState } from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Send, Mail, User, MessageSquare, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuth } from "@/hooks/use-auth";
import { LoginPromptDialog } from "@/components/shared/LoginPromptDialog";
import { cn } from "@/lib/utils";

export default function ContactPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { user, loading } = useAuth();
  const [isLoginPromptOpen, setLoginPromptOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) {
      setLoginPromptOpen(true);
      return;
    }

    setIsLoading(true);

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    try {
      await addDoc(collection(db, "contacts"), {
        name,
        email,
        message,
        userId: user.uid,
        createdAt: serverTimestamp(),
      });

      toast({
        title: "Transmission Sent",
        description: "Your message has been successfully transmitted to FrontalMinds HQ. We will respond shortly.",
      });
      form.reset();
    } catch (error) {
      console.error("Error adding document: ", error);
      toast({
        variant: "destructive",
        title: "Transmission Failed",
        description: "There was an error sending your message. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const isFormDisabled = isLoading || (!user && !loading);

  return (
    <div>
      <PageHeader
        title="Connect Terminal"
        subtitle="Establish a direct connection to our central command. Your inquiries will be processed by our quantum communication network."
      />

      <AnimatedSection>
        <div className="max-w-2xl mx-auto p-6 md:p-8 bg-card/50 backdrop-blur-sm border border-primary/20 rounded-lg box-glow relative">
          {!user && !loading && (
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center rounded-lg">
                <p className="text-lg font-headline mb-4">Please log in to contact us.</p>
                <Button onClick={() => setLoginPromptOpen(true)}>Login</Button>
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-2 relative">
              <Label htmlFor="name" className="text-lg font-headline text-primary/80 flex items-center gap-2">
                <User className="h-5 w-5"/>Identifier (Name)
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Enter your callsign"
                className="bg-background/50 h-12 text-lg focus:border-primary focus:box-glow-accent transition-all"
                disabled={isFormDisabled}
                defaultValue={user?.displayName || ''}
              />
            </div>
            <div className="space-y-2 relative">
              <Label htmlFor="email" className="text-lg font-headline text-primary/80 flex items-center gap-2">
                <Mail className="h-5 w-5" />Comm-Link (Email)
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder="Enter your secure channel address"
                className="bg-background/50 h-12 text-lg focus:border-primary focus:box-glow-accent transition-all"
                disabled={isFormDisabled}
                defaultValue={user?.email || ''}
              />
            </div>
            <div className="space-y-2 relative">
               <Label htmlFor="message" className="text-lg font-headline text-primary/80 flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />Message Datapacket
              </Label>
              <Textarea
                id="message"
                name="message"
                required
                placeholder="Compose your transmission..."
                className="bg-background/50 text-lg min-h-[150px] focus:border-primary focus:box-glow-accent transition-all"
                disabled={isFormDisabled}
              />
            </div>
            <Button type="submit" size="lg" className="w-full text-lg font-bold group hover:box-glow" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Transmitting...
                </>
              ) : (
                <>
                  Transmit Message <Send className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </Button>
          </form>
        </div>
      </AnimatedSection>
      <LoginPromptDialog isOpen={isLoginPromptOpen} onOpenChange={setLoginPromptOpen} />
    </div>
  );
}
