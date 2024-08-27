export function getBackendUrl() {
    return process.env.NODE_ENV === 'development' ? 'http://localhost:3000/api' : '/api';
}