import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router";
import { NuqsAdapter } from 'nuqs/adapters/react-router/v7'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import '@fontsource-variable/inter/index.css';

import './index.css'
import App from './App.tsx'
import { TooltipProvider } from '@/client/components/ui/tooltip.tsx';
import { Toaster } from '@/client/components/ui/sonner.tsx';

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NuqsAdapter>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <TooltipProvider>
            <App />
            <Toaster />
          </TooltipProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </NuqsAdapter>
  </StrictMode>,
)
