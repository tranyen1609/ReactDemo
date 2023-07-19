import { createContext, useContext } from 'react';
import { productList } from './product-list';

const DataContext = createContext(null);

function useData() {
  const ctx = useContext(DataContext);
  if (ctx !== null) {
    ctx.read();
  }
  return productList;
}

export default useData;
