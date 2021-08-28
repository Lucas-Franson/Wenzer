import { memo, ReactElement, useState, useRef } from "react";
import { Button } from '@material-ui/core';
import { BsSun, BsMoon } from 'react-icons/bs';
import { MdMenu } from 'react-icons/md';
import { useTheme } from '../../Styles/Hook/theme';
import WenzerLogo from '../../utils/image/LogoWenzerOriginal.svg';
import { Container, ContentMenu, ContainerMenu } from "./styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";

function TopBarWelcome(): ReactElement {
  const { toggleTheme, theme } = useTheme();
  const [darkTheme, setDarkTheme] = useState(() => theme.title === 'dark' ? true : false);
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const openMenuRef = useRef(false);
  
  const handleChangeTheme = () => {
    setDarkTheme(!darkTheme);
    toggleTheme();
  }

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
           <a href="#about">O que é?</a>
         </div>

         <div>
           <a href="/#networking">Networking</a>
         </div>

         <div>
           <a href="/#project">Projetos</a>
         </div>

         {/* <div>
           <a href="/login">
             <Button type="button" className="entrarButton">
               Entrar
             </Button>
           </a>
         </div>

         <div>
           <a href="/register">
             <Button type="button" className="cadastrarButton">
               Cadastre-se
             </Button>
           </a>
         </div> */}

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
        <a href="/">
          <img src={WenzerLogo} alt="Wenzer" />
        </a>
        <h1>Wenzer</h1>
      </header>
      <div>
        <a href="/#about">O que é</a>
        <a href="/#networking">Networking</a>
        <a href="/#project">Projetos</a>

        {/* <a href="/login" className="a-Button">
          <Button type="button" className="entrarButton">
            Entrar
          </Button>
        </a>

        <a href="/register" className="a-Button">
          <Button type="button" className="cadastrarButton">
            Cadastre-se
          </Button>
        </a> */}
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

export default memo(TopBarWelcome);