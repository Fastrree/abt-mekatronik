/**
 * Lazy-loaded Components for Performance Optimization
 * These components are loaded on-demand to reduce initial bundle size
 */

import { lazy, Suspense, ComponentType } from 'react';

// Lazy load heavy components
export const FAQ = lazy(() => import('@/components/FAQ'));
export const Testimonials = lazy(() => import('@/components/Testimonials'));
export const ClientLogos = lazy(() => import('@/components/ClientLogos'));

// Loading fallback component
export function ComponentLoader() {
  return (
    <div className="w-full py-24 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-zinc-300 dark:border-zinc-600 border-t-red-600 rounded-full animate-spin" />
        <p className="text-sm text-zinc-600 dark:text-zinc-400">Yükleniyor...</p>
      </div>
    </div>
  );
}

// Wrapper component with Suspense
export function LazyComponent({ component: Component, ...props }: { component: ComponentType<any> } & any) {
  return (
    <Suspense fallback={<ComponentLoader />}>
      <Component {...props} />
    </Suspense>
  );
}
