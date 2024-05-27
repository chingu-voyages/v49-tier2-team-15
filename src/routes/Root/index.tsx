import { Outlet } from 'react-router-dom';

import Header from '@/components/header';

const Root = () => {
  return (
    <div className="container">
      <Header />
      <main className="p-20 space-y-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Root;
