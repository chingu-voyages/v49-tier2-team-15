import { Outlet } from 'react-router-dom';

import Footer from '@/components/footer';
import Header from '@/components/header';

const Root = () => {
  return (
    <div className="container">
      <Header />
      <main className="p-20 space-y-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Root;
