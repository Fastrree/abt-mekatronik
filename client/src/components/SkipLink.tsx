/**
 * Skip Link Component - Accessibility Enhancement
 * Allows keyboard users to skip directly to main content
 * WCAG 2.1 Level A Requirement
 * 
 * Features:
 * - Smooth scroll to main content
 * - Visual feedback (red outline on h1 for 2 seconds)
 * - Centers h1 in viewport
 */

export function SkipLink() {
  const handleSkipClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    // Find main content
    const mainContent = document.getElementById('main-content');
    if (!mainContent) return;
    
    // Find first h1 heading
    const heading = mainContent.querySelector('h1');
    
    if (heading) {
      // Add visual feedback - red outline for 2 seconds
      heading.style.outline = '3px solid #DC2626';
      heading.style.outlineOffset = '4px';
      
      // Remove outline after 2 seconds
      setTimeout(() => {
        heading.style.outline = '';
        heading.style.outlineOffset = '';
      }, 2000);
      
      // Scroll to heading (center of screen)
      heading.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
      });
      
      // Focus heading for screen readers
      heading.setAttribute('tabindex', '-1');
      heading.focus();
    } else {
      // Fallback: scroll to main content
      mainContent.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
      mainContent.focus();
    }
  };

  return (
    <a
      href="#main-content"
      onClick={handleSkipClick}
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:px-6 focus:py-3 focus:bg-red-600 focus:text-white focus:font-bold focus:rounded-lg focus:shadow-2xl focus:outline-none focus:ring-4 focus:ring-red-600/50 transition-all"
      tabIndex={0}
    >
      Ana içeriğe atla / Skip to main content
    </a>
  );
}
