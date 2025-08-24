
'use client';

import React from 'react';
import { Header } from "@/components/pcb-flow/header";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Cpu, FileUp, PackageCheck, Zap } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Autoplay from "embla-carousel-autoplay"


const Feature = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
    <div className="text-center p-6 bg-card rounded-xl shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mx-auto mb-4">
            {icon}
        </div>
        <h3 className="text-xl font-bold mb-2 text-foreground">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
    </div>
);


const Step = ({ icon, title, description, stepNumber }: { icon: React.ReactNode; title: string; description: string, stepNumber: number }) => (
    <div className="relative flex flex-col items-center text-center">
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 h-12 w-12 flex items-center justify-center bg-background border-2 border-primary rounded-full text-primary font-bold text-lg">
           {stepNumber}
        </div>
        <div className="p-8 bg-card rounded-lg shadow-md">
            <div className="text-primary mb-4">{icon}</div>
            <h3 className="font-bold text-lg mb-2">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
        </div>
    </div>
)

const testimonials = [
  {
    name: "Sarah L.",
    role: "Hardware Engineer",
    avatar: "https://i.pravatar.cc/150?u=sarahl",
    quote: "The instant DFM analysis is a game-changer. It caught several issues that would have cost us a week of delays. The quality of the final boards was exceptional.",
  },
  {
    name: "Mike R.",
    role: "Startup Founder",
    avatar: "https://i.pravatar.cc/150?u=miker",
    quote: "As a startup, speed and cost are critical. PCB Flow delivered on both. We got our prototypes in 3 days, which allowed us to accelerate our testing schedule significantly.",
  },
  {
    name: "David C.",
    role: "Hobbyist",
    avatar: "https://i.pravatar.cc/150?u=davidc",
    quote: "I was blown away by how easy it was to go from my design files to a finished product. The user interface is intuitive, and the final PCBs were perfect for my project.",
  },
   {
    name: "Jessica P.",
    role: "R&D Manager",
    avatar: "https://i.pravatar.cc/150?u=jessicap",
    quote: "The full turnkey assembly service saved my team countless hours of tedious part sourcing and management. The quality was top-notch, and everything worked right out of the box.",
  },
];


export default function LandingPage() {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  )

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-24 md:py-40 text-center">
             <div 
                aria-hidden="true" 
                className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]">
            </div>
            <div className="container mx-auto px-4 relative">
                <h1 className="text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl md:text-7xl">
                    High-Quality PCBs, Radically Fast
                </h1>
                <p className="mt-6 max-w-3xl mx-auto text-lg text-muted-foreground md:text-xl">
                   From prototype to production, get an instant quote, free DFM analysis, and your boards manufactured in as little as 24 hours.
                </p>
                <div className="mt-8 flex justify-center gap-4">
                    <Button asChild size="lg">
                        <Link href="/order">Get Instant Quote <ArrowRight className="ml-2 h-5 w-5" /></Link>
                    </Button>
                    <Button asChild size="lg" variant="outline">
                        <Link href="/services/prototyping">Our Services</Link>
                    </Button>
                </div>
            </div>
        </section>
        
        {/* Features Section */}
        <section className="py-24 bg-gray-50 dark:bg-gray-900/50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold tracking-tight text-foreground">
                       The Future of PCB Manufacturing
                    </h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                        We've streamlined every step of the process to help you build better, faster.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <Feature
                        icon={<Zap className="h-8 w-8" />}
                        title="Instant Quoting"
                        description="No more waiting for sales reps. Get a transparent, real-time price for your design in seconds."
                    />
                    <Feature
                        icon={<Cpu className="h-8 w-8" />}
                        title="AI-Powered DFM"
                        description="Our free, automated Design for Manufacturability check helps you catch costly errors before production."
                    />
                    <Feature
                        icon={<PackageCheck className="h-8 w-8" />}
                        title="Turnkey Assembly"
                        description="From sourcing components to final assembly, we handle the entire process for you."
                    />
                </div>
            </div>
        </section>

        {/* How It Works Section */}
        <section className="py-24">
            <div className="container mx-auto px-4">
                <div className="text-center mb-20">
                    <h2 className="text-4xl font-bold tracking-tight text-foreground">
                       From File to Finished Board in 3 Easy Steps
                    </h2>
                </div>
                <div className="relative">
                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-border -translate-y-1/2" aria-hidden="true"></div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative">
                        <Step icon={<FileUp className="h-10 w-10"/>} title="Upload & Configure" description="Upload your Gerber and BOM files, and specify your board requirements." stepNumber={1} />
                        <Step icon={<CheckCircle className="h-10 w-10"/>} title="Review & Confirm" description="Get your instant quote and DFM feedback. Confirm your order in one click." stepNumber={2} />
                        <Step icon={<Zap className="h-10 w-10"/>} title="Fabrication & Delivery" description="We manufacture, assemble, and ship your boards right to your door." stepNumber={3} />
                    </div>
                </div>
            </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-24 bg-gray-50 dark:bg-gray-900/50">
             <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold tracking-tight text-foreground">
                       Trusted by Engineers Worldwide
                    </h2>
                </div>
                <Carousel 
                    opts={{ loop: true }} 
                    plugins={[plugin.current]}
                    onMouseEnter={plugin.current.stop}
                    onMouseLeave={plugin.current.reset}
                    className="w-full max-w-4xl mx-auto"
                >
                    <CarouselContent>
                        {testimonials.map((testimonial, index) => (
                        <CarouselItem key={index}>
                            <div className="p-2">
                            <Card>
                                <CardContent className="flex flex-col items-center justify-center p-8 text-center">
                                     <Avatar className="h-16 w-16 mb-4">
                                        <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                                        <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <p className="text-lg italic text-foreground mb-4">"{testimonial.quote}"</p>
                                    <p className="font-bold">{testimonial.name}</p>
                                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                                </CardContent>
                            </Card>
                            </div>
                        </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
             </div>
        </section>
        
        {/* Final CTA */}
        <section className="py-24 text-center">
             <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold tracking-tight text-foreground">
                    Ready to Build Your Next Project?
                </h2>
                <p className="mt-4 max-w-xl mx-auto text-lg text-muted-foreground">
                    Experience the fastest and most reliable PCB service.
                </p>
                <div className="mt-8">
                    <Button asChild size="lg">
                        <Link href="/order">Get Your Free Quote Now</Link>
                    </Button>
                </div>
            </div>
        </section>

      </main>
    </div>
  );
}
