import { React, Suspense, lazy } from 'react';
import './styles.scss';
import CircularProgress from '@mui/material/CircularProgress';

const Sidebar = lazy(() => import('../sidebar'));
const ProductList = lazy(() => import('../product-list'));
function Home() {
  return (
    <main>
      <div className="sidebar">
        <Suspense fallback={<CircularProgress />}>
          <Sidebar />
        </Suspense>
      </div>
      <div className="content">
        <Suspense fallback={<CircularProgress />}>
          <ProductList />
        </Suspense>
      </div>
    </main>
  );
}

export default Home;
