import React, { useRef } from 'react';
import './styles.scss';
import { Badge, IconButton, InputAdornment, Link, Menu, MenuItem, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginDialog from '../login-dialog';

function Header() {
  const [openLogin, setOpenLogin] = React.useState(false);
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const userData = JSON.parse(localStorage.getItem('loginUser')) || null;
  const [searchParams, setSearchParams] = useSearchParams();
  const searchRef = useRef();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <header className="header">
        <div className="top-head">
          <Link href="/" className="navbar-brand">
            Fast Supermartket
          </Link>
          <TextField
            inputRef={searchRef}
            className="search-food"
            id="outlined-start-adornment"
            sx={{ m: 1, width: '25ch' }}
            placeholder="Searching..."
            InputProps={{
              onKeyPress: (event) => {
                if (event.key === 'Enter') {
                  setSearchParams({ search: searchRef.current.value });
                  event.preventDefault();
                }
              },
              endAdornment: (
                <InputAdornment
                  position="end"
                  onClick={() => {
                    setSearchParams({ search: searchRef.current.value });
                  }}
                >
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <div className="navbar-nav">
            <div className="cart-food">
              {!userData ? (
                <IconButton
                  onClick={() => setOpenLogin(true)}
                  aria-label="cart"
                  className="navi-btn"
                >
                  <PersonIcon />
                  <span>Đăng nhập</span>
                </IconButton>
              ) : (
                <div>
                  <IconButton
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    className="navi-btn"
                  >
                    <PersonIcon />
                    <span>{userData.phoneNumber}</span>
                  </IconButton>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button',
                    }}
                  >
                    <MenuItem
                      onClick={() => {
                        navigate('profile');
                        handleClose();
                      }}
                    >
                      Tài khoản
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        localStorage.removeItem('loginUser');
                        navigate('/');
                        handleClose();
                      }}
                    >
                      Đăng xuất
                    </MenuItem>
                  </Menu>
                </div>
              )}
            </div>
            <div className="cart-food">
              <IconButton onClick={() => navigate('cart')} aria-label="cart" className="navi-btn">
                <Badge badgeContent={cart?.length || 0} color="error">
                  <ShoppingCartOutlinedIcon />
                </Badge>
                <span>Giỏ hàng</span>
              </IconButton>
            </div>
          </div>
        </div>
      </header>
      <LoginDialog open={openLogin} close={() => setOpenLogin(false)} />
    </>
  );
}

export default Header;
