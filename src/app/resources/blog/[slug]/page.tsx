
import { Header } from "@/components/pcb-flow/header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Calendar, Tag, User } from "lucide-react";
import { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

// Placeholder data - In a real app, this would come from a CMS or database
const posts = [
  {
    slug: "demystifying-dfm",
    title: "Demystifying DFM: How to Avoid Common PCB Manufacturing Pitfalls",
    description: "Design for Manufacturability (DFM) is crucial for efficient and cost-effective PCB production. In this post, we explore the most common pitfalls designers face and how to avoid them, ensuring your project stays on time and on budget.",
    content: "Design for Manufacturability (DFM) is a critical step in the PCB design process that focuses on creating a product that is easy and cost-effective to manufacture without sacrificing quality or functionality. Overlooking DFM principles can lead to production delays, increased costs, and lower yields. Common pitfalls include insufficient clearances between traces and pads, which can cause short circuits; incorrect annular ring sizes, which can compromise via integrity; and acid traps, sharp corners where etching solution can get caught and corrode copper. By using automated DFM analysis tools early in the design cycle, engineers can identify and rectify these issues proactively. This ensures that the design is robust, reliable, and ready for mass production, saving significant time and resources in the long run.",
    imageUrl: "https://placehold.co/1200x600.png",
    imageHint: "pcb design schematic",
    author: "Jane Doe",
    date: "October 26, 2023",
    tags: ["DFM", "PCB Design", "Manufacturing"],
  },
  {
    slug: "choosing-right-pcb-material",
    title: "Choosing the Right PCB Material: FR-4 vs. Rogers",
    description: "The material of your PCB is a critical decision that impacts performance, reliability, and cost. We break down the differences between standard FR-4 and high-frequency Rogers materials to help you make an informed choice for your next project.",
    content: "The choice of PCB material is fundamental to your circuit's performance, especially in high-frequency applications. The most common material, FR-4, is a glass-reinforced epoxy laminate that offers a great balance of cost, durability, and electrical insulation properties, making it ideal for most applications. However, for high-frequency circuits (typically above 1 GHz), materials like those from Rogers Corporation become necessary. Rogers materials have a lower dielectric constant (Dk) and loss tangent (Df), which means less signal loss and better impedance control at high frequencies. While more expensive, they are essential for applications in RF, microwave, and high-speed digital systems where signal integrity is paramount.",
    imageUrl: "https://placehold.co/1200x600.png",
    imageHint: "circuit board material",
    author: "John Smith",
    date: "October 22, 2023",
    tags: ["Materials", "FR-4", "Rogers"],
  },
  {
    slug: "intro-to-pcb-assembly",
    title: "An Introduction to PCB Assembly: From SMT to Thru-Hole",
    description: "What happens after your PCB is fabricated? This guide walks you through the essentials of PCB assembly, explaining the differences between Surface Mount Technology (SMT) and Thru-Hole Technology (THT) and where each is used.",
    content: "PCB assembly is the process of mounting electronic components onto a bare circuit board. The two primary methods are Surface Mount Technology (SMT) and Thru-Hole Technology (THT). SMT involves placing components directly onto the surface of the PCB, allowing for smaller, more densely packed designs and is largely automated. It's the standard for most modern electronics. THT, on the other hand, involves inserting component leads into drilled holes and soldering them on the opposite side. This method provides stronger mechanical bonds, making it suitable for larger components like connectors and capacitors that may undergo mechanical stress. Many modern boards use a mix of both technologies to leverage their respective strengths.",
    imageUrl: "https://placehold.co/1200x600.png",
    imageHint: "pcb assembly line",
    author: "Emily White",
    date: "October 18, 2023",
    tags: ["Assembly", "SMT", "THT"],
  },
  {
    slug: "understanding-surface-finishes",
    title: "Understanding PCB Surface Finishes: HASL vs. ENIG",
    description: "The surface finish on your PCB protects the copper and ensures solderability. Which one is right for you? We compare the two most popular options: HASL and ENIG, covering their pros, cons, and ideal applications.",
    content: "A PCB's surface finish is a crucial coating applied to the exposed copper to protect it from oxidation and provide a solderable surface during assembly. The two most common finishes are Hot Air Solder Leveling (HASL) and Electroless Nickel Immersion Gold (ENIG). HASL is cost-effective and robust, involving dipping the board in molten solder and leveling it with hot air. However, it can result in uneven surfaces, making it less suitable for fine-pitch components. ENIG provides a very flat, durable surface with excellent solderability, making it ideal for SMT and fine-pitch components. Though more expensive, ENIG is the preferred choice for high-reliability and high-density applications due to its superior planarity and shelf life.",
    imageUrl: "https://placehold.co/1200x600.png",
    imageHint: "pcb surface finish",
    author: "Chris Green",
    date: "October 15, 2023",
    tags: ["Fabrication", "HASL", "ENIG"],
  },
];

// Generate static pages for each post
export async function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate metadata for each post page
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = posts.find((p) => p.slug === params.slug);

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The post you are looking for does not exist.",
    };
  }

  return {
    title: `${post.title} | PCB Flow Blog`,
    description: post.description,
  };
}

const getPost = (slug: string) => {
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();
  return post;
};

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  const recentPosts = posts.filter(p => p.slug !== post.slug).slice(0, 3);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-12">
           <div className="mb-8">
            <Button variant="outline" asChild>
              <Link href="/resources/blog" className="inline-flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Blog
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <article className="lg:col-span-2 prose prose-lg dark:prose-invert max-w-none">
              {/* Post Header */}
              <div className="mb-8">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-4">{post.title}</h1>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-muted-foreground">
                  <div className="flex items-center gap-2"><User className="h-4 w-4" /> {post.author}</div>
                  <div className="flex items-center gap-2"><Calendar className="h-4 w-4" /> {post.date}</div>
                  <div className="flex items-center gap-2"><Tag className="h-4 w-4" /> {post.tags.join(', ')}</div>
                </div>
              </div>

              {/* Featured Image */}
              <Image
                src={post.imageUrl}
                alt={post.title}
                width={1200}
                height={600}
                className="w-full rounded-lg shadow-lg mb-8"
                data-ai-hint={post.imageHint}
                priority
              />

              {/* Post Content */}
              <p className="lead text-xl text-muted-foreground">{post.description}</p>
              <p>{post.content}</p>

              {/* Tags Footer */}
               <div className="mt-12 flex flex-wrap gap-2">
                 <span className="font-semibold">Tags:</span>
                {post.tags.map(tag => (
                  <Badge key={tag} variant="secondary" asChild>
                    <Link href={`/resources/blog/category/${tag.toLowerCase()}`}>{tag}</Link>
                  </Badge>
                ))}
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-1 space-y-8 sticky top-24 self-start">
               <Card>
                <CardHeader><CardTitle>Recent Posts</CardTitle></CardHeader>
                <CardContent>
                   <ul className="space-y-4">
                    {recentPosts.map(p => (
                      <li key={p.slug}>
                         <Link href={`/resources/blog/${p.slug}`} className="font-semibold text-foreground hover:text-primary transition-colors block">
                          {p.title}
                        </Link>
                        <p className="text-xs text-muted-foreground mt-1">{p.date}</p>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card className="bg-primary/10 border-primary/20 text-center">
                <CardHeader>
                  <CardTitle>Ready to Build?</CardTitle>
                </CardHeader>
                <CardContent>
                   <p className="text-muted-foreground mb-4">
                    Turn your design into reality with our fast, reliable PCB service.
                  </p>
                  <Button asChild>
                    <Link href="/order">Get an Instant Quote</Link>
                  </Button>
                </CardContent>
              </Card>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}

// Add basic prose styles for tailwind typography plugin
const _proseStyles = `
  .prose {
    color: var(--foreground);
  }
  .prose h1, .prose h2, .prose h3, .prose h4 {
    color: var(--foreground);
  }
  .prose a {
    color: hsl(var(--primary));
  }
  .prose blockquote {
    border-left-color: hsl(var(--primary));
    color: hsl(var(--muted-foreground));
  }
  .prose strong {
    color: var(--foreground);
  }
`;
