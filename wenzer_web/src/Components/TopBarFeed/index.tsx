import { memo, ReactElement, useState, useRef } from "react";
import Avatar from "./components/Avatar";
import Notify from "./components/Notify";
import InputSearch from "../InputSearch";
import { useAuth } from "../../Services/Authentication/auth";
import { Link } from 'react-router-dom';
import Tooltip from '@material-ui/core/Tooltip';

import { BsSun, BsMoon } from "react-icons/bs";
import { AiFillFire, AiFillHome, AiFillProject} from "react-icons/ai";
import { MdAddCircle, MdMenu } from "react-icons/md";
import { Button } from "@material-ui/core";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import WenzerLogo from "../../Utils/image/wenzer_web.svg";
import { Container, ContentMenu, ContainerMenu } from "./styles";
import { useTheme } from "../../Styles/Hook/theme";

function TopBarFeed(): ReactElement {
  const { toggleTheme, theme } = useTheme();
  const [darkTheme, setDarkTheme] = useState(() =>
    theme.title === "dark" ? true : false
  );
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const openMenuRef = useRef(false);
  const { singOut } = useAuth();

  const handleChangeTheme = () => {
    setDarkTheme(!darkTheme);
    toggleTheme();
  };

  function handleOpenMenu() {
    setOpenSideMenu(!openSideMenu);
  }

  const sideBarMobile = () => (
    <ContainerMenu
      role="presentation"
      onClick={() => setOpenSideMenu(false)}
      onKeyDown={() => setOpenSideMenu(false)}
    >
      <ContentMenu>
        <div>
          <Link to="/projects">Perfil</Link>
        </div>

        <div>
          <Link to="" onClick={singOut} >Sair</Link>
        </div>


        <div>
          <Button onClick={handleChangeTheme}>
            {darkTheme ? (
              <BsSun size={25} className="iconTheme" />
            ) : (
              <BsMoon size={25} className="iconTheme" />
            )}
          </Button>
        </div>
      </ContentMenu>
    </ContainerMenu>
  );

  return (
    <Container>
      {/* LOGO WENZER -------------------------------------------------------------------- */}
      <header>
        <Link to="/">
          <img src={WenzerLogo} alt="Wenzer" />
        </Link>
        <InputSearch placeholder="Pesquisar" onChange={() => {}}/>
      </header>

      {/* OPÇÕES -------------------------------------------------------------------- */}
      <div className="opcoes">
        <Tooltip title="Página Inicial" placement="bottom" >
          <Link to="/">
            <AiFillHome size={30}/> 
          </Link>
        </Tooltip>

        <Tooltip title="Em Alta" placement="bottom" >
          <Link to="/Explore">
            <AiFillFire size={30}/> 
          </Link>
        </Tooltip>

        <Tooltip title="Meus Projetos" placement="bottom" >
          <Link to="/Projects">
            <AiFillProject size={30} />
          </Link>
        </Tooltip>
      </div>

      {/* BUTTONS -------------------------------------------------------------------- */}
      <div className="buttons">
        <Tooltip title="Novo Projeto" placement="bottom" >
          <Link to="" >
            <MdAddCircle size={25} style={{cursor: 'pointer'}} />
          </Link>
        </Tooltip>

        <Tooltip title="Notificação" placement="bottom" >
          <Link to="">         
            <Notify />
          </Link>
        </Tooltip>

        <Tooltip title="Tema" placement="bottom">
          <Link to="" >
            {darkTheme ? (
            <BsSun size={25} style={{cursor: 'pointer'}} className="iconTheme" onClick={handleChangeTheme} />
            ) : (
              <BsMoon size={25} style={{cursor: 'pointer'}} className="iconTheme" onClick={handleChangeTheme} />
              )
            }
          </Link>
        </Tooltip>

        <Avatar />
      </div>

      {/* MOBILE -------------------------------------------------------------------- */}
      <div className="IconMenuMobile">
        <Button>
          <MdMenu size={25} className="iconTheme" onClick={handleOpenMenu} />
        </Button>
        <div>
          <SwipeableDrawer
            anchor="right"
            open={openSideMenu}
            onClose={handleOpenMenu}
            onOpen={handleOpenMenu}
            ref={openMenuRef}
          >
            {sideBarMobile()}
          </SwipeableDrawer>
        </div>
      </div>
    </Container>
  );
}

export default memo(TopBarFeed);
