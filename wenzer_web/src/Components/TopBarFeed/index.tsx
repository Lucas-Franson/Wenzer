import { memo, ReactElement, useState, useRef } from "react";
import Avatar from "./components/Avatar";
import Notify from "./components/Notify";
import InputSearch from "../InputSearch";
import { useAuth } from "../../Services/Authentication/auth";
import { Link } from 'react-router-dom';
import Tooltip from '@material-ui/core/Tooltip';

import { BsSun, BsMoon } from "react-icons/bs";
import { AiFillFire, AiFillHome, AiFillProject} from "react-icons/ai";
import { MdAddCircle, MdMenu, MdExitToApp, MdPerson } from "react-icons/md";
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
  const { singOut, handleOpenModalPost } = useAuth();

  const handleChangeTheme = () => {
    setDarkTheme(!darkTheme);
    toggleTheme();
  };

  function handleOpenMenu() {
    setOpenSideMenu(!openSideMenu);
  }

  /* MENU SIDEBAR MOBILE RESPONSIVE -------------------------------------------------------------------- */
  const sideBarMobile = () => (
    <ContainerMenu
      role="presentation"
      onClick={() => setOpenSideMenu(false)}
      onKeyDown={() => setOpenSideMenu(false)}
    >
      <ContentMenu>
        <div>
          <Link to="/projects"> <MdPerson size={25} /> <p>Perfil</p></Link>
        </div>

        <div>
          <Link to="" onClick={handleOpenModalPost} > <MdAddCircle size={25}/> <p>Projeto</p></Link>
        </div>

        <div>
          {darkTheme ? (
            <Link to="" onClick={handleChangeTheme}>
              <BsSun size={25} className="iconTheme" /> 
              <p>Tema</p>
            </Link>
          ) : (
            <Link to="" onClick={handleChangeTheme}>
              <BsMoon size={25} className="iconTheme" />
              <p>Tema</p>
            </Link>
          )}
        </div>

        <div>
          <Link to="" onClick={singOut}> <MdExitToApp size={25} /> <p>Sair</p></Link>
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
        <InputSearch placeholder="Pesquisar no Wenzer" onChange={() => {}}/>
      </header>

      {/* OPÇÕES -------------------------------------------------------------------- */}
      <div className="opcoes">
        <Tooltip title="Página Inicial" placement="bottom" >
          <Link to="/">
            <AiFillHome size={30}/> 
          </Link>
        </Tooltip>

        <Tooltip title="Em Alta" placement="bottom" >
          <Link to="/explore">
            <AiFillFire size={30}/> 
          </Link>
        </Tooltip>

        <Tooltip title="Meus Projetos" placement="bottom" className="mobileProject" >
          <Link to="/projects">
            <AiFillProject size={30} />
          </Link>
        </Tooltip>

        <Tooltip title="Notificação" placement="bottom" className="mobileNotify" >
          <Link to="/notify">         
            <Notify />
          </Link>
        </Tooltip>
      </div>

      {/* BUTTONS ACTION-------------------------------------------------------------------- */}
      <div className="buttons">
        <Tooltip title="Novo Projeto" placement="bottom" >
          <Link to="" onClick={handleOpenModalPost}>
            <MdAddCircle size={25} style={{cursor: 'pointer'}} />
          </Link>
        </Tooltip>

        <Tooltip title="Notificação" placement="bottom" >
          <Link to="/notify">         
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
