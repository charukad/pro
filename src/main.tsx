import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Global error handlers for debugging
window.addEventListener('error', (e) => {
  console.error('Global error:', e.error, e.filename, e.lineno, e.colno);
});

window.addEventListener('unhandledrejection', (e) => {
  console.error('Unhandled promise rejection:', e.reason);
});

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error('Root element not found');
}

createRoot(rootElement).render(<App />);
