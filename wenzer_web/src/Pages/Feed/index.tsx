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
import { useWenzer } from "../../hooks/useWenzer";
import { CircularProgress } from "@material-ui/core";

export default function Feed(): ReactElement {
  const [post, setPost] = useState<any>([]);
  const [newPost, setNewPost] = useState<any>([]);
  const [openModalPost, setOpenModalPost] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [idProject, setIdProject] = useState(null);
  const { userInfo } = useAuth();
  const { getSocketIOClient } = useWenzer();

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
    if (newPost.length > 0 && !isLoading) {
      setIsLoading(true);
      setPost([...newPost, ...post]);
      let created_at = newPost[0].created_at;
      setDateOfLastPost(created_at!);
    }
  }

  function setDateOfLastPost(date: Date) {

    APIServiceAuthenticated.post('/api/feed/setDateOfLastPost', { date }, {
      headers: {
        auth: Cookies.get('WenzerToken')
      }
    }).then(res => {
      setIsLoading(false);
    }).catch(err => {
      toastfyError(err?.response?.data?.mensagem);
      setIsLoading(false);
    })
  }

  function createWebService() {
    let socketConn = getSocketIOClient();
    socketConn.on("GetPost", data => {
      if (!isLoading) {
        setNewPost(data);
      }
    });
  }

  function removePost(_id: string) {
    let newListPost = post.filter((x: any) => x._id !== _id);
    setPost(newListPost);
  }

  useEffect(() => {
    getAllPost();
  }, []);

  useEffect(() => {
    createWebService();
  }, []);

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
            <MdUpdate size={22}/> {isLoading ? (
                                    <CircularProgress size={16} color="inherit" />
                                  ) : (
                                    "Novas publicações"
                                  )}
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
              removePost={removePost}
            />
          ))
        ) : (
          <div>
            <NoPostHere/>
            Procurando publicações...
          </div>
        )
      }
      <Modal idProject={idProject} open={openModalPost} setOpen={setOpenModalPost} />
    </Container>
  )
}