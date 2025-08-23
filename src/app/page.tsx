import { CircuitBoard, Cpu, CheckCircle, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/components/pcb-flow/header';

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title:string; description: string }) => (
  <div className="flex flex-col items-center p-6 text-center bg-card rounded-lg shadow-md transition-transform hover:scale-105">
    <div className="mb-4 text-primary">{icon}</div>
    <h3 className="mb-2 text-xl font-bold">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </div>
);

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 text-center bg-gray-50">
          <div className="container mx-auto px-4">
            <h1 className="text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl md:text-7xl">
              High-Quality PCBs, Simplified
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground md:text-xl">
              From prototype to production, get instant quotes, AI-powered DFM analysis, and seamless order tracking.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href="/order">Get an Instant Quote</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="#features">Learn More</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold tracking-tight text-foreground">
                How It Works
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                A streamlined process to bring your designs to life.
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

        {/* Visual Section */}
        <section className="py-24 bg-gray-50">
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
      </main>
    </div>
  );
}
