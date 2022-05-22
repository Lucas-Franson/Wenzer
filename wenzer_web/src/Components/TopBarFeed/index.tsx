import { memo, ReactElement, useState, useRef, FormEvent } from "react";
import Avatar from "./components/Avatar";
import Notify from "./components/Notify";
import InputSearch from "../InputSearch";
import { useAuth } from "../../Services/Authentication/auth";
import { Link, useHistory } from 'react-router-dom';
import Tooltip from '@material-ui/core/Tooltip';

import { BsSun, BsMoon } from "react-icons/bs";
import { AiFillFire, AiFillHome, AiFillProject, AiOutlineSearch} from "react-icons/ai";
import { MdAddCircle, MdMenu, MdExitToApp, MdPerson, MdSearch } from "react-icons/md";
import { Button } from "@material-ui/core";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import WenzerLogo from "../../Utils/image/wenzer_web.svg";
import { Container, ContentMenu, ContainerMenu } from "./styles";
import { useTheme } from "../../Styles/Hook/theme";
import ModalProject from "../Modal/ModalProject";
import { useWenzer } from "../../hooks/useWenzer";

function TopBarFeed(): ReactElement {
  const { toggleTheme, theme } = useTheme();
  const [darkTheme, setDarkTheme] = useState(() =>
    theme.title === "dark" ? true : false
  );
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const [openModalProject, setOpenModalProject] = useState(false);

  const openMenuRef = useRef(false);
  const { singOut } = useAuth();

  const { setSearchKey, searchKey, isSearching } = useWenzer();
  
  const history = useHistory();

  const handleChangeTheme = () => {
    setDarkTheme(!darkTheme);
    toggleTheme();
  };

  function handleOpenMenu() {
    setOpenSideMenu(!openSideMenu);
  }

  function handleOpenModalProject() {
    setOpenModalProject(true);
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
          <Link to="/profile"> <MdPerson size={25} /> <p>Perfil</p></Link>
        </div>

        <div>
          <Link to="##" onClick={handleOpenModalProject} > <MdAddCircle size={25}/> <p>Novo Projeto</p></Link>
        </div>

        <div>
          <Link to="/projects">
            <AiFillProject size={25} />
            <p>Meus Projetos</p>
          </Link>
        </div>

        {/* <div>
          <Link to="notify" onClick={handleOpenModalProject} > <Notify/> <p>Notificações</p></Link>
        </div> */}

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

  function moveToExplore() {
    history.push('/explore');
  }


  return (
    <>
      <Container>
        {/* LOGO WENZER -------------------------------------------------------------------- */}
        <header>
          <Link to="/">
            <img src={WenzerLogo} alt="Wenzer" />
          </Link>
          <div>
            <span>Wenzer</span>
          </div>
        </header>

        {/* OPÇÕES -------------------------------------------------------------------- */}
        <div className="opcoes">
          <Tooltip title="Página Inicial" placement="bottom" >
            <Link to="/">
              <AiFillHome size={25}/> 
            </Link>
          </Tooltip>

          <Tooltip title="Explorar" placement="bottom" >
            <Link to="/explore">
              <AiOutlineSearch size={25}/> 
            </Link>
          </Tooltip>

          <Tooltip title="Meus Projetos" placement="bottom" className="mobileProject" >
            <Link to="/projects">
              <AiFillProject size={25} />
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
            <Link to="" onClick={handleOpenModalProject}>
              <MdAddCircle size={25} style={{cursor: 'pointer'}} />
            </Link>
          </Tooltip>

          <Tooltip title="Notificação" placement="bottom" >
            <Link to="/notify">         
              <Notify />
            </Link>
          </Tooltip>

          <Tooltip title="Tema" placement="bottom">
            <Link to="##" >
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
      <ModalProject open={openModalProject} setOpen={setOpenModalProject} />
    </>
  );
};

export default memo(TopBarFeed);
