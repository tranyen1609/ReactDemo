import React from 'react';
import PropTypes from 'prop-types';
import { Button, Grid, Stack } from '@mui/material';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { useDispatch } from 'react-redux';
import { decrease, increase, remove } from '../../../features/cart/cartSlice';
import { priceSplitter } from '../../../features/format/currencyFormat';

ProductItem.propTypes = {
  product: PropTypes.object,
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
}));

function ProductItem({ product }) {
  let cartData = JSON.parse(localStorage.getItem('cartData')) || [];
  const dataItem = cartData?.find((data) => data.productId === product.productId);
  const [cart, setCart] = useState(dataItem ? dataItem.quantity : 0);

  const dispatch = useDispatch();
  const handleIncreaseClick = (productId) => {
    setCart((x) => x + 1);
    dispatch(increase(productId));
  };
  const handleDecreaseClick = (productId) => {
    setCart((x) => x - 1);
    if (cart === 1) {
      dispatch(remove(productId));
    } else {
      dispatch(decrease(productId));
    }
  };

  return (
    <Grid item xs={3}>
      <Item>
        <img
          className="product-img"
          src={product.imageUrl}
          alt={product.productName}
          loading="lazy"
        />
        <div className="product-info">
          <h4 className="product-name">{product.productName}</h4>
          <span>{priceSplitter(product.price)}</span>
        </div>
        {cart === 0 ? (
          <Button
            className="buy-btn"
            variant="outlined"
            color="success"
            onClick={() => {
              handleIncreaseClick(product.productId);
            }}
          >
            Chọn
          </Button>
        ) : (
          <Stack direction="row">
            <Button
              variant="outlined"
              color="success"
              onClick={() => {
                handleDecreaseClick(product.productId);
              }}
            >
              -
            </Button>
            <Button variant="outlined" color="success">
              {cart}
            </Button>
            <Button
              variant="outlined"
              color="success"
              onClick={() => {
                handleIncreaseClick(product.productId);
              }}
            >
              +
            </Button>
          </Stack>
        )}
      </Item>
    </Grid>
  );
}

export default ProductItem;
