import { ReactElement, useEffect, useState } from 'react';
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
import APIServiceAuthenticated from '../../Services/api/apiServiceAuthenticated';
import Cookies from 'js-cookie';
import { toastfyError } from '../../Components/Toastfy';
import { IProfileProps } from './interface';
import InputAutoComplete from '../../Components/InputAutoComplete';
import InputTextArea from '../../Components/InputTextArea';
import ModalProfilePic from '../../Components/Modal/ModalProfilePic';

function Profile(): ReactElement {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [hasEditProfile, setHasEditProfile] = useState(false);
  const [connections, setConnections] = useState<{ id: string, name: string, photo: any }[]>([]);
  const [interests, setInterests] = useState<{ id: string, name: string }[]>([]);
  const [userProfileInfo, setuserProfileInfo] = useState<IProfileProps>();
  const [projects, setProjects] = useState([]);
  const [openModalProfilePic, setOpenModalProfilePic] = useState(false);
  const [alreadyGetConnections, setAlreadyGetConnections] = useState(false);
  const [alreadyGetInterests, setAlreadyGetInterests] = useState(false);
  const [alreadyGetUserInfo, setAlreadyGetUserInfo] = useState(false);
  const [alreadyGetProjects, setAlreadyGetProjects] = useState(false);
  
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

  function getConnections(userId: string) {
    APIServiceAuthenticated.get(`/api/profile/connections/${userId}`, {
      headers: {
        auth: Cookies.get('WenzerToken')
      }
    }).then(res => {
      setConnections(res.data);
      setAlreadyGetConnections(true);

    }).catch(err => {
      toastfyError(err?.response?.data?.mensagem);
    })
 }

  function getInterests(userId: string) {
    APIServiceAuthenticated.get(`/api/profile/interests/${userId}`, {
      headers: {
        auth: Cookies.get('WenzerToken')
      }
    }).then(res => {
      setInterests(res.data);
      setAlreadyGetInterests(true);

    }).catch(err => {
      toastfyError(err?.response?.data?.mensagem);
    })
  }

  function getUserProfile(userId: string) {
    APIServiceAuthenticated.get(`/api/profile/info/${userId}`, {
      headers: {
        auth: Cookies.get('WenzerToken')
      }
    }).then(res => {
      setuserProfileInfo(res.data);
      setAlreadyGetUserInfo(true);

    }).catch(err => {
      toastfyError(err?.response?.data?.mensagem);
    })
  }

  function getProjectsByUser(userId: string) {
    APIServiceAuthenticated.get(`/api/project/${userId}`, {
      headers: {
        auth: Cookies.get('WenzerToken')
      }
    }).then(res => {
      setProjects(res.data);
      setAlreadyGetProjects(true);

    }).catch(err => {
      toastfyError(err?.response?.data?.mensagem);
    })
  }

  function handleOpenModalProfilePic() {
    setOpenModalProfilePic(true);
    setAnchorEl(null);
  }

 useEffect(() => {
    if(!alreadyGetConnections) {
      getConnections(userInfo?.id!);
    }
    if(!alreadyGetInterests) {
      getInterests(userInfo?.id!);
    }
    if(!alreadyGetUserInfo) {
      getUserProfile(userInfo?.id!);
    }
    if(!alreadyGetProjects) {
      getProjectsByUser(userInfo?.id!);
    }
    console.log(connections);
 });
  
  return (
    <Container>
      <ContainerProfile>
        <CardProfile>
            <div className="imageProfile">
              <div onClick={handleOpenMenuSettings}>
              <AiOutlineEllipsis size={28} className='option' />
              </div>
              <HeaderAvatar className='avatarProfile' src={userProfileInfo?.photo} />
              <p>{userProfileInfo?.name}</p>
              <span>{userProfileInfo?.title}</span>
            </div>

            <div className="counterProject">
              <div className="counter">
                <span>Projetos</span>
                <span>{userProfileInfo?.countProjects}</span>
              </div>
              <div className="counter">
                <span>Participando</span>
                <span>{userProfileInfo?.countParticipating}</span>
                </div>
            </div>

        </CardProfile>
        <CardInfo>
          <h3>Conexões</h3>
          {connections.length > 0 ? (
            connections.map((value) => (
              <span>{value?.name}</span>
            ))
          ): (
            <span>Você ainda não tem nenhuma conexão</span>
          )}
        </CardInfo>
        
        <CardInfo>
          <h3>Interesses</h3>
          {interests.length > 0 ? (
            interests.map((value) => (
              <span>{value?.name}</span>
            ))
          ):(
            <span>Você ainda não tem nenhum interesse</span>
          )}
        </CardInfo>

      </ContainerProfile>

      <ContainerProjects>
        {!hasEditProfile ? (
          <div className="wraper">
            {projects.map(item => (
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
              <InputTextArea
                type="text"
                placeholder="Bio" 
                maxLenght={400}
              />
              <InputAutoComplete />
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
        <MenuItem style={{margin: '5px', gap: '10px'}} onClick={handleOpenModalProfilePic}> <MdImage size={22} /> Editar foto</MenuItem>
      </Menu>
      <ModalProfilePic open={openModalProfilePic} setOpen={setOpenModalProfilePic}/>
    </Container>
  )
}

export default Profile;