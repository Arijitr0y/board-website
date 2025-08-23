
import { Header } from "@/components/pcb-flow/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { User, Settings, MapPin, Package } from "lucide-react";

const DashboardItem = ({ icon, title, description, href }: { icon: React.ReactNode; title: string; description: string; href: string; }) => (
    <Card className="hover:shadow-lg transition-shadow">
        <CardHeader className="flex flex-row items-center gap-4">
            {icon}
            <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground mb-4">{description}</p>
            <Button asChild variant="outline">
                <Link href={href}>Manage</Link>
            </Button>
        </CardContent>
    </Card>
);

export default function AccountDashboardPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto px-4 py-12">
            <div className="mb-8">
                <h1 className="text-4xl font-extrabold tracking-tight">My Account</h1>
                <p className="text-lg text-muted-foreground mt-2">Manage your orders, personal information, and settings.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <DashboardItem 
                    icon={<Package className="h-8 w-8 text-primary" />}
                    title="My Orders"
                    description="Track, view history, and manage your PCB orders."
                    href="#"
                />
                <DashboardItem 
                    icon={<User className="h-8 w-8 text-primary" />}
                    title="Profile Information"
                    description="Edit your personal details and contact information."
                    href="#"
                />
                <DashboardItem 
                    icon={<MapPin className="h-8 w-8 text-primary" />}
                    title="Addresses"
                    description="Manage your shipping and billing addresses."
                    href="#"
                />
                <DashboardItem 
                    icon={<Settings className="h-8 w-8 text-primary" />}
                    title="Account Settings"
                    description="Update your password and communication preferences."
                    href="#"
                />
            </div>
        </div>
      </main>
    </div>
  );
}
