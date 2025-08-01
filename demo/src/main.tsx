import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from '.';

import './styles/reset.scss';
import './styles/index.scss';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
