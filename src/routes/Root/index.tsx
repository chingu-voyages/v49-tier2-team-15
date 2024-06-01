import { Outlet } from 'react-router-dom';

import Footer from '@/components/footer';
import Header from '@/components/header';
import ColorContextProvider from '@/contexts/ColorContext';

const Root = () => {
  return (
    <ColorContextProvider>
      <div className="container flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 p-20 space-y-8">
          <Outlet />
        </main>
        <Footer />
      </div>
    </ColorContextProvider>
  );
};

export default Root;
