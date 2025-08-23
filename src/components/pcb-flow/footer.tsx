import Link from "next/link";
import { Facebook, Twitter, Youtube, Instagram, Briefcase, HelpCircle, Gift } from "lucide-react";

const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link href={href} className="text-gray-400 hover:text-white transition-colors">
    {children}
  </Link>
);

const FooterSectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">{children}</h3>
);

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {/* About Section */}
          <div>
            <FooterSectionTitle>About</FooterSectionTitle>
            <ul className="space-y-3">
              <li><FooterLink href="#">Contact Us</FooterLink></li>
              <li><FooterLink href="#">About Us</FooterLink></li>
              <li><FooterLink href="#">Careers</FooterLink></li>
              <li><FooterLink href="/resources/blog">Blog</FooterLink></li>
              <li><FooterLink href="#">Press</FooterLink></li>
            </ul>
          </div>

          {/* Services Section */}
          <div>
            <FooterSectionTitle>Services</FooterSectionTitle>
            <ul className="space-y-3">
              <li><FooterLink href="/services/prototyping">PCB Prototyping</FooterLink></li>
              <li><FooterLink href="/services/assembly">PCB Assembly</FooterLink></li>
              <li><FooterLink href="/services/dfm-analysis">DFM Analysis</FooterLink></li>
            </ul>
          </div>
          
          {/* Help Section */}
          <div>
            <FooterSectionTitle>Help</FooterSectionTitle>
            <ul className="space-y-3">
              <li><FooterLink href="#">Payments</FooterLink></li>
              <li><FooterLink href="#">Shipping</FooterLink></li>
              <li><FooterLink href="#">Cancellation & Returns</FooterLink></li>
              <li><FooterLink href="#">FAQ</FooterLink></li>
            </ul>
          </div>

          {/* Policy Section */}
          <div>
            <FooterSectionTitle>Policy</FooterSectionTitle>
            <ul className="space-y-3">
              <li><FooterLink href="#">Return Policy</FooterLink></li>
              <li><FooterLink href="#">Terms Of Use</FooterLink></li>
              <li><FooterLink href="#">Security</FooterLink></li>
              <li><FooterLink href="#">Privacy</FooterLink></li>
              <li><FooterLink href="#">Sitemap</FooterLink></li>
            </ul>
          </div>

          {/* Mail Us Section */}
          <div className="space-y-4 col-span-2 md:col-span-2 lg:col-span-2 lg:border-l lg:border-gray-700 lg:pl-8">
            <FooterSectionTitle>Mail Us</FooterSectionTitle>
            <address className="text-gray-400 text-sm not-italic">
              PCB Flow Internet Private Limited,<br />
              Buildings Alyssa, Begonia & Clove Embassy Tech Village,<br />
              Outer Ring Road, Devarabeesanahalli Village,<br />
              Bengaluru, 560103,<br />
              Karnataka, India
            </address>
            <div className="flex space-x-4 pt-2">
              <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-white"><Facebook className="h-6 w-6" /></a>
              <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-white"><Twitter className="h-6 w-6" /></a>
              <a href="#" aria-label="Youtube" className="text-gray-400 hover:text-white"><Youtube className="h-6 w-6" /></a>
              <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-white"><Instagram className="h-6 w-6" /></a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-sm space-y-4 md:space-y-0">
          <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center">
            <a href="#" className="flex items-center gap-2 text-gray-400 hover:text-white"><Briefcase className="h-4 w-4" /> Become a Supplier</a>
            <a href="#" className="flex items-center gap-2 text-gray-400 hover:text-white"><HelpCircle className="h-4 w-4" /> Help Center</a>
            <a href="#" className="flex items-center gap-2 text-gray-400 hover:text-white"><Gift className="h-4 w-4" /> Gift Cards</a>
          </div>
          <div>
            <img src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/payment-method-c454fb.svg" alt="Payment Methods" />
          </div>
           <div>
            <p className="text-gray-500">&copy; {new Date().getFullYear()} PCB Flow. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
