import { FormEvent, ReactElement, useEffect, useState } from 'react';
import { HeaderAvatar } from '../Feed/styles';
import { AiOutlineEllipsis } from 'react-icons/ai';
import { useAuth } from '../../Services/Authentication/auth';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';

import { CardInfo, CardProfile, Container, ContainerProfile, ContainerProjects } from './styles';
import { MdImage, MdSettings } from 'react-icons/md';
import InputText from '../../Components/InputText';
import Button from '../../Components/Button';
import APIServiceAuthenticated from '../../Services/api/apiServiceAuthenticated';
import Cookies from 'js-cookie';
import { toastfyError, toastfySuccess, toastfyWarning } from '../../Components/Toastfy';
import { IProfileProps } from './interface';
import InputAutoComplete from '../../Components/InputAutoComplete';
import InputTextArea from '../../Components/InputTextArea';
import ModalProfilePic from '../../Components/Modal/ModalProfilePic';
import { CircularProgress } from '@material-ui/core';
import Select from 'react-select';

function Profile(): ReactElement {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [hasEditProfile, setHasEditProfile] = useState(false);
  const [connections, setConnections] = useState<{ id: string, name: string, photo: any }[]>([]);
  const [interestsOfUser, setInterestsOfUser] = useState<{ label: string, value: string }[]>([]);
  const [userProfileInfo, setUserProfileInfo] = useState<IProfileProps>();
  const [openModalProfilePic, setOpenModalProfilePic] = useState(false);
  
  // CONTROL REQUESTS

  const [alreadyGetConnections, setAlreadyGetConnections] = useState(false);
  const [alreadyGetInterests, setAlreadyGetInterests] = useState(false);
  const [alreadyGetUserInfo, setAlreadyGetUserInfo] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [alreadyGetAllInterests, setAlreadyGetAllInterests] = useState(false);

  // FORM UPDATE PROFILE

  const [interests, setInterests] = useState<{ label: string, value: string }[]>([]);
  const [name, setName] = useState(''); 
  const [bio, setBio] = useState('');
  const [interestsSelected, setInterestsSelected] = useState([]);  
  
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

  function getInterestsOfUser(userId: string) {
    APIServiceAuthenticated.get(`/api/profile/interests/${userId}`, {
      headers: {
        auth: Cookies.get('WenzerToken')
      }
    }).then(res => {
      setInterestsOfUser(res.data);
      setAlreadyGetInterests(true);

    }).catch(err => {
      toastfyError(err?.response?.data?.mensagem);
    })
  }

  function getAllInterests() {
    APIServiceAuthenticated.get(`/api/getAllInterests`, {
      headers: {
        auth: Cookies.get('WenzerToken')
      }
    }).then(res => {
      setInterests(res.data);
      setAlreadyGetAllInterests(true);

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
      setUserProfileInfo(res.data);
      setAlreadyGetUserInfo(true);

    }).catch(err => {
      toastfyError(err?.response?.data?.mensagem);
    })
  }

  function handleOpenModalProfilePic() {
    setOpenModalProfilePic(true);
    setAnchorEl(null);
  }

  function save(event: FormEvent) {
    event.preventDefault();

    if (isLoading) return;
    setIsLoading(true);

    const data = { name, bio, interests: interestsSelected };
  
    APIServiceAuthenticated.put(`/api/editProfile`, data, {
      headers: {
        auth: Cookies.get('WenzerToken')
      }
    }).then(res => {
      let obj = userProfileInfo!;
      obj.name = name;
      obj.bio = bio;
      setUserProfileInfo(obj);
      setInterestsOfUser(interestsSelected);

      toastfySuccess("Perfil editado!");
      setIsLoading(false);
    }).catch(err => {
      toastfyError(err?.response?.data?.mensagem);
      setIsLoading(false);
    })

  }

  useEffect(() => {
    if(!alreadyGetConnections) {
      getConnections(userInfo?.id!);
    }
  }, []);

  useEffect(() => {
    if(!alreadyGetInterests) {
      getInterestsOfUser(userInfo?.id!);
    }
  }, []);

  useEffect(() => {
    if(!alreadyGetUserInfo) {
      getUserProfile(userInfo?.id!);
    }
  }, []);

  useEffect(() => {
    if (!alreadyGetAllInterests) {
      getAllInterests();
    }
  }, []);

  function handleName(e: any) {
    e.preventDefault();
    let name = capitalize(e.target.value.trim());
    let qtdNumber = name.split('').find(x => x !== ' ' && !isNaN(Number(x)))?.length;
    if (qtdNumber && qtdNumber > 0) {
      toastfyWarning("Nome não pode possuir número");
      return;
    }
    setName(name);
  }

  function handleBio(e: any) {
    e.preventDefault();
    if (e.target.value == '') setBio('');

    let bio = e.target.value.trim();
    setBio(bio);
  }

  function capitalize(str: string) {
    const arr = str.split(" ");
    
    for (let i = 0; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }

    return arr.join(" ");
  }
  
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
              <span>{userProfileInfo?.bio}</span>
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
          {interestsOfUser.length > 0 ? (
            interestsOfUser.map((value) => (
              <span> {value?.label} </span>
            ))
          ):(
            <span>Você ainda não tem nenhum interesse</span>
          )}
        </CardInfo>

      </ContainerProfile>

      <ContainerProjects>
        {!hasEditProfile ? (
          <div className="wraper">
            <span>projects</span>
          </div>
        ) : (
          <CardInfo>
            <h3>Editar Perfil</h3>
            <div className="editProfile">
              <InputText 
                type="text"
                placeholder="Nome de usuario" 
                onChange={handleName}
                min={3}
                defaultValue={userProfileInfo?.name}
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
                defaultValue={userProfileInfo?.bio}
                onChange={handleBio}
                maxLenght={400}
              />
              <InputAutoComplete options={interests} defaultValues={interestsOfUser} onchange={(e: any) => setInterestsSelected(e)} />
              <div>
                <Button className="onlyBorder" onClick={handleChangeEditProfile}>Cancelar</Button>
                <Button onClick={save}>
                  {isLoading ? (
                    <CircularProgress size={16} color="inherit" />
                  ) : (
                    "Salvar"
                  )}
                </Button>
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