import { ReactElement, useState } from 'react';

import { Container, ContainerPost, HeaderAvatar } from './styles';
import { IPostProps, PostTypeEnum } from './interface';
import { AiFillBulb, AiOutlineBulb, AiOutlineComment, AiOutlineEllipsis, AiOutlineProject } from 'react-icons/ai';
import APIServiceAuthenticated from '../../Services/api/apiServiceAuthenticated';
import Cookies from 'js-cookie';
import { toastfyError, toastfySuccess } from "../../Components/Toastfy";
import { useHistory } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import { useAuth } from '../../Services/Authentication/auth';
import ModalProject from '../Modal/ModalProject';
import ModalConfirm from '../Modal/ModalConfirm';

function Post({ 
  created_at,
  description,
  _id,
  idProject,
  idUser,
  photo,
  title,
  goodIdea,
  user,
  removePost,
  type,
  countGoodIdea
 }: IPostProps): ReactElement {
  const [hasLiked, setHasLiked] = useState(goodIdea);
  let [countGoodIdeaState, setCountGoodIdeaState] = useState(countGoodIdea);
  const [openModalProject, setOpenModalProject] = useState(false);
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { userInfo } = useAuth();
  const [openModalConfirm, setOpenModalConfirm] = useState(false);

  const open = Boolean(anchorEl);

  function setGoodIdea() {
    APIServiceAuthenticated.post('/api/setPostAsGoodIdea', { postId: _id }, {
      headers: {
        auth: Cookies.get('WenzerToken')
      }
    }).then(data => {
      debugger;
      if (!hasLiked) {
        let newCount = ++countGoodIdeaState;
        setCountGoodIdeaState(newCount);
      } else {
        let newCount = --countGoodIdeaState;
        setCountGoodIdeaState(newCount);
      }
      setHasLiked(!hasLiked);
    }).catch(err => {
      toastfyError(err?.response?.data?.mensagem);
    })
  }

  function goToUserProfile() {
    history.push(`/profile?user=${user?._id}`);
  }

  function goToComent() {
    history.push(`/post/${_id}`);
  };

  function openProject() {
    setOpenModalProject(true);
  }

  function handleConfirm() {
    if (removePost) removePost(_id);
  }

  function handleOpenModalConfirm() {
    setOpenModalConfirm(!openModalConfirm);
  }

  const handleOpenMenuSettings = (event: React.MouseEvent<HTMLElement>) => {
    if (userInfo?.id && userInfo?.id != idUser) return;
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Container>
      <ContainerPost>
         <header>
          <HeaderAvatar onClick={goToUserProfile} src={user?.photo} />
          <div className="userInfo">
            <p onClick={goToUserProfile}>{user?.name}</p>
            <span>{created_at ? new Date(created_at!).toLocaleString('pt-BR') : ""}</span>
          </div>
          <div className='menuPost' style={{ display: userInfo?.id == idUser ? 'block' : 'none' }} onClick={handleOpenMenuSettings}>
            <AiOutlineEllipsis size={28} className='option' />
          </div>
        </header>

        <main>
            <div className="text">
              <p>{title}</p>
              <span>{description && type == PostTypeEnum.Feed && description.length > 300 ? description.substr(0, 300) + "..." : description}</span>
            </div>
            {photo ? (
              <div className="image">
                <img src={photo} alt="publicação projeto" />
              </div>
            ): (
              <div></div>
            )}
        </main>

        <footer>  
          <div onClick={setGoodIdea}>
            <p>{type == PostTypeEnum.Comment ? countGoodIdeaState : ""}</p>
            {!hasLiked ? <AiOutlineBulb size="22"/> : <AiFillBulb className='active' size="22"/>}
            <span>Boa ideia</span>
          </div>
          <div onClick={goToComent}>
            <AiOutlineComment size="22" />
            <span>Comentar</span>
          </div>
          <div onClick={openProject}> 
            <AiOutlineProject size="22" />
            <span>Projeto</span>
          </div>
        </footer>
       
        <Menu
          id="fade-menu"
          anchorEl={anchorEl}
          keepMounted
          open={open}
          onClose={handleClose}
          TransitionComponent={Fade}
        >
          <MenuItem style={{margin: '5px', gap: '10px'}} onClick={handleOpenModalConfirm} > <MdDelete size={22}/>  Excluir</MenuItem>
        </Menu>
      </ContainerPost>
      <ModalProject idProject={idProject} open={openModalProject} setOpen={setOpenModalProject} />
      <ModalConfirm open={openModalConfirm} setOpen={setOpenModalConfirm} setConfirm={handleConfirm} title='publicação' url={`/api/feed/post/${_id}`} />
    </Container>
  )
}

export default Post;