import React, { useState } from 'react';
import './styles.scss';
import {
  Alert,
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Snackbar,
  TextField,
  Typography,
  Link,
  IconButton,
  InputAdornment,
} from '@mui/material';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import SavingsOutlinedIcon from '@mui/icons-material/SavingsOutlined';
import { useForm } from 'react-hook-form';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

function Profile() {
  const userData = JSON.parse(localStorage.getItem('loginUser'));
  const [alert, setOpen] = React.useState(false);
  const [updateProfile, setUpdateProfile] = React.useState(false);
  const [passwordForm, setPasswordForm] = React.useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConPassword, setShowConPassword] = useState(false);
  const handleTogglePassword = () => setShowPassword((showPassword) => !showPassword);
  const handleToggleConPassword = () => setShowConPassword((showConPassword) => !showConPassword);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      fullName: userData.fullName,
      phoneNumber: userData.phoneNumber,
      email: userData.email,
    },
  });
  const onUpdate = (data) => {
    let allUser = JSON.parse(localStorage.getItem('userData'));
    const currentUser = allUser.find((user) => user.phoneNumber === data.phoneNumber);
    currentUser.fullName = data.fullName;
    currentUser.email = data.email;

    userData.fullName = data.fullName;
    userData.email = data.email;

    localStorage.setItem('userData', JSON.stringify(allUser));
    localStorage.setItem('loginUser', JSON.stringify(userData));
    handleSuccessMessage();
    handleCloseDialog();
  };
  const onUpdatePassword = (data) => {
    let allUser = JSON.parse(localStorage.getItem('userData'));
    const currentUser = allUser.find((user) => user.phoneNumber === data.phoneNumber);
    currentUser.password = data.password;
    userData.password = data.password;

    localStorage.setItem('userData', JSON.stringify(allUser));
    localStorage.setItem('loginUser', JSON.stringify(userData));
    handleSuccessMessage();
    handleCloseDialog();
  };
  const handleCloseDialog = () => {
    reset();
    setUpdateProfile(false);
    setPasswordForm(false);
  };
  const handleSuccessMessage = () => {
    setOpen(true);
  };
  const handleCloseMessage = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  return (
    <>
      <div className="profile">
        <Grid item>
          <Typography sx={{ mt: 4 }} variant="h6" component="div">
            {userData.fullName}
          </Typography>
          <List className="info">
            <ListItem secondaryAction={<ListItemText primary={userData.phoneNumber} />}>
              <ListItemAvatar>
                <Avatar>
                  <SmartphoneIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Số điện thoại:" />
            </ListItem>
            <ListItem secondaryAction={<ListItemText primary={userData.email} />}>
              <ListItemAvatar>
                <Avatar>
                  <EmailOutlinedIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Email:" />
            </ListItem>
            <ListItem secondaryAction={<ListItemText primary="0" />}>
              <ListItemAvatar>
                <Avatar>
                  <SavingsOutlinedIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Điểm tích lũy:" />
            </ListItem>
          </List>
        </Grid>
        <div className="update-btn">
          <Button
            variant="contained"
            onClick={() => {
              setUpdateProfile(true);
            }}
          >
            Cập nhật tài khoản
          </Button>
        </div>
      </div>
      <Dialog
        className="profile-dialog"
        open={updateProfile}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <b>Cập nhật thông tin tài khoản</b>
        </DialogTitle>
        <DialogContent>
          {!passwordForm ? (
            <form onSubmit={handleSubmit(onUpdate)}>
              <div className="user-form">
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
                  disabled
                  {...register('phoneNumber', {
                    required: true,
                    pattern: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
                  })}
                />
              </div>
              <Link
                href="#"
                onClick={() => {
                  reset();
                  setPasswordForm(true);
                }}
                underline="none"
              >
                {'Đổi mật khẩu'}
              </Link>
              <DialogActions>
                <Button className="updateBtn" variant="contained" type="submit">
                  Cập nhật
                </Button>
              </DialogActions>
            </form>
          ) : (
            <form onSubmit={handleSubmit(onUpdatePassword)}>
              <div className="user-form">
                <TextField
                  className="mt-12"
                  fullWidth
                  size="small"
                  error={!!errors.password}
                  id="password"
                  label="Mật khẩu mới"
                  variant="outlined"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Mật khẩu mới"
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
                  label="Nhập lại mật khẩu mới"
                  variant="outlined"
                  type={showConPassword ? 'text' : 'password'}
                  placeholder="Nhập lại mật khẩu mới"
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
                <Button className="updateBtn" variant="contained" type="submit">
                  Đổi mật khẩu
                </Button>
              </DialogActions>
            </form>
          )}
        </DialogContent>
      </Dialog>
      <Snackbar open={alert} autoHideDuration={6000} onClose={handleCloseMessage}>
        <Alert onClose={handleCloseMessage} severity="success" sx={{ width: '100%' }}>
          Cập nhập thành công!
        </Alert>
      </Snackbar>
    </>
  );
}

export default Profile;
