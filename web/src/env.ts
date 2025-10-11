interface Env {
  VITE_FRONTEND_URL: string;
  VITE_BACKEND_URL: string;
}

const env: Env = {
  VITE_FRONTEND_URL: import.meta.env.VITE_FRONTEND_URL,
  VITE_BACKEND_URL: import.meta.env.VITE_BACKEND_URL,
} as Env;

// Perform additional validation here if needed
if (!env.VITE_FRONTEND_URL || !env.VITE_BACKEND_URL) {
  throw new Error('Missing environment variables');
}

export default env;
