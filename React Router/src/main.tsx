import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Router from './router/Router'; // ✅ import your Router file

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router />   {/* ✅ render Router, not App */}
  </StrictMode>,
);
