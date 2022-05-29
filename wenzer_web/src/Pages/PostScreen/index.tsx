import { ReactElement, useState } from 'react';
import Post from '../../Components/Post';

import { Container, ContainerComent, MainComent, SubComent, MyComent, Coment} from './styles';
import { HeaderAvatar } from '../Feed/styles';
import InputTextArea from '../../Components/InputTextArea';
import Button from '../../Components/Button';
import InputText from '../../Components/InputText';
import { AiFillBulb, AiOutlineBulb } from 'react-icons/ai';
import { useHistory, useParams } from 'react-router-dom';
import APIServiceAuthenticated from '../../Services/api/apiServiceAuthenticated';
import Cookies from 'js-cookie';
import { toastfyError, toastfySuccess, toastfyWarning } from '../../Components/Toastfy';
import { useEffect } from 'react';
import { useAuth } from '../../Services/Authentication/auth';
import { CircularProgress } from '@material-ui/core';
import { PostTypeEnum } from '../../Components/Post/interface';

interface ICommentComponent {
  id: string;
  reloadComments: any;
}

function CommentComponent(props: ICommentComponent) {

  const [txtComment, setTxtComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function onSave() {
    if (!props.id) return;

    if (!txtComment || txtComment.trim() == '') {
      toastfyWarning("Preencha o campo de comentário.");
      return;
    }

    setIsLoading(true);

    APIServiceAuthenticated.post(`/api/setComments`, { postId: props.id, text: txtComment }, {
      headers: {
        auth: Cookies.get('WenzerToken')
      }
    }).then(res => {
      setTxtComment("");
      if (res.data) {
        props.reloadComments();
        toastfySuccess("Comentário publicado.");
      }
      setIsLoading(false);
    }).catch(err => {
      toastfyError(err?.response?.data?.mensagem);
      setIsLoading(false);
    })
  }

  return (
    <MyComent>
      <InputText 
        type="text"
        value={txtComment}
        onChange={(e: any) => setTxtComment(e.target.value)}
        placeholder="Escreva um comentário"/>
      <Button onClick={onSave} className="button_my-coment">
        {isLoading ? (
          <CircularProgress size={16} color="inherit" />
        ) : (
          "Comentar"
        )}
      </Button>
    </MyComent>
  )
}

interface IpostId {
  id: string;
}

function PostScreen(): ReactElement {
  const [hasSubComent, setHasSubComent] = useState<string[]>([]);
  const [likeComent, setLikeComent] = useState<string[]>([]);
  const [post, setPost] = useState<any>();
  const [txtSubComment, setTxtSubComment] = useState("");
  const [comments, setComments] = useState<any[]>([]);
  const { userInfo } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [reloadComments, setReloadComments] = useState(false);
  const history = useHistory();

  const params = useParams<IpostId>(); //id que é passado ao clicar em um post pelo feed

  function handleLikedComent(_id: string){
    if (!_id || isLoading) return;
    setIsLoading(true);
    
    APIServiceAuthenticated.post(`/api/setCommentAsGoodIdea/${_id}`, {
      headers: {
        auth: Cookies.get('WenzerToken')
      }
    }).then(res => {
      let like = likeComent.find(x => x === _id);
      if (like) {
        comments.find(x => x._id === _id).countGoodIdea--;
        setLikeComent(likeComent.filter(x => x !== _id));
      } else {
        comments.find(x => x._id === _id).countGoodIdea++;
        likeComent.push(_id);
        setLikeComent(likeComent);
      }
      setComments(comments);
      setIsLoading(false);
    }).catch(err => {
      toastfyError(err?.response?.data?.mensagem);
      setIsLoading(false);
    })
  }

  function handleSubComent(_id: string) {
    let id = hasSubComent.find(x => x === _id);
    if (id) {
      setHasSubComent([]);
    } else {
      setHasSubComent([_id]);
    }
  };

  function sendSubComent(_id: string) {
    if (!_id) return;
    
    if (!txtSubComment || txtSubComment.trim() == '') {
      toastfyWarning("Preencha o campo de comentário.");
      return;
    }

    setIsLoading(true);
    
    APIServiceAuthenticated.post(`/api/setSubComment`, { idPostComment: _id, text: txtSubComment }, {
      headers: {
        auth: Cookies.get('WenzerToken')
      }
    }).then(res => {
      if (res.data) {
        comments.find(x => x._id === res.data.idPostComment).subComments.push(res.data);
        setComments(comments);
        toastfySuccess("Comentário publicado.");
        setHasSubComent([]);
        setTxtSubComment("");
      }
      setIsLoading(false);
    }).catch(err => {
      toastfyError(err?.response?.data?.mensagem);
      setIsLoading(false);
    })
  }

  function getPost(isMounted: boolean) {
    if (!params || !params.id) return;
    APIServiceAuthenticated.get(`/api/feed/post/${params.id}`, {
      headers: {
        auth: Cookies.get('WenzerToken')
      }
    }).then(res => {
      if (isMounted) setPost(res.data);
    }).catch(err => {
      toastfyError(err?.response?.data?.mensagem);
      if (err?.response?.data?.mensagem.includes("Usuário não tem permissão")) {
        history.push(`/feed`);
      }
    })
  }

  function getComments(isMounted: boolean) {
    if (!params?.id) return;
    
    APIServiceAuthenticated.get(`/api/getAllComments/${params?.id}`, {
      headers: {
        auth: Cookies.get('WenzerToken')
      }
    }).then(res => {
      if (isMounted) {
        res.data.map((data: any) => {
          if (data.goodIdea) {
            likeComent.push(data._id);
            setLikeComent(likeComent);
          } 
        });
        setComments(res.data);
      }
    }).catch(err => {
      toastfyError(err?.response?.data?.mensagem);
    })
  }

  function goToUserProfile(_id: string) {
    if (_id)
      history.push(`/profile?user=${_id}`);
  }

  useEffect(() => {
    let isMounted = true;
    getPost(isMounted);
    return () => { isMounted = false }
  }, []);
  
  useEffect(() => {
    let isMounted = true;
    getComments(isMounted);
    return () => { isMounted = false }
  }, [reloadComments]);

  return (
    <Container>
      { post && (
        <Post 
          description={post.description} 
          goodIdea={post.goodIdea} 
          _id={post._id}
          idProject={post.idProject}
          idUser={post.idUser}
          photo={post.photo}
          title={post.title}
          user={post.user}
          created_at={post.created_at}
          key={post._id}
          updated_at={post.updated_at}
          removePost={null}
          type={PostTypeEnum.Comment}
          countGoodIdea={post.countGoodIdea}
        />
      )}
      <ContainerComent>
        <MainComent>
          {comments.map((data: any) => (
            <div key={data?._id}>
              <div className="coment">
                <HeaderAvatar onClick={() => goToUserProfile(data.usuario._id)} src={data.usuario.photo} />
                <div className="coment-user">
                  <p onClick={() => goToUserProfile(data.usuario._id)} style={{ cursor: 'pointer' }} >{data.usuario.name}</p>
                  <Coment>
                    {data.text}
                  </Coment>
                  <div className="coment-like">
                    <span onClick={() => handleSubComent(data?._id)}>Comentar</span>
                    <div onClick={() => handleLikedComent(data?._id)}>
                      <p>{data?.countGoodIdea}</p>
                      {!likeComent?.find(x => x === data?._id) ? <span> <AiOutlineBulb size="18"/> </span>: <AiFillBulb className='active' size="18"/>}
                      <span>Boa ideia</span>
                      <p>{ data.createdAt ? new Date(data.createdAt!).toLocaleString('pt-BR') : "" }</p>
                    </div>
                  </div>
                </div>
              </div>          
              <SubComent>
                {data.subComments.map((subData: any) => (
                  <div key={subData._id} className="coment">
                    <HeaderAvatar onClick={() => goToUserProfile(subData.usuario._id)} src={subData.usuario.photo} />
                    <div className="coment-user">
                      <p onClick={() => goToUserProfile(subData.usuario._id)} style={{ cursor: 'pointer' }}>{subData.usuario.name}</p>
                      <Coment>
                        {subData.text}
                      </Coment>
                      <div className="coment-like">
                        <span>{ subData.createdAt ? new Date(subData.createdAt!).toLocaleString('pt-BR') : "" }</span>
                      </div>
                    </div>
                  </div>
                ))}

                {hasSubComent.find(x => x === data?._id) && (
                  <div className="coment">
                    <HeaderAvatar src={userInfo?.photo}/>
                    <div className="coment-user">
                      <p>{userInfo?.name}</p>
                      <InputTextArea 
                        type="text"
                        defaultValue={txtSubComment}
                        onChange={(e: any) => setTxtSubComment(e.target.value)}
                        className="height-coment" 
                        placeholder="Escreva um comentário" />
                      <Button onClick={() => sendSubComent(data?._id)} className="button_coment">
                        {isLoading ? (
                          <CircularProgress size={16} color="inherit" />
                        ) : (
                          "Comentar"
                        )}
                      </Button>
                    </div>
                  </div>
                )}
              </SubComent>
            </div>
          ))}
        </MainComent>

        <CommentComponent id={params?.id} reloadComments={setReloadComments} />
      </ContainerComent>
    </Container>
  )
}

export default PostScreen;