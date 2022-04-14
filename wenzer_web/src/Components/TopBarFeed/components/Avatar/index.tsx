import React from 'react';
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
    const { userInfo } = useAuth();
  
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    function MoveToPerfil() {
        history.push('/profile');
        handleClose()
    }

    function MoveOut() {
      singOut();
      handleClose();
    }
  
    return (
      <div>
        <HeaderAvatar onClick={handleClick} src={userInfo?.photo}>
        </HeaderAvatar>
        <Menu
          id="fade-menu"
          anchorEl={anchorEl}
          keepMounted
          open={open}
          onClose={handleClose}
          TransitionComponent={Fade}
        >
          <MenuItem style={{margin: '5px', gap: '10px'}} onClick={MoveToPerfil}> <MdPerson size={22} />  Perfil</MenuItem>
          <MenuItem style={{margin: '5px', gap: '10px'}} onClick={MoveOut}> <MdExitToApp/> Logout</MenuItem>
        </Menu>
      </div>
    );
  }
  
  