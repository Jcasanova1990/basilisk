import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app';

document.addEventListener('DOMContentLoaded', () => {
  const rootContainer = document.getElementById('gameCanvas');
  if (!rootContainer) {
    console.error('Root container element not found.');
    return;
  }

  createRoot(rootContainer).render(
    <App />
  );
});
