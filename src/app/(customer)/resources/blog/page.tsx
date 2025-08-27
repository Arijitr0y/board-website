
import { Header } from "@/components/pcb-flow/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Calendar, User, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const posts = [
  {
    slug: "demystifying-dfm",
    title: "Demystifying DFM: How to Avoid Common PCB Manufacturing Pitfalls",
    description: "Design for Manufacturability (DFM) is crucial for efficient and cost-effective PCB production. In this post, we explore the most common pitfalls designers face and how to avoid them, ensuring your project stays on time and on budget.",
    imageUrl: "https://placehold.co/800x450.png",
    imageHint: "pcb design schematic",
    author: "Jane Doe",
    date: "October 26, 2023",
    tags: ["DFM", "PCB Design", "Manufacturing"],
    featured: true,
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

const featuredPost = posts.find(p => p.featured);
const otherPosts = posts.filter(p => !p.featured);
const categories = ["DFM", "Assembly", "Materials", "Fabrication", "PCB Design"];

export default function BlogPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-12">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-extrabold tracking-tight text-foreground">From the Blog</h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              Insights, tutorials, and news from the world of PCB manufacturing and design.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              {/* Featured Post */}
              {featuredPost && (
                 <Card className="mb-12 overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <Link href={`/resources/blog/${featuredPost.slug}`} className="block">
                      <Image
                        src={featuredPost.imageUrl}
                        alt={featuredPost.title}
                        width={800}
                        height={450}
                        className="w-full object-cover"
                        data-ai-hint={featuredPost.imageHint}
                      />
                    </Link>
                    <CardHeader>
                      <Link href={`/resources/blog/${featuredPost.slug}`}>
                        <CardTitle className="text-3xl font-bold hover:text-primary transition-colors">{featuredPost.title}</CardTitle>
                      </Link>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">{featuredPost.description}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2"><User className="h-4 w-4" /> {featuredPost.author}</div>
                        <div className="flex items-center gap-2"><Calendar className="h-4 w-4" /> {featuredPost.date}</div>
                      </div>
                    </CardContent>
                     <CardFooter>
                       <Button variant="link" className="p-0" asChild>
                         <Link href={`/resources/blog/${featuredPost.slug}`}>Read More <ArrowRight className="ml-2 h-4 w-4" /></Link>
                       </Button>
                    </CardFooter>
                 </Card>
              )}

              {/* Regular Posts Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {otherPosts.map((post) => (
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
                        {post.tags.map(tag => <Badge key={tag} variant="secondary" asChild><Link href={`/resources/blog/category/${tag.toLowerCase()}`}>{tag}</Link></Badge>)}
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1 space-y-8">
               <Card>
                <CardHeader><CardTitle>Categories</CardTitle></CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {categories.map(category => (
                      <li key={category}>
                        <Link href={`/resources/blog/category/${category.toLowerCase()}`} className="text-muted-foreground hover:text-primary transition-colors">
                          {category}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle>Recent Posts</CardTitle></CardHeader>
                <CardContent>
                   <ul className="space-y-4">
                    {posts.slice(0, 3).map(post => (
                      <li key={post.slug}>
                         <Link href={`/resources/blog/${post.slug}`} className="font-semibold text-foreground hover:text-primary transition-colors block">
                          {post.title}
                        </Link>
                        <p className="text-xs text-muted-foreground mt-1">{post.date}</p>
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
