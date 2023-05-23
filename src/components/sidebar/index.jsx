import React from 'react';
// import PropTypes from 'prop-types';
import { Box, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import './styles.scss';
import { category } from '../../assets/category';
import { useNavigate } from 'react-router-dom';

Sidebar.propTypes = {};

function Sidebar(props) {
  const navigate = useNavigate();
  return (
    <Box className="menu-list">
      <nav aria-label="main mailbox folders">
        <List className="pd0">
          {category.map((cate) => (
            <ListItem key={cate.cateId} disablePadding>
              <ListItemButton onClick={() => navigate(cate.cateURL)}>
                <img className="sidebar-icon" src={cate.imageUrl} alt={cate.cateName} />
                <ListItemText primary={cate.cateName} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </nav>
    </Box>
  );
}

export default Sidebar;
