import Link from "next/link";
import { Facebook, Twitter, Youtube, Instagram, Briefcase, HelpCircle, Gift } from "lucide-react";

const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link href={href} className="text-gray-400 hover:text-white transition-colors">
    {children}
  </Link>
);

const FooterSectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-sm font-bold text-gray-500 uppercase mb-4">{children}</h3>
);

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {/* About Section */}
          <div className="space-y-3">
            <FooterSectionTitle>About</FooterSectionTitle>
            <FooterLink href="#">Contact Us</FooterLink>
            <FooterLink href="#">About Us</FooterLink>
            <FooterLink href="#">Careers</FooterLink>
            <FooterLink href="/resources/blog">Blog</FooterLink>
            <FooterLink href="#">Press</FooterLink>
          </div>

          {/* Services Section */}
          <div className="space-y-3">
            <FooterSectionTitle>Services</FooterSectionTitle>
            <FooterLink href="/services/prototyping">PCB Prototyping</FooterLink>
            <FooterLink href="/services/assembly">PCB Assembly</FooterLink>
            <FooterLink href="/services/dfm-analysis">DFM Analysis</FooterLink>
          </div>
          
          {/* Help Section */}
          <div className="space-y-3">
            <FooterSectionTitle>Help</FooterSectionTitle>
            <FooterLink href="#">Payments</FooterLink>
            <FooterLink href="#">Shipping</FooterLink>
            <FooterLink href="#">Cancellation & Returns</FooterLink>
            <FooterLink href="#">FAQ</FooterLink>
          </div>

          {/* Policy Section */}
          <div className="space-y-3">
            <FooterSectionTitle>Policy</FooterSectionTitle>
            <FooterLink href="#">Return Policy</FooterLink>
            <FooterLink href="#">Terms Of Use</FooterLink>
            <FooterLink href="#">Security</FooterLink>
            <FooterLink href="#">Privacy</FooterLink>
            <FooterLink href="#">Sitemap</FooterLink>
          </div>

          {/* Mail Us Section */}
          <div className="space-y-3 col-span-2 md:col-span-2 lg:col-span-2 border-l border-gray-700 pl-8">
            <FooterSectionTitle>Mail Us</FooterSectionTitle>
            <p className="text-gray-400 text-sm">
              PCB Flow Internet Private Limited,<br />
              Buildings Alyssa, Begonia & Clove Embassy Tech Village,<br />
              Outer Ring Road, Devarabeesanahalli Village,<br />
              Bengaluru, 560103,<br />
              Karnataka, India
            </p>
            <div className="flex space-x-4 pt-4">
              <FooterLink href="#"><Facebook className="h-6 w-6" /></FooterLink>
              <FooterLink href="#"><Twitter className="h-6 w-6" /></FooterLink>
              <FooterLink href="#"><Youtube className="h-6 w-6" /></FooterLink>
              <FooterLink href="#"><Instagram className="h-6 w-6" /></FooterLink>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-sm">
          <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center">
            <a href="#" className="flex items-center gap-2 text-gray-400 hover:text-white"><Briefcase className="h-4 w-4" /> Become a Supplier</a>
            <a href="#" className="flex items-center gap-2 text-gray-400 hover:text-white"><HelpCircle className="h-4 w-4" /> Help Center</a>
            <a href="#" className="flex items-center gap-2 text-gray-400 hover:text-white"><Gift className="h-4 w-4" /> Gift Cards</a>
          </div>
          <div className="mt-4 md:mt-0">
            <img src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/payment-method-c454fb.svg" alt="Payment Methods" />
          </div>
           <div className="mt-4 md:mt-0">
            <p className="text-gray-500">&copy; {new Date().getFullYear()} PCB Flow. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
