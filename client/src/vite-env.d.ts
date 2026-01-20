/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SENTRY_DSN: string;
  readonly VITE_GA_MEASUREMENT_ID: string;
  readonly VITE_APP_VERSION: string;
  readonly MODE: 'development' | 'production';
  readonly DEV: boolean;
  readonly PROD: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// jsVectorMap type declarations
declare module 'jsvectormap' {
  export interface JsVectorMapOptions {
    selector: HTMLElement | string;
    map: string;
    zoomButtons?: boolean;
    zoomOnScroll?: boolean;
    zoomMax?: number;
    zoomMin?: number;
    regionStyle?: {
      initial?: {
        fill?: string;
        stroke?: string;
        strokeWidth?: number;
        fillOpacity?: number;
      };
      hover?: {
        fill?: string;
        cursor?: string;
      };
      selected?: {
        fill?: string;
      };
    };
    series?: {
      regions?: Array<{
        attribute: string;
        values: Record<string, string>;
      }>;
    };
    onRegionTooltipShow?: (event: any, tooltip: any, code: string) => void;
  }

  export default class JsVectorMap {
    constructor(options: JsVectorMapOptions);
    updateSeries(type: string, data: any): void;
    destroy(): void;
  }
}

declare module 'jsvectormap/dist/maps/world.js' {
  const world: any;
  export default world;
}
