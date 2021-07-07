import { memo, ReactElement, useState } from "react";
import { Button } from '@material-ui/core';
import { BsSun, BsMoon } from 'react-icons/bs';
import { MdMenu } from 'react-icons/md';
import { useTheme } from '../../Styles/Hook/theme';
import WenzerLogo from '../../Utils/image/WenzerLogo.svg';
import { Container, ContentMenu, ContainerMenu } from "./styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";

function TopBarWelcome(): ReactElement {
  const { toggleTheme, theme } = useTheme();
  const [darkTheme, setDarkTheme] = useState(() => theme.title === 'dark' ? true : false);
  const [openSideMenu, setOpenSideMenu] = useState(false);
  
  const handleChangeTheme = () => {
    setDarkTheme(!darkTheme);
    toggleTheme();
  }

  function openMenu() {
    setOpenSideMenu(!openSideMenu);
  }

   const list = () => (
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
           <a href="/#university">Networking</a>
         </div>

         <div>
           <a href="/#business">Negócios</a>
         </div>

         <div>
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
        <a href="/">
          <img src={WenzerLogo} alt="Wenzer" />
        </a>
        <h1>Wenzer</h1>
      </header>
      <div>
        <a href="/#about">O que é</a>
        <a href="/#university">Networking</a>
        <a href="/#business">Negócios</a>

        <a href="/login" className="a-Button">
          <Button type="button" className="entrarButton">
            Entrar
          </Button>
        </a>

        <a href="/register" className="a-Button">
          <Button type="button" className="cadastrarButton">
            Cadastre-se
          </Button>
        </a>

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
          <MdMenu size={25} className="iconTheme" onClick={openMenu} />
        </Button>
        <div>
          <SwipeableDrawer
            anchor="right"
            open={openSideMenu}
            onClose={openMenu}
            onOpen={openMenu}
          >
            {list()}
          </SwipeableDrawer>
        </div>
      </div>
    </Container>
  );
}

export default memo(TopBarWelcome);