import React from 'react';
import './styles.scss';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { reset } from '../../../features/cart/paymentSlice';

function PaymentInfo() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div>
      <div className="verify-icon">
        <TaskAltIcon color="success" sx={{ fontSize: 70 }} />
      </div>
      <div>
        <b>Xác nhận đơn hàng thành công! Cảm ơn quý khách đã mua hàng!</b>
      </div>
      <div className="home-btn">
        <Button
          type="submit"
          variant="contained"
          onClick={() => {
            dispatch(reset());
            navigate('/');
          }}
        >
          Tiếp tục mua hàng
        </Button>
      </div>
    </div>
  );
}

export default PaymentInfo;
