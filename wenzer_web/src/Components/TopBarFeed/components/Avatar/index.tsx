import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import {MdExitToApp, MdPerson} from 'react-icons/md'
import { HeaderAvatar } from '../../styles';
import { useAuth } from '../../../../Services/Authentication/auth';
import { useHistory } from 'react-router-dom';

export default function FadeMenu() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const { singOut } = useAuth();
    const history = useHistory();
  
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    function MoveToPerfil() {
        history.push('/profile');
    }
  
    return (
      <div>
        <HeaderAvatar onClick={handleClick}>
        </HeaderAvatar>
        <Menu
          id="fade-menu"
          anchorEl={anchorEl}
          keepMounted
          open={open}
          onClose={handleClose}
          TransitionComponent={Fade}
        >
          <MenuItem style={{marginRight: '15px', gap: '10px'}} onClick={MoveToPerfil}> <MdPerson size={22} />  Perfil</MenuItem>
          <MenuItem style={{marginRight: '15px', gap: '10px'}} onClick={singOut}> <MdExitToApp/> Logout</MenuItem>
        </Menu>
      </div>
    );
  }
  
  