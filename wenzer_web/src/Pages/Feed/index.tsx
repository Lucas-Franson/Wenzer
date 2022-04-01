import { ReactElement, useEffect, useState } from "react";
import { MdImage, MdTextFormat, MdVideoCall } from "react-icons/md";
import NoPostHere from "../../Components/Animation/NoPostHere";
import Modal from '../../Components/Modal/ModalPost';
import { useAuth } from "../../Services/Authentication/auth";
// import { useDispatch } from 'react-redux';
// import { incrementCounterNotify } from '../../Store/Slices/notifySlice';

import APIServiceAuthenticated from "../../Services/api/apiService";

import { Container, ContainerNewPost, HeaderAvatar, InputNewPost } from "./styles";
import { toastfyError } from "../../Components/Toastfy";
import Cookies from 'js-cookie';
import Post from "../../Components/Post";
import { IPostProps } from "../../Components/Post/interface";

import { postMock } from "../../mock/post";

export default function Feed(): ReactElement {
  const [post, setPost] = useState([]);
  const [alreadyGetPost, setAlreadyGetPost] = useState(false);
  const [openModalPost, setOpenModalPost] = useState(false);
  const { userInfo } = useAuth();

  function getAllPost() {
    APIServiceAuthenticated.get('/api/getallposts', {
      headers: {
        auth: Cookies.get('WenzerToken')
      },
      params: {
        page: 1,
        countPerPage: 5
      }
    }).then(res => {
      setPost(res.data);
      setAlreadyGetPost(true);

    }).catch(err => {
      toastfyError(err?.response?.data?.mensagem);
    })
  }

  function handleOpenModalPost() {
    setOpenModalPost(true)
  }

  useEffect(() => {
    if(alreadyGetPost) {
      getAllPost();
    }
    console.log(post);
  });

  return (
    <Container>
      <ContainerNewPost>
        <header>
          <HeaderAvatar src={userInfo?.photo} />
          <InputNewPost         
              onClick={handleOpenModalPost}
          >
              Fale sobre sua ideia!
          </InputNewPost>
        </header>

        <main>
            <div onClick={handleOpenModalPost}>
              <MdImage size={25} />
              <span>Foto</span>
            </div>

            <div onClick={handleOpenModalPost}>
              <MdVideoCall size={25} />
              <span>Vídeo</span>
            </div>

            <div onClick={handleOpenModalPost}>
              <MdTextFormat size={25} />
              <span>Texto</span>
            </div>
        </main>

      </ContainerNewPost>
      {/* <button onClick={() => dispatch(incrementCounterNotify())}>notificação +</button> */}
      
      {post.length !== 0 ? (
          post.map(({ 
            created_at, description, id, idProject, idUser, photo, title, goodIdea, user
          }: IPostProps) => (
            <Post
              key={id}
              created_at={created_at}
              description={description}
              id={id}
              idProject={idProject}
              idUser={idUser}
              photo={photo}
              title={title}
              goodIdea={goodIdea}
              user={user}
            />
          ))
        ) : (
          <div>
            <NoPostHere/>
            Procurando publicações...
          </div>
        )
      }
      <Modal open={openModalPost} setOpen={setOpenModalPost} />
    </Container>
  )
}