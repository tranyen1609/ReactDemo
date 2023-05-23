import React from 'react';
import { Box, Grid } from '@mui/material';
import './styles.scss';
import ProductItem from './product-item';
import { useParams, useSearchParams } from 'react-router-dom';
import { category } from '../../assets/category';
import { productList } from '../../assets/product-list';

function searchFilter(productList, searchText) {
  return productList.filter((item) => {
    return item.productName.toLowerCase().match(searchText.toLowerCase());
  });
}

function ProductList() {
  const { cate } = useParams();
  const [searchParams] = useSearchParams();
  const searchText = searchParams.get('search');
  let filterData = [...productList];
  let title = 'Tất cả sản phẩm';
  if (cate && cate !== 'home') {
    const cateItem = category.find((i) => i.cateURL === cate);
    title = cateItem?.cateName;
    filterData = filterData.filter((data) => data.cateId === cateItem.cateId);
  }
  if (searchText) {
    filterData = searchFilter(filterData, searchText);
  }
  console.log(filterData);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <div className="title">
        <span>{title}</span>
      </div>
      <Grid container>
        {filterData?.map((product) => (
          <ProductItem key={product.productId} product={product} />
        ))}
      </Grid>
    </Box>
  );
}

export default ProductList;
