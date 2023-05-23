import React from 'react';
import { useForm } from 'react-hook-form';
import './styles.scss';
import { Button, FormControl, FormControlLabel, Radio, RadioGroup, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { next } from '../../../features/cart/paymentSlice';
import { removeAll } from '../../../features/cart/cartSlice';

function OrderInfo() {
  const dispatch = useDispatch();
  const userData = JSON.parse(localStorage.getItem('loginUser')) || null;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      gender: userData.gender,
      fullName: userData.fullName,
      phoneNumber: userData.phoneNumber,
      email: userData.email,
    },
  });
  const onSubmit = (data) => {
    dispatch(removeAll());
    dispatch(next());
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="user-form">
          <div className="mb-12">
            <b>Thông tin khách hàng</b>
          </div>
          <FormControl className="mb-12">
            <RadioGroup
              defaultValue="male"
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                {...register('gender', { required: true })}
                value="male"
                control={<Radio />}
                label="Anh"
              />
              <FormControlLabel
                {...register('gender', { required: true })}
                value="female"
                control={<Radio />}
                label="Chị"
              />
            </RadioGroup>
          </FormControl>
          <TextField
            className="mb-12"
            fullWidth
            size="small"
            error={!!errors.fullName}
            id="fullName"
            label="Họ và Tên"
            variant="outlined"
            type="text"
            placeholder="Họ và Tên"
            {...register('fullName', { required: true, maxLength: 80 })}
          />
          <TextField
            className="mb-12"
            fullWidth
            size="small"
            error={!!errors.phoneNumber}
            id="phoneNumber"
            label="Số điện thoại"
            variant="outlined"
            type="tel"
            placeholder="Số điện thoại"
            {...register('phoneNumber', {
              required: true,
              pattern: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
            })}
          />
          <TextField
            className="mb-12"
            fullWidth
            size="small"
            error={!!errors.email}
            id="email"
            label="Email"
            variant="outlined"
            type="text"
            placeholder="Email"
            {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
          />
          <TextField
            className="mb-12"
            fullWidth
            size="small"
            error={!!errors.address}
            id="address"
            label="Địa chỉ nhận hàng"
            variant="outlined"
            type="text"
            placeholder="Địa chỉ nhận hàng"
            value={userData?.address}
            {...register('address', { required: true })}
          />
        </div>
        <div className="user-form">
          <div className="mb-12">
            <b>Chọn hình thức thanh toán</b>
          </div>
          <FormControl className="mb-12">
            <RadioGroup
              defaultValue="2"
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel value="1" control={<Radio />} label="Thẻ Visa, Master, JCB" />
              <FormControlLabel value="2" control={<Radio />} label="Tiền mặt khi nhận hàng"/>
              <FormControlLabel value="3" control={<Radio />} label="Chuyển khoản" />
              <FormControlLabel value="4" control={<Radio />} label="Cà thẻ khi nhận hàng" />
            </RadioGroup>
          </FormControl>
        </div>
        <div className="btn-order">
          <Button variant="contained" type="submit">
            Hoàn tất mua
          </Button>
        </div>
      </form>
    </div>
  );
}

export default OrderInfo;
