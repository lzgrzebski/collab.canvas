export const COLORS = ['#CCA43B', '#36558F', '#40376E', '#40376E', '#D36582'];

export const HOST = import.meta.env.HOST ?? 'localhost';
export const PORT = import.meta.env.PORT ?? '3214';
export const PROVIDER_URL = `${
    HOST === 'localhost' ? 'ws' : 'wss'
}://${HOST}:${PORT}`;

export const STROKE_OPTIONS = {
    size: 20,
    smoothing: 0.5,
    streamline: 0.5,
    thinning: 0.5,
} as const;
export const ZOOM_STEP = 0.05;
export const DEFAULT_COLOR = '#51a3a3';
export const DEFAULT_TIMEOUT = 3000;
