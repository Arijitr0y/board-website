
import { Header } from "@/components/pcb-flow/header";
import { Button } from "@/components/ui/button";
import { CheckCircle, Bot, DollarSign, Zap, Scale, Cpu, FileUp, PackageCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const BenefitCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <div className="p-6 bg-card rounded-lg shadow-sm">
    <div className="flex items-start gap-4">
      <div className="text-primary flex-shrink-0">{icon}</div>
      <div>
        <h3 className="mb-2 text-xl font-semibold">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  </div>
);

const FeatureStep = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <div className="flex flex-col items-center p-6 text-center bg-card rounded-lg shadow-md transition-transform hover:scale-105">
    <div className="mb-4 text-accent">{icon}</div>
    <h3 className="mb-2 text-xl font-bold">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </div>
);


export default function DfmAnalysisPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-32 text-center bg-gray-50 dark:bg-gray-900/50">
          <div className="container mx-auto px-4">
            <Bot className="mx-auto h-16 w-16 text-primary mb-6" />
            <h1 className="text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl md:text-7xl">
              AI-Powered DFM Analysis
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-lg text-muted-foreground md:text-xl">
              Catch design flaws before they become expensive problems. Upload your Gerber files for a free, instant Design for Manufacturability check.
            </p>
            <div className="mt-8">
              <Button asChild size="lg">
                <Link href="/order">Analyze Your Design Now</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* What is DFM Section */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="text-left">
                <h2 className="text-4xl font-bold tracking-tight text-foreground">
                  Manufacturability Matters
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Design for Manufacturability (DFM) is the process of designing PCBs that are easy to manufacture. A proper DFM check is crucial for ensuring high yield, reliability, and cost-effectiveness. Our AI tool automates this process, saving you time and preventing costly re-spins.
                </p>
                <ul className="mt-6 space-y-4 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                    <span>Identifies issues like insufficient clearances, incorrect annular rings, and acid traps.</span>
                  </li>
                   <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                    <span>Verifies that your design adheres to standard manufacturing tolerances.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                    <span>Helps optimize your layout for better performance and lower fabrication costs.</span>
                  </li>
                </ul>
              </div>
              <div>
                <Image
                  src="https://placehold.co/600x400.png"
                  alt="DFM Analysis Report"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-2xl"
                  data-ai-hint="engineering schematic report"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Key Benefits Section */}
        <section className="py-24 bg-gray-50 dark:bg-gray-900/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold tracking-tight text-foreground">
                Unlock the Benefits of Automated DFM
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                Leverage AI to build more robust and cost-effective products.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <BenefitCard
                icon={<DollarSign className="h-10 w-10" />}
                title="Reduce Costs"
                description="Avoid expensive tooling charges and board re-spins by identifying and fixing manufacturing issues early in the design phase."
              />
              <BenefitCard
                icon={<Zap className="h-10 w-10" />}
                title="Improve Yield"
                description="Designs that are optimized for manufacturing have significantly higher success rates, leading to less waste and better reliability."
              />
              <BenefitCard
                icon={<Scale className="h-10 w-10" />}
                title="Accelerate Timelines"
                description="Eliminate delays caused by on-hold orders and communication back-and-forth with factory engineers."
              />
            </div>
          </div>
        </section>
        
        {/* How it Works Section */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold tracking-tight text-foreground">
                Get Your DFM Report in Minutes
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureStep
                icon={<FileUp className="h-12 w-12" />}
                title="1. Upload Your Gerbers"
                description="Drag and drop your Gerber files in a .zip format onto our secure instant quote platform."
              />
              <FeatureStep
                icon={<Cpu className="h-12 w-12" />}
                title="2. AI Engine Analyzes"
                description="Our intelligent system processes your files, checking them against hundreds of common manufacturing rules."
              />
              <FeatureStep
                icon={<PackageCheck className="h-12 w-12" />}
                title="3. Review & Order"
                description="Receive a clear, actionable report. Fix any issues and proceed to order with confidence."
              />
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 text-center bg-gray-50 dark:bg-gray-900/50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold tracking-tight text-foreground">
              Ready to Design with Confidence?
            </h2>
            <p className="mt-4 max-w-xl mx-auto text-lg text-muted-foreground">
              Get your free, instant DFM analysis and ensure your project is a success from the start.
            </p>
            <div className="mt-8">
              <Button asChild size="lg">
                <Link href="/order">Upload Files for Free Analysis</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
