import { memo, ReactElement, useState } from 'react';
import { Button } from '@material-ui/core';
import { BsSun, BsMoon } from 'react-icons/bs';
import { MdMenu } from 'react-icons/md';
import { useTheme } from '../../Styles/Hook/theme';
import WenzerLogo from '../../Utils/image/WenzerLogo.svg';
import { Container } from './styles';

function TopBarWelcome(): ReactElement {
  const { toggleTheme, theme } = useTheme();

  const [darkTheme, setDarkTheme] = useState(() => theme.title === 'dark' ? true : false);
  
  const handleChangeTheme = () => {
    setDarkTheme(!darkTheme);
    toggleTheme();
  }

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
        <a href="/#university">Universidade</a>
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
          <MdMenu size={25} className="iconTheme" />
        </Button>
      </div>
    </Container>
  );
}

export default memo(TopBarWelcome);