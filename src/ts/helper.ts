export function getBackendUrl() {
    if(import.meta.env.VITE_APP_BACKEND_URL) return import.meta.env.VITE_APP_BACKEND_URL; 
    return process.env.NODE_ENV === 'development' ? 'http://localhost:3000/api' : '/api';
}