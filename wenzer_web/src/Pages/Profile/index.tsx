import { ReactElement, useState } from 'react';
import { HeaderAvatar } from '../Feed/styles';
import { AiOutlineEllipsis } from 'react-icons/ai';
import { useAuth } from '../../Services/Authentication/auth';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';

import { CardInfo, CardProfile, Container, ContainerProfile, ContainerProjects } from './styles';
import PostProfile from '../../Components/PostProfile';
import { MdImage, MdSettings } from 'react-icons/md';
import InputText from '../../Components/InputText';
import Button from '../../Components/Button';

function Profile(): ReactElement {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [hasEditProfile, setHasEditProfile] = useState(false);
  const open = Boolean(anchorEl);
  const { userInfo } = useAuth();

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangeEditProfile = () => {
    setHasEditProfile(!hasEditProfile);
    setAnchorEl(null);
  }

  const handleOpenMenuSettings = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const arrMock = [1, 2, 3, 4, 5, 6];
  
  return (
    <Container>
      <ContainerProfile>
        <CardProfile>
            <div className="imageProfile">
              <div onClick={handleOpenMenuSettings}>
              <AiOutlineEllipsis size={28} className='option' />
              </div>
              <HeaderAvatar className='avatarProfile' src={userInfo?.photo} />
              <p>{userInfo?.name}</p>
              <span>Descrição do perfil aqui</span>
            </div>

            <div className="counterProject">
              <div className="counter">
                <span>Projetos</span>
                <span>5</span>
              </div>
              <div className="counter">
                <span>Participando</span>
                <span>26</span>
                </div>
            </div>

        </CardProfile>
        <CardInfo>
          <h3>Conexões</h3>
          <span>Você ainda não tem nenhuma conexão</span>
        </CardInfo>
        
        <CardInfo>
          <h3>Interesses</h3>
          <span>Você ainda não tem nenhum interesse</span>
        </CardInfo>

        <CardInfo>
          <h3>Atividades</h3>
          <span>Você ainda não tem nenhuma atividade</span>
        </CardInfo>

      </ContainerProfile>

      <ContainerProjects>
        {!hasEditProfile ? (
          <div className="wraper">
            {arrMock.map(item => (
              <PostProfile key={item}/>
            ))} 
          </div>
        ) : (
          <CardInfo>
            <h3>Editar Perfil</h3>
            <div className="editProfile">
              <InputText 
                type="text"
                placeholder="Nome de usuario" 
                defaultValue={userInfo?.name}
              />
              <InputText 
                type="text"
                placeholder="E=mail" 
                defaultValue={userInfo?.email}
                disabled={true}
                className='noCopy'
              />
              <InputText 
                type="text"
                placeholder="Descrição" 
                maxLenght={150}
              />
              <InputText 
                type="text"
                placeholder="Universidade" 
              />
              <div>
                <Button className="onlyBorder" onClick={handleChangeEditProfile}>Cancelar</Button>
                <Button>Salvar</Button>
              </div>
            </div>
          </CardInfo>
        )}

        <CardInfo className='mt-10'>
          <h3>Projetos que estou parcipando</h3>
        </CardInfo>
      </ContainerProjects>
      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem style={{margin: '5px', gap: '10px'}} onClick={handleChangeEditProfile} > <MdSettings size={22}/>  Editar Perfil</MenuItem>
        <MenuItem style={{margin: '5px', gap: '10px'}}> <MdImage size={22} /> Editar foto</MenuItem>
      </Menu>
    </Container>
  )
}

export default Profile;