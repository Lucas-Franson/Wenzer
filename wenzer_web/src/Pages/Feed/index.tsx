import { ReactElement, useEffect, useRef, useState } from "react";
import { MdImage, MdTextFormat, MdUpdate, MdVideoCall } from "react-icons/md";
import NoPostHere from "../../Components/Animation/NoPostHere";
import Modal from '../../Components/Modal/ModalPost';
import { useAuth } from "../../Services/Authentication/auth";

import { Container, ContainerNewPost, HeaderAvatar, InputNewPost, ContainerAds, ContainerRecomendado } from "./styles";
import Post from "../../Components/Post";
import { IPostProps, PostTypeEnum } from "../../Components/Post/interface";

import APIServiceAuthenticated from "../../Services/api/apiServiceAuthenticated";
import Cookies from "js-cookie";
import { toastfyError } from "../../Components/Toastfy";
import Button from "../../Components/Button";
import { useWenzer } from "../../hooks/useWenzer";
import { CircularProgress } from "@material-ui/core";
import Ads1 from '../../Utils/image/adscoca.jpg';
import Ads2 from '../../Utils/image/adsuniso.jpg';
import PostRecomendado from "../../Components/PostRecomendado";

export default function Feed(): ReactElement {
  const [post, setPost] = useState<any>([]);
  const [newPost, setNewPost] = useState<any>([]);
  const [recommendedProjects, setRecommendedProjects] = useState<any[]>([]);
  const [openModalPost, setOpenModalPost] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingLazyLoading, setIsLoadingLazyLoading] = useState(false);
  const [noMorePost, setNoMorePost] = useState(false);
  const [idProject, setIdProject] = useState(null);
  const [page, setPage] = useState<number>(1);
  const { userInfo } = useAuth();
  const { getSocketIOClient, scrollBottom, setScrollBottom } = useWenzer();

  const listInnerRef = useRef<any>();

  const onScroll = () => {
    setScrollBottom(false);
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      if (scrollTop + clientHeight === scrollHeight) {
        setScrollBottom(true);
      }
    }
  };

  function getAllPost(isMounted: boolean) {
    if (isMounted) setIsLoadingLazyLoading(true);
    APIServiceAuthenticated.get('/api/getallposts', {
      headers: {
        auth: Cookies.get('WenzerToken')
      },
      params: {
        page,
        countPerPage: 5
      }
    }).then(res => {
      if (isMounted) {
        if (res.data.length > 0) {
          setDateOfLastPost(res.data[0].created_at);
        } else {
          setDateOfLastPost(new Date());
        }
        
        if (res.data && res.data.length > 0) {
          if (!post.find((x: any) => x._id === res.data[0]._id)) {
            setPost([...post, ...res.data]);
          }
          setNoMorePost(false);
        } else {
          setNoMorePost(true);
        }
        setIsLoadingLazyLoading(false);
      }
    }).catch(err => {
      toastfyError(err?.response?.data?.mensagem);
      if (isMounted) {
        setIsLoadingLazyLoading(false);
        setNoMorePost(false);
      }
    })
  }

  function getAllRecommendedProjects(isMounted: boolean) {

    APIServiceAuthenticated.get('/api/feed/projectsByInterests', {
      headers: {
        auth: Cookies.get('WenzerToken')
      }
    }).then(res => {
      if (isMounted) {
        setRecommendedProjects(res.data);
      }
    }).catch(err => {
      toastfyError(err?.response?.data?.mensagem);
    })
  }

  function handleOpenModalPost() {
    setOpenModalPost(true);
  }

  function handleNewPost() {
    if (newPost.length > 0 && !isLoading) {
      setIsLoading(true);

      if (!post.find((x: any) => x._id === newPost[0]._id)) {
        setPost([...newPost, ...post]);
      }

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
      setNewPost([]);
    }).catch(err => {
      toastfyError(err?.response?.data?.mensagem);
      setIsLoading(false);
      setNewPost([]);
    })
  }

  function createWebService(isMounted: boolean) {
    let socketConn = getSocketIOClient();
    socketConn.on("GetPost", data => {
      if (!isLoading && isMounted && data && newPost.length != data.length && data.length > 0) {
        let alreadyExist = post.find((x: any) => x._id == data[0]._id);
        if (!alreadyExist) {
          setNewPost(data);
        }
      }
    });
  }

  function removePost(_id: string) {
    let newListPost = post.filter((x: any) => x._id !== _id);
    setPost(newListPost);
  }

  useEffect(() => {
    let isMounted = true;
    if (!noMorePost) {
      if (page == 1 && isMounted) setPost([]);
      getAllPost(isMounted);
    }
    return () => { isMounted = false }
  }, [page]);

  useEffect(() => {
    let isMounted = true;
    if (scrollBottom && isMounted) {
      setPage(page+1);
    }
    return () => { isMounted = false }
  }, [scrollBottom]);
  
  useEffect(() => {
    let isMounted = true;
    createWebService(isMounted);
    getAllRecommendedProjects(isMounted);
    return () => { isMounted = false }
  }, []);

  return (
    <Container
      onScroll={onScroll}
      ref={listInnerRef}>
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
      {
        newPost.length > 0 && !post.find((x: any) => x._id === newPost[0]._id) ? (
          <Button className="flex button_coment" onClick={handleNewPost}>
            <MdUpdate size={22}/> 
            {isLoading ? (
                <CircularProgress size={16} color="inherit" />
              ) : (
                "Novas publicações"
              )
            }
          </Button>
        ) : (
          <span></span>
        )
      }

      <div style={{ width: '100%' }}>
        {post.length !== 0 ? (
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
          ) : (
            <div>
              <NoPostHere/>
              Procurando publicações...
            </div>
          )
        }
        {post.length !== 0 && isLoadingLazyLoading && (
          <div>
            <CircularProgress size={16} color="inherit" /> Procurando publicações... 
          </div>
        )}
        {post.length !== 0 && !isLoadingLazyLoading && noMorePost && (
          <div>
            <NoPostHere/>
          </div>
        )}
      </div>
      <ContainerAds>
        <div>
          <img src={Ads1} alt="adsense" />
          <img src={Ads2} alt="adsense 2" />

        </div>
      </ContainerAds>
      <ContainerRecomendado>
        <p>Projetos Recomendados</p>

        {recommendedProjects && recommendedProjects.map(data => (
          <PostRecomendado
            _id={data._id}
            name={data.name}
            bio={data.description}
            photo={data.photo}
            key={data._id}
            />
        ))}
      </ContainerRecomendado>

      <Modal idProject={idProject} open={openModalPost} setOpen={setOpenModalPost} />
    </Container>
  )
}