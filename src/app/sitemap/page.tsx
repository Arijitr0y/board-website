
import { Header } from "@/components/pcb-flow/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

const Section = ({ title, links }: { title: string; links: { href: string; name: string }[] }) => (
  <Card>
    <CardHeader>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <ul className="space-y-3">
        {links.map(link => (
          <li key={link.href}>
            <Link href={link.href} className="flex items-center text-muted-foreground hover:text-primary transition-colors">
              <ChevronRight className="h-4 w-4 mr-2" />
              <span>{link.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </CardContent>
  </Card>
);


export default function SitemapPage() {
  const mainLinks = [
    { href: "/", name: "Home" },
    { href: "/order", name: "Instant Quote" },
    { href: "/cart", name: "Shopping Cart" },
    { href: "/checkout", name: "Checkout" },
  ];

  const servicesLinks = [
    { href: "/services/prototyping", name: "PCB Prototyping" },
    { href: "/services/assembly", name: "PCB Assembly" },
    { href: "/services/dfm-analysis", name: "DFM Analysis" },
  ];

  const resourcesLinks = [
    { href: "/resources/blog", name: "Blog" },
    { href: "/resources/gerber-viewer", name: "Gerber Viewer" },
    { href: "/resources/capabilities", name: "Capabilities" },
  ];
  
  const accountLinks = [
    { href: "/account/dashboard", name: "My Account" },
    { href: "/account/dashboard?view=orders", name: "My Orders" },
    { href: "/account/dashboard?view=profile", name: "Profile Information" },
    { href: "/account/dashboard?view=addresses", name: "Addresses" },
  ];

  const policyLinks = [
    { href: "#", name: "Terms Of Use" },
    { href: "#", name: "Privacy Policy" },
    { href: "#", name: "Security" },
  ];


  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-extrabold tracking-tight text-foreground">Sitemap</h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              An overview of all pages on the PCB Flow website.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Section title="Main" links={mainLinks} />
            <Section title="Services" links={servicesLinks} />
            <Section title="Resources" links={resourcesLinks} />
            <Section title="My Account" links={accountLinks} />
            <Section title="Legal" links={policyLinks} />
          </div>
        </div>
      </main>
    </div>
  );
}
