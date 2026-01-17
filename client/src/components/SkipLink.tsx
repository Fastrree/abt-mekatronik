/**
 * Skip Link Component - Accessibility Enhancement
 * Allows keyboard users to skip directly to main content
 * WCAG 2.1 Level A Requirement
 */

export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:px-6 focus:py-3 focus:bg-red-600 focus:text-white focus:font-bold focus:rounded-lg focus:shadow-2xl focus:outline-none focus:ring-4 focus:ring-red-600/50 transition-all"
      tabIndex={0}
    >
      Ana içeriğe atla / Skip to main content
    </a>
  );
}
