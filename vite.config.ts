import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { metaImagesPlugin } from "./vite-plugin-meta-images";

export default defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    tailwindcss(),
    metaImagesPlugin(),
    // SEO Strategy (No pre-rendering needed):
    // 1. Vercel's automatic static optimization
    // 2. Comprehensive meta tags + Schema.org structured data
    // 3. Sitemap.xml for crawler discovery
    // 4. Google Search Console for indexing
    // 5. Server-side rendering on Vercel Edge Network
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer(),
          ),
          await import("@replit/vite-plugin-dev-banner").then((m) =>
            m.devBanner(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  css: {
    postcss: {
      plugins: [],
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    // Performance optimizations
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor splitting for better caching
          'react-vendor': ['react', 'react-dom', 'react/jsx-runtime'],
          'router-vendor': ['wouter'],
          'ui-vendor': [
            '@radix-ui/react-accordion', 
            '@radix-ui/react-dialog', 
            '@radix-ui/react-toast',
            '@radix-ui/react-slot',
            '@radix-ui/react-label',
          ],
          'form-vendor': ['react-hook-form', '@hookform/resolvers', 'zod'],
          'utils-vendor': ['clsx', 'tailwind-merge', 'class-variance-authority'],
          'icons-vendor': ['lucide-react'],
          'query-vendor': ['@tanstack/react-query'],
          'theme-vendor': ['next-themes'],
        },
        // Optimize chunk names for better caching
        chunkFileNames: (chunkInfo) => {
          // Separate vendor chunks from app chunks
          const isVendor = chunkInfo.name.includes('vendor');
          return isVendor 
            ? 'assets/vendor/[name]-[hash].js'
            : 'assets/[name]-[hash].js';
        },
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          // Organize assets by type
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico|webp/i.test(ext)) {
            return 'assets/images/[name]-[hash].[ext]';
          } else if (/woff2?|ttf|otf|eot/i.test(ext)) {
            return 'assets/fonts/[name]-[hash].[ext]';
          }
          return 'assets/[name]-[hash].[ext]';
        },
      },
    },
    // Chunk size warnings
    chunkSizeWarningLimit: 500, // Stricter limit for better performance
    // Minification with esbuild (faster than terser)
    minify: 'esbuild',
    // Target modern browsers for smaller bundle
    target: 'es2020',
    // Source maps (disable in production for smaller bundle)
    sourcemap: false,
    // CSS code splitting
    cssCodeSplit: true,
    // Optimize dependencies
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    // Compression
    reportCompressedSize: true,
    // Optimize assets
    assetsInlineLimit: 4096, // Inline assets smaller than 4kb
  },
  server: {
    host: "0.0.0.0",
    allowedHosts: true,
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
