import React from 'react';
import Sidebar from '../sidebar';
import ProductList from '../product-list';
import './styles.scss';

function Home() {
  return (
    <main>
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="content">
        <ProductList />
      </div>
    </main>
  );
}

export default Home;
