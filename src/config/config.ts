export const config = {
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001',
  },
  app: {
    name: import.meta.env.VITE_APP_NAME || '42.AI Horizon',
    version: import.meta.env.VITE_APP_VERSION || '1.0.0',
  },
} as const;

export const API_ENDPOINTS = {
  PROJECTS: `${config.api.baseUrl}/api/projects`,
  PROJECTS_FEATURED: `${config.api.baseUrl}/api/projects/featured`,
  SERVICES: `${config.api.baseUrl}/api/services`,
  SERVICE_INQUIRY: `${config.api.baseUrl}/api/service-inquiry`,
  CONTACT: `${config.api.baseUrl}/api/contact`,
  HEALTH: `${config.api.baseUrl}/api/health`,
} as const;