import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import { Button, List } from '@mui/material';
import CartItem from '../cart-item';
import { priceSplitter } from '../../../features/format/currencyFormat';
import { productList } from '../../../assets/product-list';
import { useDispatch } from 'react-redux';
import { next } from '../../../features/cart/paymentSlice';

CartList.propTypes = {
  cartData: PropTypes.array,
};

function CartList({ cartData }) {
  const dispatch = useDispatch();
  const shipFee = 15000;
  let total = 0;
  cartData.map(
    (data) =>
      (total += productList.find((i) => i.productId === data.productId).price * data.quantity)
  );
  return (
    <div>
      <div className="cart-body">
        <List>
          {cartData?.map((data) => (
            <CartItem key={data.productId} cartItem={data} />
          ))}
        </List>
      </div>
      <div className="cart-total">
        <div className="cost">
          <span>Tạm tính:</span>
          <label>{priceSplitter(total)}</label>
        </div>
        <div className="cost">
          <span>Phí giao hàng, phụ phí:</span>
          <label>{priceSplitter(shipFee)}</label>
        </div>
        <div className="cost">
          <span>
            <b>Tổng cộng:</b>
          </span>
          <label>
            <b>{priceSplitter(total + shipFee)}</b>
          </label>
        </div>
      </div>
      <div className="btn-order">
        <Button type="submit" variant="contained" onClick={() => dispatch(next())}>
          Đặt hàng
        </Button>
      </div>
    </div>
  );
}

export default CartList;
