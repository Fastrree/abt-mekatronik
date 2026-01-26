import { ReactNode } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { SkipLink } from '../SkipLink';

interface PageLayoutProps {
  children: ReactNode;
  className?: string;
}

/**
 * Page Layout Component
 * 
 * Wraps all pages with consistent structure:
 * - SkipLink (accessibility)
 * - Navbar (navigation)
 * - Main content area with id="main-content" (skip link target)
 * - Footer
 * 
 * WCAG 2.1 Level A Requirement: Skip link must have a target
 */
export function PageLayout({ children, className = '' }: PageLayoutProps) {
  return (
    <>
      <SkipLink />
      <Navbar />
      
      {/* Main content - Skip link target */}
      <main 
        id="main-content" 
        className={`scroll-mt-32 ${className}`}
        role="main"
        aria-label="Ana içerik"
        tabIndex={-1}
      >
        {children}
      </main>
      
      <Footer />
    </>
  );
}
