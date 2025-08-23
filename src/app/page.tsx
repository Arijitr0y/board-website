import { CircuitBoard, Cpu, CheckCircle, Package, ShieldCheck, Zap, Users, Factory, Rocket, Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/components/pcb-flow/header';
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title:string; description: string }) => (
  <div className="flex flex-col items-center p-6 text-center bg-card rounded-lg shadow-md transition-transform hover:scale-105">
    <div className="mb-4 text-primary">{icon}</div>
    <h3 className="mb-2 text-xl font-bold">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </div>
);

const AdvantageCard = ({ icon, title, description }: { icon: React.ReactNode; title:string; description: string }) => (
  <div className="p-6 bg-card rounded-lg shadow-sm">
    <div className="flex items-start gap-4">
      <div className="text-accent flex-shrink-0">{icon}</div>
      <div>
        <h3 className="mb-2 text-xl font-semibold">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  </div>
);


export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero Carousel Section */}
        <section className="relative w-full">
          <Carousel
            className="w-full"
            opts={{
              loop: true,
            }}
          >
            <CarouselContent>
              <CarouselItem>
                <div className="py-24 text-center bg-gray-50 dark:bg-gray-900/50">
                  <div className="container mx-auto px-4">
                    <h1 className="text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl md:text-7xl">
                      Advanced PCBs, On-Demand
                    </h1>
                    <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground md:text-xl">
                      Superior quality, no minimum order, and rapid turnarounds for all your custom circuit board needs.
                    </p>
                    <div className="mt-8 flex justify-center gap-4">
                      <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                        <Link href="/order">Get an Instant Quote</Link>
                      </Button>
                      <Button asChild size="lg" variant="outline">
                        <Link href="#features">How It Works</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </CarouselItem>
              <CarouselItem>
                <div className="py-24 text-center bg-gray-50 dark:bg-gray-900/50">
                   <div className="container mx-auto px-4">
                    <h1 className="text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl md:text-7xl">
                      AI-Powered DFM Analysis
                    </h1>
                    <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground md:text-xl">
                      Upload your Gerber files and our smart DFM tools will help you catch issues before manufacturing.
                    </p>
                    <div className="mt-8 flex justify-center gap-4">
                      <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                        <Link href="/services/dfm-analysis">Learn About DFM</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </CarouselItem>
              <CarouselItem>
                <div className="py-24 text-center bg-gray-50 dark:bg-gray-900/50">
                   <div className="container mx-auto px-4">
                    <h1 className="text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl md:text-7xl">
                      Rapid PCB Prototyping
                    </h1>
                    <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground md:text-xl">
                      Go from design to tangible prototype in days. Fast, reliable, and built to your exact specifications.
                    </p>
                    <div className="mt-8 flex justify-center gap-4">
                      <Button asChild size="lg">
                        <Link href="/services/prototyping">Start Prototyping</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 hidden sm:flex" />
            <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 hidden sm:flex" />
          </Carousel>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold tracking-tight text-foreground">
                A Streamlined Process to Bring Your Designs to Life
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                Our intuitive platform makes ordering custom PCBs faster and simpler than ever.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              <FeatureCard
                icon={<CircuitBoard className="h-12 w-12" />}
                title="1. Upload Gerber"
                description="Easily upload your Gerber files in a ZIP format. Our tool will automatically parse the necessary details."
              />
              <FeatureCard
                icon={<Cpu className="h-12 w-12" />}
                title="2. AI DFM Analysis"
                description="Our AI engine checks your design for manufacturability issues, helping you avoid costly errors."
              />
              <FeatureCard
                icon={<CheckCircle className="h-12 w-12" />}
                title="3. Instant Quote"
                description="Configure your PCB specs and get a transparent, real-time price quote for your order."
              />
              <FeatureCard
                icon={<Package className="h-12 w-12" />}
                title="4. Track Your Order"
                description="Follow your PCB's journey from our factory to your doorstep with real-time status updates."
              />
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-24 bg-gray-50 dark:bg-gray-900/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold tracking-tight text-foreground">
                Why Choose PCB Flow?
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                We are committed to delivering excellence at every step of the manufacturing process.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               <AdvantageCard
                  icon={<ShieldCheck className="h-10 w-10" />}
                  title="Superior Quality"
                  description="Every board is manufactured to IPC Class 2 standards and undergoes rigorous testing to ensure reliability and performance."
                />
                <AdvantageCard
                  icon={<Zap className="h-10 w-10" />}
                  title="Fast Turnarounds"
                  description="From prototyping to small-batch production, our optimized process ensures your PCBs are delivered quickly."
                />
                <AdvantageCard
                  icon={<Users className="h-10 w-10" />}
                  title="Expert Support"
                  description="Our team of experienced engineers is available to provide support and answer any questions you may have."
                />
            </div>
          </div>
        </section>


        {/* Visual Section */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 gap-12 md:grid-cols-2 items-center">
              <div className="text-left">
                <h2 className="text-4xl font-bold tracking-tight text-foreground">
                  Precision Engineering, Unmatched Quality
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  We utilize state-of-the-art technology and materials to ensure every PCB meets the highest standards of quality and reliability. Our automated DFM analysis helps you catch potential issues before they become problems, saving you time and money.
                </p>
                <div className="mt-6">
                  <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    <Link href="/order">Start Your Order</Link>
                  </Button>
                </div>
              </div>
              <div>
                <Image
                  src="https://placehold.co/600x400.png"
                  alt="PCB Manufacturing"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-2xl"
                  data-ai-hint="circuit board technology"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Capabilities Section */}
        <section className="py-24 bg-gray-50 dark:bg-gray-900/50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
               <div>
                 <Image
                  src="https://placehold.co/600x400.png"
                  alt="Factory"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-2xl"
                  data-ai-hint="manufacturing factory"
                />
              </div>
              <div className="text-left">
                <h2 className="text-4xl font-bold tracking-tight text-foreground">Our Capabilities at a Glance</h2>
                <p className="mt-4 text-lg text-muted-foreground">We support a wide range of technologies to meet your most demanding project requirements.</p>
                <ul className="mt-6 space-y-3 text-muted-foreground">
                  <li className="flex items-center gap-3"><CheckCircle className="h-5 w-5 text-accent" /> Up to 12 layers</li>
                  <li className="flex items-center gap-3"><CheckCircle className="h-5 w-5 text-accent" /> FR-4, Rogers, and other advanced materials</li>
                  <li className="flex items-center gap-3"><CheckCircle className="h-5 w-5 text-accent" /> HASL, ENIG, and other surface finishes</li>
                  <li className="flex items-center gap-3"><CheckCircle className="h-5 w-5 text-accent" /> Minimum trace/space of 3/3 mil</li>
                </ul>
                <div className="mt-8">
                  <Button asChild variant="outline">
                    <Link href="/resources/capabilities">View All Capabilities</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold tracking-tight text-foreground">
              Ready to Start Your Project?
            </h2>
            <p className="mt-4 max-w-xl mx-auto text-lg text-muted-foreground">
              Get an instant quote and experience the future of PCB manufacturing today.
            </p>
            <div className="mt-8">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href="/order">Upload Your Files</Link>
              </Button>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
