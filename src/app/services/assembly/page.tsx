
import { Header } from "@/components/pcb-flow/header";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CheckCircle, FileText, KeyRound, PackageCheck, Truck, Users, Wand2, Wrench } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <div className="flex flex-col items-center p-6 text-center bg-card rounded-lg shadow-md transition-transform hover:scale-105">
    <div className="mb-4 text-primary">{icon}</div>
    <h3 className="mb-2 text-xl font-bold">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </div>
);

export default function AssemblyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-32 text-center bg-gray-50 dark:bg-gray-900/50">
          <div className="container mx-auto px-4">
            <h1 className="text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl md:text-7xl">
              Full Turnkey PCB Assembly
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-lg text-muted-foreground md:text-xl">
              From component sourcing to final assembly, we provide a seamless, one-stop solution to bring your electronic products to life, fast and affordably.
            </p>
            <div className="mt-8">
              <Button asChild size="lg">
                <Link href="/order">Get an Assembly Quote</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Why Us Section */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold tracking-tight text-foreground">
                Your Reliable Partner for PCB Assembly
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                We handle the complexities of the supply chain so you can focus on innovation.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<KeyRound className="h-12 w-12" />}
                title="Complete Turnkey Solution"
                description="We manage everything: PCB fabrication, component sourcing, and final assembly, all under one roof."
              />
              <FeatureCard
                icon={<CheckCircle className="h-12 w-12" />}
                title="IPC-A-610 Quality Standard"
                description="Our assembly process adheres to rigorous IPC Class 2 standards, ensuring high-quality, reliable boards."
              />
              <FeatureCard
                icon={<Users className="h-12 w-12" />}
                title="Dedicated Expert Support"
                description="Get direct access to our engineering team for DFM/DFA feedback and support throughout your project."
              />
            </div>
          </div>
        </section>

        {/* Assembly Process Section */}
        <section className="py-24 bg-gray-50 dark:bg-gray-900/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold tracking-tight text-foreground">
                A Streamlined Assembly Process
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                Four easy steps to get your boards assembled and delivered.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              <FeatureCard
                icon={<FileText className="h-12 w-12" />}
                title="1. Upload Files"
                description="Submit your Gerber files, Bill of Materials (BOM), and Centroid (Pick-and-Place) file."
              />
              <FeatureCard
                icon={<Wand2 className="h-12 w-12" />}
                title="2. DFM/DFA Review"
                description="Our engineers perform a free review to check for manufacturability and assembly issues."
              />
              <FeatureCard
                icon={<Wrench className="h-12 w-12" />}
                title="3. Sourcing & Assembly"
                description="We source all components from authorized distributors and begin the automated assembly process."
              />
              <FeatureCard
                icon={<Truck className="h-12 w-12" />}
                title="4. QC & Shipping"
                description="Every board undergoes rigorous quality control, including AOI, before being shipped to you."
              />
            </div>
          </div>
        </section>

        {/* Capabilities & CTA Section */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="text-left">
                <h2 className="text-4xl font-bold tracking-tight text-foreground">Assembly Capabilities</h2>
                <p className="mt-4 text-lg text-muted-foreground">We are equipped to handle a wide range of assembly requirements, from simple boards to complex, high-density designs.</p>
                <ul className="mt-6 space-y-4 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                    <span><span className="font-semibold text-foreground">Assembly Types:</span> Surface Mount (SMT), Thru-Hole (THT), and Mixed Technology.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                    <span><span className="font-semibold text-foreground">Component Sourcing:</span> Full and partial turnkey options available. We source from reliable global distributors.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                     <span><span className="font-semibold text-foreground">Component Size:</span> Passive components down to 0201 size. Fine pitch support for BGAs and QFPs.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                     <span><span className="font-semibold text-foreground">Quality Control:</span> Automated Optical Inspection (AOI) and X-Ray Inspection for all assemblies.</span>
                  </li>
                </ul>
                <div className="mt-8">
                  <Button asChild size="lg">
                    <Link href="/order">Request an Assembly Quote</Link>
                  </Button>
                </div>
              </div>
              <div>
                <Image
                  src="https://placehold.co/600x400.png"
                  alt="PCB Assembly Line"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-2xl"
                  data-ai-hint="pcb assembly line"
                />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 bg-gray-50 dark:bg-gray-900/50">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold tracking-tight">Assembly FAQs</h2>
            </div>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>What files do I need to provide for a turnkey assembly quote?</AccordionTrigger>
                <AccordionContent>
                  For a complete turnkey quote, you will need to provide Gerber files for fabrication, a Bill of Materials (BOM) with manufacturer part numbers, and a Centroid (Pick-and-Place) file for component placement.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Can I supply some or all of the components myself?</AccordionTrigger>
                <AccordionContent>
                  Yes, we offer both full turnkey (we source all parts) and partial/kitted turnkey (you provide some or all parts) services. Simply indicate this when you request a quote, and we will adjust the process accordingly.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>What is your typical lead time for assembly?</AccordionTrigger>
                <AccordionContent>
                  Lead times depend on component availability and complexity. Standard turnkey assembly typically adds 7-10 business days to the PCB fabrication time. We also offer expedited options.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>Do you offer testing and programming services?</AccordionTrigger>
                <AccordionContent>
                  Yes, we offer optional functional testing (FCT) and IC programming services. Please provide your test procedures and firmware, and we can include this in your assembly quote.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold tracking-tight text-foreground">
              Ready for Hassle-Free Assembly?
            </h2>
            <p className="mt-4 max-w-xl mx-auto text-lg text-muted-foreground">
              Upload your design files today and let our experts handle the rest.
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
