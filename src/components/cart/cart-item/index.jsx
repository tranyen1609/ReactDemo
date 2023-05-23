import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Badge, ListItem, ListItemText } from '@mui/material';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { productList } from '../../../assets/product-list';
import './styles.scss';
import { useDispatch } from 'react-redux';
import { decrease, increase, remove } from '../../../features/cart/cartSlice';

CartItem.propTypes = {
  cartItem: PropTypes.object,
};

function CartItem({ cartItem }) {
  const product = productList.find((i) => i.productId === cartItem.productId);
  const [quantity, setQuantity] = useState(cartItem.quantity);

  const dispatch = useDispatch();
  const handleIncreaseClick = () => {
    setQuantity((x) => x + 1);
    dispatch(increase(cartItem.productId));
  };
  const handleDecreaseClick = () => {
    setQuantity((x) => x - 1);
    if (quantity === 1) {
      dispatch(remove(cartItem.productId));
    } else {
      dispatch(decrease(cartItem.productId));
    }
  };

  return (
    <ListItem className="cart-item">
      <Badge
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        badgeContent={<CancelRoundedIcon />}
        className="cart-badge"
        onClick={() => {
          dispatch(remove(cartItem.productId));
        }}
      >
        <img className="cart-img" src={product.imageUrl} alt={product.productName} />
      </Badge>
      <ListItemText primary={product.productName} secondary={product.price} />
      <div className="quantitynum">
        <i
          onClick={() => {
            handleDecreaseClick();
          }}
        >
          -
        </i>
        <input autoComplete="off" className="qty" disabled value={quantity} />
        <i
          onClick={() => {
            handleIncreaseClick();
          }}
        >
          +
        </i>
      </div>
    </ListItem>
  );
}

export default CartItem;
