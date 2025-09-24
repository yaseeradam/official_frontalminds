
"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "FrontalMinds delivered a stunning website that perfectly captured our brand's vision. Their team was professional, responsive, and a pleasure to work with. Our online presence has never been stronger.",
    name: "Alex Johnson",
    title: "CEO, Innovate Inc.",
    imageId: "testimonial-1",
  },
  {
    quote: "The mobile app they developed for us is a masterpiece of design and functionality. It has significantly improved our customer engagement and simplified our workflow. Highly recommended!",
    name: "Samantha Lee",
    title: "Marketing Director, MobileFirst Co.",
    imageId: "testimonial-2",
  },
  {
    quote: "Their cybersecurity expertise is second to none. They conducted a thorough audit, identified critical vulnerabilities, and implemented robust solutions that have given us complete peace of mind.",
    name: "Michael Chen",
    title: "CTO, SecureData LLC",
    imageId: "testimonial-3",
  },
];

export function Testimonials() {
  return (
    <AnimatedSection>
      <div className="text-center">
        <h2 className="font-headline text-4xl md:text-5xl font-bold mb-4 text-glow">What Our Clients Say</h2>
        <p className="max-w-2xl mx-auto text-lg text-muted-foreground mb-12">
          We are proud to have partnered with amazing businesses.
        </p>
      </div>

      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full max-w-4xl mx-auto"
      >
        <CarouselContent>
          {testimonials.map((testimonial, index) => {
             const placeholder = PlaceHolderImages.find(p => p.id === testimonial.imageId);
            return (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1 h-full">
                  <Card className="h-full flex flex-col bg-card/50 backdrop-blur-sm border-primary/20">
                    <CardContent className="flex flex-col flex-grow items-center justify-center p-6 text-center gap-4">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 text-accent fill-accent" />)}
                      </div>
                      <p className="text-muted-foreground italic flex-grow">"{testimonial.quote}"</p>
                      <div className="flex items-center gap-4 mt-4">
                        {placeholder && (
                             <Avatar className="h-14 w-14 border-2 border-primary/50">
                                <AvatarImage src={placeholder.imageUrl} alt={testimonial.name} data-ai-hint={placeholder.imageHint} />
                                <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                        )}
                        <div>
                          <p className="font-semibold text-primary">{testimonial.name}</p>
                          <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="hidden lg:inline-flex"/>
        <CarouselNext className="hidden lg:inline-flex"/>
      </Carousel>
    </AnimatedSection>
  );
}
