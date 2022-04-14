import { ReactElement, useEffect, useState } from "react";
import { MdImage, MdTextFormat, MdUpdate, MdVideoCall } from "react-icons/md";
import NoPostHere from "../../Components/Animation/NoPostHere";
import Modal from '../../Components/Modal/ModalPost';
import { useAuth } from "../../Services/Authentication/auth";

import { Container, ContainerNewPost, HeaderAvatar, InputNewPost } from "./styles";
import Post from "../../Components/Post";
import { IPostProps } from "../../Components/Post/interface";

import socketIOClient from 'socket.io-client';
import APIServiceAuthenticated from "../../Services/api/apiServiceAuthenticated";
import Cookies from "js-cookie";
import { toastfyError } from "../../Components/Toastfy";
import Button from "../../Components/Button";

export default function Feed(): ReactElement {
  const [post, setPost] = useState<any>([]);
  const [newPost, setNewPost] = useState<any>([]);
  const [socket, setSocket] = useState<any>(null);
  const [dateOfLastPost, setDateOfLastPost] = useState<any>(null);
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
      if (res.data.length > 0) {
        setDateOfLastPost(res.data[0].created_at);
      } else {
        setDateOfLastPost(new Date());
      }
      setPost(res.data);
    }).catch(err => {
      toastfyError(err?.response?.data?.mensagem);
    })
  }

  function handleOpenModalPost() {
    setOpenModalPost(true)
  }

  function handleNewPost() {
    if (newPost.length > 0) {
      socket.disconnect();
      setPost([...newPost, ...post]);
      setDateOfLastPost(newPost[0].created_at!);
      setNewPost([]);
    }
  }

  useEffect(() => {
    getAllPost();
  }, []);

  useEffect(() => {
    if (dateOfLastPost != null) {
      const socketConn = socketIOClient('http://127.0.0.1:3333', { transports: ['websocket'], query: { id: userInfo?.id, date: dateOfLastPost } });
      setSocket(socketConn);
      socketConn.on("GetPost", data => {
        if (data.length > 0) {
          setNewPost(data);
        }
      });
      return () => {
        socketConn.disconnect();
      } 
    }
  }, [dateOfLastPost]);

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
      
      {
        newPost.length > 0 ? (
          <Button className="flex button_coment" onClick={handleNewPost}>
            <MdUpdate size={22}/> Novas publicações
          </Button>
        ) : (
          <span></span>
        )
      }

      {post.length !== 0 ? (
          post.map(({ 
            created_at, description, _id, idProject, idUser, photo, title, goodIdea, user
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