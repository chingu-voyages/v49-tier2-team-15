import { Outlet } from 'react-router-dom';

import Footer from '@/components/footer';
import Navigation from '@/components/navigation';
import ColorProvider from '@/context/ColorContext';

const Root = () => {
  return (
    <ColorProvider>
      <div className="container flex flex-col min-h-screen">
        <Navigation />
        <main className="flex-1 space-y-8">
          <Outlet />
        </main>
        <Footer />
      </div>
    </ColorProvider>
  );
};

export default Root;
