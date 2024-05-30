import { Outlet } from 'react-router-dom';

import Footer from '@/components/footer';
import Header from '@/components/header';
import ColorContextProvider from '@/contexts/ColorContext';

const Root = () => {
  return (
    <ColorContextProvider>
      <div className="container">
        <Header />
        <main className="p-20 space-y-8">
          <Outlet />
        </main>
        <Footer />
      </div>
    </ColorContextProvider>
  );
};

export default Root;
