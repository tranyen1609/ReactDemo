import React from 'react';
import './styles.scss';
import { Button, Stack, Step, StepLabel, Stepper } from '@mui/material';
import { useSelector } from 'react-redux';
import RemoveShoppingCartOutlinedIcon from '@mui/icons-material/RemoveShoppingCartOutlined';
import { useNavigate } from 'react-router-dom';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { styled } from '@mui/material/styles';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import CartList from './cart-list';
import PaymentInfo from './payment-info';
import OrderInfo from './order-info';

const ColorlibConnector = styled(StepConnector)(() => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: '#eaeaf0',
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled('div')(({ ownerState }) => ({
  backgroundColor: '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <ShoppingCartCheckoutIcon />,
    2: <HowToRegIcon />,
    3: <VerifiedUserIcon />,
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

const steps = ['Giỏ hàng', 'Thông tin đặt hàng', 'Hoàn tất'];

function Cart() {
  const navigate = useNavigate();
  const cartData = useSelector((state) => state.cart);
  const paymentStep = useSelector((state) => state.paymentStep);
  return (
    <div className="cart">
      <div className="cart-header">{steps[paymentStep]}</div>

      {(cartData && cartData.length > 0 && paymentStep === 0) || paymentStep !== 0 ? (
        <div>
          <Stack sx={{ width: '100%' }} className="process-cart">
            <Stepper alternativeLabel activeStep={paymentStep} connector={<ColorlibConnector />}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Stack>
          {(() => {
            switch (paymentStep) {
              case 1:
                return <OrderInfo />;
              case 2:
                return <PaymentInfo />;
              default:
                return <CartList cartData={cartData} />;
            }
          })()}
        </div>
      ) : (
        <div className="non-cart">
          <div className="non-cart-icon">
            <RemoveShoppingCartOutlinedIcon sx={{ fontSize: 70 }} />
          </div>
          <p>Bạn chưa có sản phẩm nào trong giỏ hàng</p>
          <Button className="btn-home" variant="contained" onClick={() => navigate('/')}>
            Về trang chủ
          </Button>
        </div>
      )}
    </div>
  );
}

export default Cart;
