import { PageHeader } from "@/components/shared/PageHeader";
import { ChatWindow } from "@/components/assist/ChatWindow";
import { AnimatedSection } from "@/components/shared/AnimatedSection";

export default function AssistPage() {
  return (
    <div>
      <PageHeader
        title="AI Assistant"
        subtitle="Your direct line to our AI. Ask anything about FrontalMinds, our technology, or the future of cognitive enhancement."
      />
      <AnimatedSection>
        <ChatWindow />
      </AnimatedSection>
    </div>
  );
}
