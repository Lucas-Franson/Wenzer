import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../../contexts/AuthContext';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Box, IconButton, InputBase, Menu, MenuItem } from '@material-ui/core';
import { MdSearch, MdHome, MdWhatshot, MdPortrait, MdRateReview } from 'react-icons/md';

import { useStyles } from './styles';

export default function PrimarySearchAppBar() {
  const [openMenu, setOpenmenu] = useState(null);
  
  const { Logout } = useAuth();
  const classes = useStyles();
  const isMenuOpen = Boolean(openMenu);

  const handleMenuClose = () => {
    setOpenmenu(null);
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setOpenmenu(event.currentTarget);
  };

  const menuProfile = (
    <Menu
      anchorEl={openMenu}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem className={classes.menuItem} onClick={handleMenuClose}>
        Perfil
      </MenuItem>
      <MenuItem className={classes.menuItem} onClick={handleMenuClose}>
        Configurações
      </MenuItem>
      <MenuItem className={classes.menuItem} onClick={() => {
        handleMenuClose;
        Logout();
      }}>
        Sair
      </MenuItem>
    </Menu>
  );

  return (
    <div>
      <AppBar position="fixed" color="secondary">
        <Toolbar className={classes.container}>
          <Box className={classes.title}>
            <Link href="/">
              <img
                src="/Logo_wenzer.png"
                alt="Logo"
                style={{ width: '50px' }}
              />
            </Link>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <MdSearch />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>
          </Box>
          <Box>
            <IconButton color="inherit">
              <MdHome size={30} />
            </IconButton>
            <IconButton color="inherit">
              <MdWhatshot size={30} />
            </IconButton>
            <IconButton color="inherit">
              <MdRateReview size={30} />
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <MdPortrait size={30} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {menuProfile}
    </div>
  );
}
