
import { Header } from "@/components/pcb-flow/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Calendar, User, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { notFound } from "next/navigation";
import { Metadata } from "next";

const allPosts = [
  {
    slug: "demystifying-dfm",
    title: "Demystifying DFM: How to Avoid Common PCB Manufacturing Pitfalls",
    description: "Design for Manufacturability (DFM) is crucial for efficient and cost-effective PCB production. In this post, we explore the most common pitfalls designers face and how to avoid them, ensuring your project stays on time and on budget.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "pcb design schematic",
    author: "Jane Doe",
    date: "October 26, 2023",
    tags: ["DFM", "PCB Design", "Manufacturing"],
  },
  {
    slug: "choosing-right-pcb-material",
    title: "Choosing the Right PCB Material: FR-4 vs. Rogers",
    description: "The material of your PCB is a critical decision that impacts performance, reliability, and cost. We break down the differences between standard FR-4 and high-frequency Rogers materials to help you make an informed choice for your next project.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "circuit board material",
    author: "John Smith",
    date: "October 22, 2023",
    tags: ["Materials", "FR-4", "Rogers"],
  },
  {
    slug: "intro-to-pcb-assembly",
    title: "An Introduction to PCB Assembly: From SMT to Thru-Hole",
    description: "What happens after your PCB is fabricated? This guide walks you through the essentials of PCB assembly, explaining the differences between Surface Mount Technology (SMT) and Thru-Hole Technology (THT) and where each is used.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "pcb assembly line",
    author: "Emily White",
    date: "October 18, 2023",
    tags: ["Assembly", "SMT", "THT"],
  },
    {
    slug: "understanding-surface-finishes",
    title: "Understanding PCB Surface Finishes: HASL vs. ENIG",
    description: "The surface finish on your PCB protects the copper and ensures solderability. Which one is right for you? We compare the two most popular options: HASL and ENIG, covering their pros, cons, and ideal applications.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "pcb surface finish",
    author: "Chris Green",
    date: "October 15, 2023",
    tags: ["Fabrication", "HASL", "ENIG"],
  },
];

const allCategories = ["DFM", "Assembly", "Materials", "Fabrication", "PCB Design", "Manufacturing", "FR-4", "Rogers", "SMT", "THT", "HASL", "ENIG"];

export async function generateStaticParams() {
  return allCategories.map((category) => ({
    category: category.toLowerCase(),
  }));
}

export async function generateMetadata({ params }: { params: { category: string } }): Promise<Metadata> {
  const categoryName = allCategories.find(c => c.toLowerCase() === params.category);
  
  if (!categoryName) {
    return {
      title: "Category Not Found",
    };
  }

  return {
    title: `Posts in "${categoryName}" | PCB Flow Blog`,
    description: `Browse all blog posts categorized under ${categoryName}.`,
  };
}


export default function CategoryPage({ params }: { params: { category: string } }) {
  const categoryName = allCategories.find(c => c.toLowerCase() === params.category);

  if (!categoryName) {
    notFound();
  }

  const posts = allPosts.filter(post =>
    post.tags.some(tag => tag.toLowerCase() === params.category)
  );

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-12">
          {/* Page Header */}
          <div className="text-center mb-12 border-b pb-8">
            <p className="text-primary font-semibold mb-2">Category Archive</p>
            <h1 className="text-5xl font-extrabold tracking-tight text-foreground">
              {categoryName}
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              {posts.length} post{posts.length !== 1 ? 's' : ''} found in this category.
            </p>
             <Button asChild variant="outline" className="mt-6">
                <Link href="/resources/blog">
                    View All Posts
                </Link>
             </Button>
          </div>

          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Card key={post.slug} className="flex flex-col overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                   <Link href={`/resources/blog/${post.slug}`} className="block">
                    <Image
                      src={post.imageUrl}
                      alt={post.title}
                      width={600}
                      height={400}
                      className="w-full h-48 object-cover"
                      data-ai-hint={post.imageHint}
                    />
                   </Link>
                  <CardHeader>
                     <Link href={`/resources/blog/${post.slug}`}><CardTitle className="hover:text-primary transition-colors">{post.title}</CardTitle></Link>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-muted-foreground text-sm line-clamp-3">{post.description}</p>
                  </CardContent>
                  <CardFooter className="flex-col items-start gap-4">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1.5"><User className="h-3 w-3" /> {post.author}</div>
                        <div className="flex items-center gap-1.5"><Calendar className="h-3 w-3" /> {post.date}</div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map(tag => (
                          <Badge key={tag} variant={tag.toLowerCase() === params.category ? "default" : "secondary"}>{tag}</Badge>
                      ))}
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
                <p className="text-muted-foreground">No posts found in this category yet.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
