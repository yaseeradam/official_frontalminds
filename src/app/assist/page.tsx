
"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { PageHeader } from "@/components/shared/PageHeader";
import { ChatWindow } from "@/components/assist/ChatWindow";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { LoginPromptDialog } from "@/components/shared/LoginPromptDialog";
import { Button } from "@/components/ui/button";
import { BrainCircuit } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AssistPage() {
  const { user, loading } = useAuth();
  const [isLoginPromptOpen, setLoginPromptOpen] = useState(false);

  if (loading) {
    return (
       <div className="flex-grow flex items-center justify-center">
        <BrainCircuit className="h-12 w-12 animate-pulse text-primary" />
       </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col h-full">
        <PageHeader
          title="AI Assistant"
          subtitle="Your direct line to our AI. Ask anything about FrontalMinds, our technology, or the future of cognitive enhancement."
        />
        <AnimatedSection className="flex-grow flex flex-col pb-8 items-center justify-center">
            <Card className="text-center bg-card/50 backdrop-blur-sm border-primary/20 max-w-lg">
                <CardHeader>
                    <CardTitle className="text-2xl font-headline text-glow">Authentication Required</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground mb-6">Please log in to access the AI Assistant.</p>
                    <Button onClick={() => setLoginPromptOpen(true)}>Login to Chat</Button>
                </CardContent>
            </Card>
        </AnimatedSection>
        <LoginPromptDialog isOpen={isLoginPromptOpen} onOpenChange={setLoginPromptOpen} />
      </div>
    );
  }
  
  return (
    <div className="flex flex-col h-full">
      <PageHeader
        title="AI Assistant"
        subtitle="Your direct line to our AI. Ask anything about FrontalMinds, our technology, or the future of cognitive enhancement."
      />
      <AnimatedSection className="flex-grow flex flex-col pb-8">
        <ChatWindow />
      </AnimatedSection>
    </div>
  );
}
