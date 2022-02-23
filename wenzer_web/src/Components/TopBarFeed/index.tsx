import { memo, ReactElement, useState, useRef } from "react";
import { Button } from "@material-ui/core";
import { BsSun, BsMoon } from "react-icons/bs";
import { MdAddCircle, MdMenu, MdPlusOne } from "react-icons/md";
import { useTheme } from "../../Styles/Hook/theme";
import WenzerLogo from "../../Utils/image/wenzer_web.svg";
import { Container, ContentMenu, ContainerMenu } from "./styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Avatar from "./components/Avatar";
import Notify from "./components/Notify";
import { Link } from 'react-router-dom';
import InputSearch from "../InputSearch";

function TopBarFeed(): ReactElement {
  const { toggleTheme, theme } = useTheme();
  const [darkTheme, setDarkTheme] = useState(() =>
    theme.title === "dark" ? true : false
  );
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const openMenuRef = useRef(false);

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
          <Link to="#about">Home</Link>
        </div>

        <div>
          <a href="/#networking">Em alta</a>
        </div>

        <div>
          <a href="/#project">Meus Projetos</a>
        </div>

        <div>
          <a href="/#project">Perfil</a>
        </div>

        <div>
          <a href="/#project">Sair</a>
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
      <div>
        <Link to="/">Home</Link>
        <Link to="/Explore">Explorar</Link>
        <Link to="/Projects">Projetos</Link>
      </div>

      {/* BUTTONS -------------------------------------------------------------------- */}
      <div className="buttons">
        <Avatar />

        <Notify />
        
        <MdAddCircle size={25} style={{cursor: 'pointer'}} />
  
        {darkTheme ? (
          <BsSun size={25} style={{cursor: 'pointer'}} className="iconTheme" onClick={handleChangeTheme} />
        ) : (
          <BsMoon size={25} style={{cursor: 'pointer'}} className="iconTheme" onClick={handleChangeTheme} />
        )}
    
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
