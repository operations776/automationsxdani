import { useEffect } from 'react';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Index from './pages/Index';
import WorkPage from './pages/WorkPage';
import TestimonialsPage from './pages/TestimonialsPage';
import ServicePage from './pages/ServicePage';
import BlogIndex from './pages/BlogIndex';
import BlogPost from './pages/BlogPost';
import NotFound from './pages/NotFound';
import { ContactDialogProvider } from './components/contact-dialog';
import LegoGuide from './components/lego-guide';
import TitleTicker from './components/title-ticker';
import { SERVICES } from '@/data/services';
import { POSTS } from '@/data/posts';

const queryClient = new QueryClient();

/* Scrolls to the hash target after route changes, or to the top for
   plain navigations. */
const ScrollManager = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const timer = setTimeout(() => {
        document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' });
      }, 80);
      return () => clearTimeout(timer);
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
};

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollManager />
          <TitleTicker />
          <ContactDialogProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/work" element={<WorkPage />} />
              <Route path="/testimonials" element={<TestimonialsPage />} />
              {SERVICES.map((service) => (
                <Route key={service.slug} path={`/${service.slug}`} element={<ServicePage service={service} />} />
              ))}
              <Route path="/blog" element={<BlogIndex />} />
              {POSTS.map((post) => (
                <Route key={post.slug} path={`/blog/${post.slug}`} element={<BlogPost post={post} />} />
              ))}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <LegoGuide />
          </ContactDialogProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
