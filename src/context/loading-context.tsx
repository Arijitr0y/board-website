
'use client';

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link, { LinkProps } from 'next/link';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingContextType {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Hide loading indicator when navigation is complete
    setIsLoading(false);
  }, [pathname]);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};

export const InstantLoadingIndicator = () => {
  const { isLoading } = useLoading();

  return (
    <div
      className={cn(
        "fixed inset-0 z-[9999] flex items-center justify-center bg-background/80 backdrop-blur-sm transition-opacity duration-300",
        isLoading ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
    >
      <Loader2 className="h-16 w-16 animate-spin text-primary" />
    </div>
  );
};

export const LoadingLink = React.forwardRef<HTMLAnchorElement, LinkProps & { children: React.ReactNode; className?: string }>(
  ({ href, onClick, ...props }, ref) => {
    const { setIsLoading } = useLoading();
    const router = useRouter();
    const pathname = usePathname();

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (onClick) {
        onClick(e);
      }
      
      const targetPath = typeof href === 'string' ? href : href.pathname || '';
      // Don't show loading for the same page or external links
      if (targetPath === pathname || targetPath.startsWith('http')) {
        return;
      }

      e.preventDefault();
      setIsLoading(true);
      router.push(href.toString());
    };

    return <Link href={href} onClick={handleClick} {...props} ref={ref} />;
  }
);

LoadingLink.displayName = 'LoadingLink';
