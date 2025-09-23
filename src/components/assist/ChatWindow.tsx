"use client";

import { useState, useRef, useEffect } from "react";
import { assist } from "@/ai/flows/assist-flow";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, User, Bot, Loader2, BrainCircuit } from "lucide-react";
import { cn } from "@/lib/utils";

type Message = {
  id: string;
  text: string;
  sender: "user" | "ai";
};

export function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: input,
      sender: "user",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const result = await assist({ message: input });
      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        text: result.response,
        sender: "ai",
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: `ai-error-${Date.now()}`,
        text: "I'm sorry, I'm having trouble connecting. Please try again later.",
        sender: "ai",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto flex-grow flex flex-col bg-card/50 backdrop-blur-sm border border-primary/20 rounded-lg box-glow">
      <div className="p-4 border-b border-primary/20 flex items-center gap-4">
        <div className="p-2 bg-primary/10 rounded-full box-glow">
            <BrainCircuit className="h-6 w-6 text-primary" />
        </div>
        <h2 className="font-headline text-2xl text-glow">AI Assistant</h2>
      </div>
      <div className="flex-grow p-4 overflow-hidden">
        <ScrollArea className="h-full" ref={scrollAreaRef}>
          <div className="space-y-6 pr-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex items-start gap-4",
                  message.sender === "user" ? "justify-end" : "justify-start"
                )}
              >
                {message.sender === "ai" && (
                  <Avatar className="border border-primary/50 box-glow">
                    <AvatarFallback>
                      <Bot />
                    </AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={cn(
                    "max-w-[75%] p-3 rounded-lg",
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  <p className="text-sm">{message.text}</p>
                </div>
                 {message.sender === "user" && (
                  <Avatar>
                    <AvatarFallback>
                      <User />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
             {isLoading && (
              <div className="flex items-start gap-4 justify-start">
                <Avatar className="border border-primary/50 box-glow">
                  <AvatarFallback>
                    <Bot />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-muted text-muted-foreground p-3 rounded-lg">
                  <div className="flex items-center gap-2 text-sm">
                    <Loader2 className="h-4 w-4 animate-spin"/>
                    <span>Thinking...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
      <div className="p-4 border-t border-primary/20">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question..."
            className="bg-background/50 h-11 text-lg"
            disabled={isLoading}
            autoFocus
          />
          <Button type="submit" size="icon" className="h-11 w-11" disabled={isLoading}>
            <Send className="h-5 w-5" />
          </Button>
        </form>
      </div>
    </div>
  );
}
