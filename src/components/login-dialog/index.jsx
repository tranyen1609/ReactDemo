import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Link,
  Radio,
  RadioGroup,
  Snackbar,
  TextField,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

LoginDialog.propTypes = {
  open: PropTypes.bool,
  close: PropTypes.func,
};

function LoginDialog({ open, close }) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({ mode: 'onChange' });
  const [showPassword, setShowPassword] = useState(false);
  const [showConPassword, setShowConPassword] = useState(false);
  const [dialogForm, setDialogForm] = useState(1);
  const [header, setHeader] = useState('Đăng nhập');
  const [errorMessage, setErrorMessage] = useState('');
  const handleTogglePassword = () => setShowPassword((showPassword) => !showPassword);
  const handleToggleConPassword = () => setShowConPassword((showConPassword) => !showConPassword);
  useEffect(() => {
    setDialogForm(1);
    reset();
    setErrorMessage('');
  }, [close, reset]);
  const onLogin = (data) => {
    let userData = JSON.parse(localStorage.getItem('userData')) || [];
    const user = userData.find((user) => user.phoneNumber === data.phoneNumber);

    if (!user) {
      setErrorMessage('Số điện thoại không đúng.');
    } else if (user.password !== data.password) {
      setErrorMessage('Mật khẩu không đúng.');
    } else {
      localStorage.setItem('loginUser', JSON.stringify(user));
      handleClick();
      close();
      reset();
      setErrorMessage('');
    }
  };
  const onSignup = (data) => {
    let userData = JSON.parse(localStorage.getItem('userData')) || [];

    if (userData.find((user) => user.phoneNumber === data.phoneNumber)) {
      setErrorMessage('Số điện thoại này đã được tạo.');
    } else {
      const user = {
        gender: data.gender,
        fullName: data.fullName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        password: data.password,
      };
      userData = [...userData, user];
      localStorage.setItem('userData', JSON.stringify(userData));
      localStorage.setItem('loginUser', JSON.stringify(user));
      handleClick();
      close();
    }
  };
  const onForgetPassword = (data) => {
    let userData = JSON.parse(localStorage.getItem('userData')) || [];
    const user = userData.find((user) => user.email === data.email);

    if (!user) {
      setErrorMessage('Email chưa đăng ký.');
    } else {
      console.log('Mật khẩu của bạn: ', user.password);
      close();
    }
  };

  const [alert, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  return (
    <>
      <Dialog
        className="login"
        open={open}
        onClose={close}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <b>{header}</b>
        </DialogTitle>
        <div className="error-message">{errorMessage}</div>
        <DialogContent>
          {(() => {
            switch (dialogForm) {
              case 1:
                return (
                  <form onSubmit={handleSubmit(onLogin)}>
                    <div className="user-form">
                      <TextField
                        className="mt-12"
                        fullWidth
                        size="small"
                        error={!!errors.phoneNumber}
                        id="phoneNumber"
                        label="Số điện thoại"
                        variant="outlined"
                        type="text"
                        placeholder="Tên tài khoản"
                        {...register('phoneNumber', {
                          required: true,
                          pattern: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
                        })}
                      />
                      <TextField
                        className="mt-12"
                        fullWidth
                        size="small"
                        error={!!errors.password}
                        id="password"
                        label="Mật khẩu"
                        variant="outlined"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Mật khẩu"
                        {...register('password', { required: true })}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleTogglePassword}
                                edge="end"
                              >
                                {showPassword ? (
                                  <VisibilityOutlinedIcon />
                                ) : (
                                  <VisibilityOffOutlinedIcon />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </div>
                    <Link
                      href="#"
                      onClick={() => {
                        reset();
                        setDialogForm(3);
                        setHeader('Lấy lại mật khẩu');
                      }}
                      underline="none"
                    >
                      {'Quên mật khẩu?'}
                    </Link>
                    <DialogActions>
                      <Button className="confirmBtn" variant="contained" type="submit">
                        Đăng nhập
                      </Button>
                    </DialogActions>
                    <span>Bạn chưa có tài khoản? </span>
                    <Link
                      href="#"
                      onClick={() => {
                        reset();
                        setShowPassword(false);
                        setDialogForm(2);
                        setHeader('Đăng ký');
                      }}
                      underline="none"
                    >
                      {'Đăng ký tại đây'}
                    </Link>
                  </form>
                );
              case 2:
                return (
                  <form onSubmit={handleSubmit(onSignup)}>
                    <div className="user-form">
                      <FormControl>
                        <RadioGroup
                          row
                          aria-labelledby="demo-row-radio-buttons-group-label"
                          name="row-radio-buttons-group"
                        >
                          <FormControlLabel
                            {...register('gender', { required: true })}
                            value="male"
                            checked
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
                        className="mt-12"
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
                        className="mt-12"
                        fullWidth
                        size="small"
                        error={!!errors.email}
                        id="email"
                        label="Email"
                        variant="outlined"
                        type="text"
                        placeholder="Email"
                        {...register('email', { required: true })}
                      />
                      <TextField
                        className="mt-12"
                        fullWidth
                        size="small"
                        error={!!errors.phoneNumber}
                        id="phoneNumber"
                        label="Số điện thoại"
                        variant="outlined"
                        type="text"
                        placeholder="Số điện thoại"
                        {...register('phoneNumber', {
                          required: true,
                          pattern: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
                        })}
                      />
                      <TextField
                        className="mt-12"
                        fullWidth
                        size="small"
                        error={!!errors.password}
                        id="password"
                        label="Mật khẩu"
                        variant="outlined"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Mật khẩu"
                        {...register('password', { required: true })}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleTogglePassword}
                                edge="end"
                              >
                                {showPassword ? (
                                  <VisibilityOutlinedIcon />
                                ) : (
                                  <VisibilityOffOutlinedIcon />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                      <TextField
                        className="mt-12"
                        fullWidth
                        size="small"
                        error={!!errors.confirmPassword}
                        id="confirmPassword"
                        label="Nhập lại mật khẩu"
                        variant="outlined"
                        type={showConPassword ? 'text' : 'password'}
                        placeholder="Nhập lại mật khẩu"
                        {...register('confirmPassword', {
                          required: true,
                          validate: (val) => {
                            if (watch('password') !== val) {
                              return 'Mật khẩu không đúng';
                            }
                          },
                        })}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleToggleConPassword}
                                edge="end"
                              >
                                {showConPassword ? (
                                  <VisibilityOutlinedIcon />
                                ) : (
                                  <VisibilityOffOutlinedIcon />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                      <span className="error-message">
                        {errors.confirmPassword && errors.confirmPassword.message}
                      </span>
                    </div>
                    <DialogActions>
                      <Button className="confirmBtn" variant="contained" type="submit">
                        Đăng ký
                      </Button>
                    </DialogActions>
                    <span>Bạn đã có tài khoản? </span>
                    <Link
                      href="#"
                      onClick={() => {
                        reset();
                        setShowPassword(false);
                        setShowConPassword(false);
                        setDialogForm(1);
                        setHeader('Đăng nhập');
                        setErrorMessage('');
                      }}
                      underline="none"
                    >
                      {'Đăng nhập tại đây'}
                    </Link>
                  </form>
                );
              default:
                return (
                  <form onSubmit={handleSubmit(onForgetPassword)}>
                    <div className="user-form">
                      <TextField
                        className="mt-12"
                        fullWidth
                        size="small"
                        error={!!errors.email}
                        id="email"
                        label="Email"
                        variant="outlined"
                        type="text"
                        placeholder="Email"
                        {...register('email', { required: true })}
                      />
                    </div>
                    <DialogActions>
                      <Button className="confirmBtn" variant="contained" type="submit">
                        Tiếp tục
                      </Button>
                    </DialogActions>
                  </form>
                );
            }
          })()}
        </DialogContent>
      </Dialog>
      <Snackbar open={alert} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Đăng nhập thành công!
        </Alert>
      </Snackbar>
    </>
  );
}

export default LoginDialog;
