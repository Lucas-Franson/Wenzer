import { ReactElement, useEffect, useState } from "react";
import { MdImage, MdTextFormat, MdVideoCall } from "react-icons/md";
import NoPostHere from "../../Components/Animation/NoPostHere";
import Modal from '../../Components/Modal/ModalPost';
import { useAuth } from "../../Services/Authentication/auth";
import { useDispatch } from 'react-redux';
import { incrementCounterNotify } from '../../Store/Slices/notifySlice';

import APIServiceAuthenticated from "../../Services/api/apiService";

import { Container, ContainerNewPost, HeaderAvatar, InputNewPost } from "./styles";
import { toastfyError } from "../../Components/Toastfy";
import Cookies from 'js-cookie';
import NoContent from "../../Components/Animation/NoContent";

export default function Feed(): ReactElement {
  const { handleOpenModalPost, openModalPost, setOpenModalPost } = useAuth();
  const dispatch = useDispatch();
  const [post, setPost] = useState([]);

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

    }).catch(err => {
      toastfyError(err?.response?.data?.mensagem);
    })
  }

  useEffect(() => {
    if(post.length === 0) {
      getAllPost();
    }
    console.log(post);
  });

  return (
    <Container>
      <ContainerNewPost>
        <header>
          <HeaderAvatar />
          <InputNewPost         
              onClick={handleOpenModalPost}
          >
              Qual a sua idéia?
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
      <NoPostHere />
      <button onClick={() => dispatch(incrementCounterNotify())}>notificação +</button>
      Feed em breve...
      {post.map((item: any) => (
        <h3 key={item.id}>{item.title}</h3>
      ))}
      <Modal open={openModalPost} setOpen={setOpenModalPost} />
    </Container>
  )
}