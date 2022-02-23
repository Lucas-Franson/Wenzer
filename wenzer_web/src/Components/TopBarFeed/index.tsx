import { memo, ReactElement, useState, useRef } from "react";
import { Button } from "@material-ui/core";
import { BsSun, BsMoon } from "react-icons/bs";
import { MdMenu } from "react-icons/md";
import { useTheme } from "../../Styles/Hook/theme";
import WenzerLogo from "../../Utils/image/wenzer_web.svg";
import { Container, ContentMenu, ContainerMenu, HeaderAvatar } from "./styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Avatar from "./components/Avatar";
import Notify from "./components/Notify";

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
          <a href="#about">Home</a>
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
      <header>
        <a href="/welcome">
          <img src={WenzerLogo} alt="Wenzer" />
        </a>
        <h1>Wenzer</h1>
      </header>

      <div>
        <a href="/welcome/#about">Home</a>
        <a href="/welcome/#networking">Em Alta</a>
        <a href="/welcome/#project">Meus Projetos</a>
      </div>

      <div>
        <Avatar />
        
        <Notify />

        <Button onClick={handleChangeTheme}>
          {darkTheme ? (
            <BsSun size={25} className="iconTheme" />
          ) : (
            <BsMoon size={25} className="iconTheme" />
          )}
        </Button>
      </div>

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
