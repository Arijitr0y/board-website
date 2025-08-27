
import { Header } from "@/components/pcb-flow/header";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CheckCircle, Clock, Cpu, FileUp, PackageCheck, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Feature = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <div className="flex flex-col items-center p-6 text-center bg-card rounded-lg shadow-md transition-transform hover:scale-105">
    <div className="mb-4 text-primary">{icon}</div>
    <h3 className="mb-2 text-xl font-bold">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </div>
);


export default function PrototypingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-32 text-center bg-gray-50 dark:bg-gray-900/50">
          <div className="container mx-auto px-4">
            <h1 className="text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl md:text-7xl">
              Rapid PCB Prototyping
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-lg text-muted-foreground md:text-xl">
              Turn your innovative designs into tangible, high-quality prototypes in just a few days. Our streamlined process is built for speed and precision.
            </p>
            <div className="mt-8">
              <Button asChild size="lg">
                <Link href="/order">Start Your Prototype Order</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Why Prototype With Us Section */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold tracking-tight text-foreground">
                The Engineer's Choice for Fast, Reliable Prototypes
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                We empower innovators by removing the barriers to high-quality prototyping.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Feature
                icon={<Zap className="h-12 w-12" />}
                title="Unmatched Speed"
                description="Our optimized manufacturing flow gets your prototypes fabricated and shipped in as little as 24 hours."
              />
              <Feature
                icon={<CheckCircle className="h-12 w-12" />}
                title="Production-Grade Quality"
                description="Prototypes are built to IPC-A-600 Class 2 standards, ensuring they perform reliably for validation and testing."
              />
              <Feature
                icon={<Cpu className="h-12 w-12" />}
                title="Free AI DFM Check"
                description="Every design undergoes an automated Design for Manufacturability check to catch errors before production."
              />
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-24 bg-gray-50 dark:bg-gray-900/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold tracking-tight text-foreground">
                From Design to Prototype in 4 Simple Steps
              </h2>
            </div>
            <div className="relative">
              <div className="hidden md:block absolute left-1/2 top-5 h-full w-0.5 bg-border -translate-x-1/2" aria-hidden="true"></div>
              <div className="space-y-16">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="md:w-1/2 md:pr-8 md:text-right">
                    <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-primary text-primary-foreground mb-4">
                      <FileUp className="h-6 w-6" />
                    </div>
                    <h3 className="text-2xl font-bold">1. Upload Your Design</h3>
                    <p className="text-muted-foreground mt-2">Simply upload your Gerber files. Our platform will instantly parse your design specifications.</p>
                  </div>
                  <div className="md:w-1/2 md:pl-8">
                    <Image src="https://placehold.co/500x300.png" alt="Upload Gerber Files" width={500} height={300} className="rounded-lg shadow-lg" data-ai-hint="file upload interface" />
                  </div>
                </div>

                 <div className="flex flex-col md:flex-row-reverse items-center gap-8">
                  <div className="md:w-1/2 md:pl-8">
                    <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-primary text-primary-foreground mb-4">
                      <Clock className="h-6 w-6" />
                    </div>
                    <h3 className="text-2xl font-bold">2. Get an Instant Quote</h3>
                    <p className="text-muted-foreground mt-2">Configure your board, select your quantity, and receive a transparent, real-time quote. No hidden fees.</p>
                  </div>
                   <div className="md:w-1/2 md:pr-8">
                     <Image src="https://placehold.co/500x300.png" alt="Instant Quote" width={500} height={300} className="rounded-lg shadow-lg" data-ai-hint="price quote calculator" />
                  </div>
                </div>
                
                 <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="md:w-1/2 md:pr-8 md:text-right">
                    <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-primary text-primary-foreground mb-4">
                      <Zap className="h-6 w-6" />
                    </div>
                    <h3 className="text-2xl font-bold">3. Fast Fabrication</h3>
                    <p className="text-muted-foreground mt-2">Once confirmed, your order moves to our state-of-the-art facility for rapid fabrication and quality checks.</p>
                  </div>
                   <div className="md:w-1/2 md:pl-8">
                     <Image src="https://placehold.co/500x300.png" alt="PCB Fabrication" width={500} height={300} className="rounded-lg shadow-lg" data-ai-hint="circuit board manufacturing" />
                  </div>
                </div>

                 <div className="flex flex-col md:flex-row-reverse items-center gap-8">
                  <div className="md:w-1/2 md:pl-8">
                    <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-primary text-primary-foreground mb-4">
                      <PackageCheck className="h-6 w-6" />
                    </div>
                    <h3 className="text-2xl font-bold">4. Receive Your Boards</h3>
                    <p className="text-muted-foreground mt-2">Your finished prototypes are securely packaged and shipped directly to your doorstep. Track your order in real-time.</p>
                  </div>
                   <div className="md:w-1/2 md:pr-8">
                     <Image src="https://placehold.co/500x300.png" alt="Shipping" width={500} height={300} className="rounded-lg shadow-lg" data-ai-hint="shipping box package" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Capabilities Section */}
        <section className="py-24">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold tracking-tight">Prototyping Capabilities</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">We offer a wide range of options to meet your specific needs.</p>
                </div>
                <div className="max-w-4xl mx-auto bg-card p-8 rounded-lg shadow-lg border">
                    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                        <li className="space-y-1">
                            <h4 className="font-semibold text-foreground">Layers</h4>
                            <p className="text-muted-foreground">1-2 Layers</p>
                        </li>
                        <li className="space-y-1">
                            <h4 className="font-semibold text-foreground">Base Material</h4>
                            <p className="text-muted-foreground">FR-4 Standard</p>
                        </li>
                        <li className="space-y-1">
                            <h4 className="font-semibold text-foreground">Min. Quantity</h4>
                            <p className="text-muted-foreground">5 pieces</p>
                        </li>
                        <li className="space-y-1">
                            <h4 className="font-semibold text-foreground">PCB Thickness</h4>
                            <p className="text-muted-foreground">0.4mm - 2.4mm</p>
                        </li>
                        <li className="space-y-1">
                            <h4 className="font-semibold text-foreground">Min. Trace/Space</h4>
                            <p className="text-muted-foreground">3/3 mil</p>
                        </li>
                        <li className="space-y-1">
                            <h4 className="font-semibold text-foreground">Surface Finish</h4>
                            <p className="text-muted-foreground">HASL, Lead-Free HASL, ENIG</p>
                        </li>
                    </ul>
                     <div className="mt-8 text-center">
                        <Button asChild variant="outline">
                            <Link href="/resources/capabilities">View Full Capabilities</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 bg-gray-50 dark:bg-gray-900/50">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold tracking-tight">Frequently Asked Questions</h2>
            </div>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>What is the typical turnaround time for prototypes?</AccordionTrigger>
                <AccordionContent>
                  Our standard turnaround is 5-6 business days. We also offer expedited options for delivery in as little as 24-48 hours, depending on design complexity.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>What file formats do you accept?</AccordionTrigger>
                <AccordionContent>
                  We accept Gerber RS-274X and Excellon drill files. Please package all of your files into a single .zip, .rar, or .7z archive for uploading.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Is there a minimum order quantity (MOQ)?</AccordionTrigger>
                <AccordionContent>
                  For our prototyping service, the minimum order quantity is just 5 pieces, making it affordable to test and iterate on your designs.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>Can you assemble my prototypes as well?</AccordionTrigger>
                <AccordionContent>
                  Absolutely! We offer full turnkey PCB assembly services. You can get a quote for assembly after you upload your bill of materials (BOM) and placement files along with your Gerbers.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold tracking-tight text-foreground">
              Ready to Bring Your Design to Life?
            </h2>
            <p className="mt-4 max-w-xl mx-auto text-lg text-muted-foreground">
              Get an instant quote and have your high-quality PCB prototypes in hand in just a few days.
            </p>
            <div className="mt-8">
              <Button asChild size="lg">
                <Link href="/order">Upload Files & Get Quote</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
