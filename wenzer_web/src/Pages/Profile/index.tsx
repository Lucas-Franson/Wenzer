import { FormEvent, ReactElement, useEffect, useState } from 'react';
import { HeaderAvatar } from '../Feed/styles';
import { AiOutlineEllipsis } from 'react-icons/ai';
import { useAuth } from '../../Services/Authentication/auth';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';

import { CardInfo, CardProfile, Container, ContainerProfile, ContainerProjects } from './styles';
import PostProfile from '../../Components/PostProfile';
import { MdImage, MdPersonAdd, MdSettings } from 'react-icons/md';
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
import { IPostProps, PostTypeEnum } from '../../Components/Post/interface';
import Post from '../../Components/Post';
import NoPostHere from "../../Components/Animation/NoPostHere";
import { useHistory } from 'react-router-dom';

function Profile(): ReactElement {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [hasEditProfile, setHasEditProfile] = useState(false);
  const [connections, setConnections] = useState<{ _id: string, name: string, photo: any }[]>([]);
  const [interestsOfUser, setInterestsOfUser] = useState<{ label: string, value: string }[]>([]);
  const [userProfileInfo, setUserProfileInfo] = useState<IProfileProps>();
  const [openModalProfilePic, setOpenModalProfilePic] = useState(false);
  const [showAllInterests, setShowAllInterests] = useState(false);
  const [post, setPost] = useState<any>([]);
  const history = useHistory();
  
  // CONTROL REQUESTS

  const [alreadyGetConnections, setAlreadyGetConnections] = useState(false);
  const [alreadyGetInterests, setAlreadyGetInterests] = useState(false);
  const [alreadyGetUserInfo, setAlreadyGetUserInfo] = useState(false);

  const [alreadyConnected, setAlreadyConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingFollow, setIsLoadingFollow] = useState(false);
  const [alreadyGetAllInterests, setAlreadyGetAllInterests] = useState(false);

  // FORM UPDATE PROFILE

  const [interests, setInterests] = useState<{ label: string, value: string }[]>([]);
  const [name, setName] = useState(''); 
  const [lastName, setLastName] = useState('');
  const [bio, setBio] = useState('');
  const [university, setUniversity] = useState('');
  const [hasCompany, setHasCompany] = useState(false);
  const [interestsSelected, setInterestsSelected] = useState<any[]>([]);  
  
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

  function getAllPost(isMounted: boolean, userId: string) {

    APIServiceAuthenticated.get(`/api/profile/publications/${userId}`, {
      headers: {
        auth: Cookies.get('WenzerToken')
      },
      params: {
        page: 1,
        countPerPage: 5
      }
    }).then(res => {
      if (isMounted) setPost(res.data);
    }).catch(err => {
      toastfyError(err?.response?.data?.mensagem);
    })
  }

  function loadTokenEmail() {
    let searchForToken = window.location.search;
    let token = new URLSearchParams(searchForToken);
    let getToken = token.get('user');

    return getToken;
  }

  function getConnections(isMounted: boolean, userId: string) {
    APIServiceAuthenticated.get(`/api/profile/connections/${userId}`, {
      headers: {
        auth: Cookies.get('WenzerToken')
      }
    }).then(res => {
      if (isMounted) {
        setConnections(res.data);
        setAlreadyGetConnections(true);
      }
    }).catch(err => {
      toastfyError(err?.response?.data?.mensagem);
    })
 }

  function getInterestsOfUser(isMounted: boolean, userId: string) {
    APIServiceAuthenticated.get(`/api/profile/interests/${userId}`, {
      headers: {
        auth: Cookies.get('WenzerToken')
      }
    }).then(res => {
      if (res.data && isMounted) {
        setInterestsSelected(res.data);
        setInterestsOfUser(res.data);
        setAlreadyGetInterests(true);
      }

    }).catch(err => {
      toastfyError(err?.response?.data?.mensagem);
    })
  }

  function getAllInterests(isMounted: boolean) {
    APIServiceAuthenticated.get(`/api/getAllInterests`, {
      headers: {
        auth: Cookies.get('WenzerToken')
      }
    }).then(res => {
      if (isMounted) {
        setInterests(res.data);
        setAlreadyGetAllInterests(true);
      }
    }).catch(err => {
      toastfyError(err?.response?.data?.mensagem);
    })
  }

  function getUserProfile(isMounted: boolean, userId: string) {
    APIServiceAuthenticated.get(`/api/profile/info/${userId}`, {
      headers: {
        auth: Cookies.get('WenzerToken')
      }
    }).then(res => {
      if (res.data && isMounted) {
        setAlreadyConnected(res.data.alreadyConnected);
        setName(res.data.name);
        setLastName(res.data.lastName);
        setBio(res.data.bio);
        setHasCompany(res.data.hasCompany);
        setUniversity(res.data.university);
        setUserProfileInfo(res.data);
        setAlreadyGetUserInfo(true);
      }

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

    let qtdNumber = name.split('').find(x => x !== ' ' && !isNaN(Number(x)))?.length;
    if (qtdNumber && qtdNumber > 0) {
      toastfyWarning("Nome não pode possuir números");
      setIsLoading(false);
      return;
    }

    qtdNumber = lastName.split('').find(x => x !== ' ' && !isNaN(Number(x)))?.length;
    if (qtdNumber && qtdNumber > 0) {
      toastfyWarning("Sobrenome não pode possuir números");
      setIsLoading(false);
      return;
    }

    let arrAreEqual = interestsOfUser.length === interestsSelected.length && interestsOfUser.filter(x => interestsSelected.some(y => x.value !== y.value)).length === 0;
    
    if (name === userProfileInfo?.name && 
      bio === userProfileInfo.bio && 
      arrAreEqual &&
      lastName === userProfileInfo.lastName &&
      university === userProfileInfo.university) {
      toastfyWarning("Nenhum campo foi alterado.");
      setIsLoading(false);
      return;
    }

    const data = { name, lastName, bio, university, hasCompany, interests: interestsSelected };
  
    APIServiceAuthenticated.put(`/api/editProfile`, data, {
      headers: {
        auth: Cookies.get('WenzerToken')
      }
    }).then(res => {
      let obj = userProfileInfo!;
      obj.name = name;
      obj.lastName = lastName;
      obj.bio = bio;
      obj.university = university;
      obj.hasCompany = hasCompany;
      setUserProfileInfo(obj);
      setInterestsOfUser(interestsSelected);
      handleChangeEditProfile();
      toastfySuccess("Perfil editado!");
      setIsLoading(false);
    }).catch(err => {
      toastfyError(err?.response?.data?.mensagem);
      setIsLoading(false);
    })

  }

  function followUser(event: FormEvent) {
    event.preventDefault();

    if (userAuthSameProfile()) return;

    setIsLoadingFollow(true);
    let user = loadTokenEmail();

    APIServiceAuthenticated.post(`/api/profile/follow`, { idUserToFollow: user }, {
      headers: {
        auth: Cookies.get('WenzerToken')
      }
    }).then(res => {
      toastfySuccess("Você enviou uma solicitação de amizade para este usuário.");
      setIsLoadingFollow(false);
      setAlreadyConnected(true);

    }).catch(err => {
      toastfyError(err?.response?.data?.mensagem);
      setIsLoadingFollow(false);
    })
  }

  useEffect(() => {
    let isMounted = true;
    if(!alreadyGetConnections) {
      let user = loadTokenEmail();
      getConnections(isMounted, user ? user : userInfo?.id!);
    }
    return () => { isMounted = false }
  }, [alreadyGetConnections]);

  useEffect(() => {
    let isMounted = true;
    if(!alreadyGetInterests) {
      let user = loadTokenEmail();
      getInterestsOfUser(isMounted, user ? user : userInfo?.id!);
    }
    return () => { isMounted = false }
  }, [alreadyGetInterests]);

  useEffect(() => {
    let isMounted = true;
    if(!alreadyGetUserInfo) {
      let user = loadTokenEmail();
      getUserProfile(isMounted, user ? user : userInfo?.id!);
    }
    return () => { isMounted = false }
  }, [alreadyGetUserInfo]);

  useEffect(() => {
    let isMounted = true;
    if (!alreadyGetAllInterests) {
      getAllInterests(isMounted);
    }
    return () => { isMounted = false }
  }, []);

  useEffect(() => {
    let isMounted = true;
    let user = loadTokenEmail();
    getAllPost(isMounted, user ? user : userInfo?.id!);
    return () => { isMounted = false }
  }, [alreadyGetUserInfo]);

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

  function handleLastName(e: any) {
    e.preventDefault();
    let lastName = capitalize(e.target.value.trim());
    let qtdNumber = lastName.split('').find(x => x !== ' ' && !isNaN(Number(x)))?.length;
    if (qtdNumber && qtdNumber > 0) {
      toastfyWarning("Sobrenome não pode possuir número");
      return;
    }
    setLastName(lastName);
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

  function userAuthSameProfile() {
    let user = loadTokenEmail();

    if (user) {
      return user === userInfo?.id;
    }

    return true;
  }

  function goToUserProfile(_id: string) {
    setHasEditProfile(false);
    setAnchorEl(null);
    history.push(`/profile?user=${_id}`);
    setAlreadyGetUserInfo(false);
    setAlreadyGetConnections(false);
    setAlreadyGetInterests(false);
  }

  function removePost(_id: string) {
    let newListPost = post.filter((x: any) => x._id !== _id);
    setPost(newListPost);
  }
  
  return (
    <Container>
      <ContainerProfile>
        <CardProfile>
            <div className="imageProfile">
              <div style={{ display: userAuthSameProfile() ? 'block' : 'none' }} onClick={handleOpenMenuSettings}>
                <AiOutlineEllipsis size={28} className='option' />
              </div>
              <HeaderAvatar className='avatarProfile' src={userProfileInfo?.photo} />
              <p>{userProfileInfo?.name} {userProfileInfo?.lastName}</p>
              <span>{userProfileInfo?.university && (`Estuda em ${userProfileInfo.university}`)}</span>
              <span>{userProfileInfo?.bio}</span>
            </div>

            <div className="counterProject">
             {!userAuthSameProfile() && !alreadyConnected ? (
               <div className="counter">
                  <Button className="onlyBorder flex white-content" onClick={followUser}>
                    <MdPersonAdd size={20}/>
                    {isLoadingFollow ? (
                      <CircularProgress size={16} color="inherit" />
                    ) : (
                      "Conectar"
                    )}
                  </Button>
                </div>
             ) : (
              <>
                  <div className="counter">
                    <span>Projetos</span>
                    <span>{userProfileInfo?.countProjects}</span>
                  </div>
                  <div className="counter">
                    <span>Participando</span>
                    <span>{userProfileInfo?.countParticipating}</span>
                  </div>
              </>
             )}
            </div>

        </CardProfile>
        <CardInfo>
          <h3>Conexões</h3>
          {connections.length > 0 ? (
            connections.map((value) => (
              <div key={value?._id} className="connectionComponent" onClick={() => goToUserProfile(value?._id)}>
                <HeaderAvatar className="thumbUser" src={value?.photo} />
                <span style={{ marginLeft: 10 }}>{value?.name}</span>
              </div>
            ))
          ): (
            <span>Você ainda não tem nenhuma conexão</span>
          )}
        </CardInfo>
        
        <CardInfo>
          <h3>Interesses</h3>
          {interestsOfUser.length > 0 ? (
            interestsOfUser.length > 10 ? (
              showAllInterests ? (
                <div className="interesses">
                  {interestsOfUser.map((value) => (
                    <span key={value?.value}> {value?.label} </span>
                  ))}
                  <span style={{ cursor: 'pointer' }} onClick={() => setShowAllInterests(false)}>mostrar menos...</span>
                </div>
              ) : (
                <div className="interesses">
                  {interestsOfUser.slice(0, 10).map((value) => (
                    <span key={value?.value}> {value?.label} </span>
                  ))}
                  <span style={{ cursor: 'pointer' }} onClick={() => setShowAllInterests(true)}>mostrar mais...</span>
                </div>
              )
            ) : (
              <div className="interesses">
                {interestsOfUser.map((value) => (
                  <span key={value?.value}> {value?.label} </span>
                ))}
              </div>
            )
          ):(
            <span>Você ainda não tem nenhum interesse</span>
          )}
        </CardInfo>

      </ContainerProfile>

      <ContainerProjects>
        {!hasEditProfile ? (
          post.length !== 0 ? (
            <>
              <span>Publicações</span>
             {
                post.map(({ 
                  created_at, description, _id, idProject, idUser, photo, title, goodIdea, user, countGoodIdea
                }: IPostProps) => (
                  <Post
                    key={_id}
                    created_at={created_at}
                    description={description}
                    _id={_id}
                    idProject={idProject}
                    idUser={idUser}
                    photo={photo}
                    title={title}
                    goodIdea={goodIdea}
                    user={user}
                    removePost={removePost}
                    type={PostTypeEnum.Feed}
                    countGoodIdea={countGoodIdea}
                  />
                ))
             }
            </>
          ) : (
            <div>
              <NoPostHere/>
              Você ainda não possui nenhuma publicação.
            </div>
          )
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
                placeholder="Sobrenome"
                required={true}
                defaultValue={userProfileInfo?.lastName}
                onChange={handleLastName}
              />
              <InputText 
                type="text"
                placeholder="E-mail" 
                defaultValue={userInfo?.email}
                disabled={true}
                className='noCopy'
              />
              {!hasCompany && (
                <InputText
                  placeholder="Universidade"
                  required={true}
                  defaultValue={userProfileInfo?.university}
                  onChange={(e: any) => setUniversity(e.target.value)}
                />
              )}
              <InputTextArea
                type="text"
                placeholder="Bio" 
                defaultValue={userProfileInfo?.bio}
                onChange={handleBio}
                maxLength={400}
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