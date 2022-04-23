import { ReactElement, useState } from 'react';
import Post from '../../Components/Post';

import { Container, ContainerComent, MainComent, SubComent, MyComent, Coment} from './styles';
import { HeaderAvatar } from '../Feed/styles';
import InputTextArea from '../../Components/InputTextArea';
import Button from '../../Components/Button';
import InputText from '../../Components/InputText';
import { AiFillBulb, AiOutlineBulb } from 'react-icons/ai';
import { useParams } from 'react-router-dom';
import APIServiceAuthenticated from '../../Services/api/apiServiceAuthenticated';
import Cookies from 'js-cookie';
import { toastfyError, toastfySuccess, toastfyWarning } from '../../Components/Toastfy';
import { useEffect } from 'react';
import { useAuth } from '../../Services/Authentication/auth';

interface IpostId {
  id: string;
}

function PostScreen(): ReactElement {
  const [hasSubComent, setHasSubComent] = useState(false);
  const [likeComent, setLikeComent] = useState(false);
  const [post, setPost] = useState<any>();
  const [txtComment, setTxtComment] = useState("");
  const [comments, setComments] = useState([]);
  const { userInfo } = useAuth();

  const params = useParams<IpostId>(); //id que é passado ao clicar em um post pelo feed

  function handleLikedComent(){
    setLikeComent(prev => !prev);
  }

  function handleSubComent() {
    setHasSubComent(!hasSubComent);
  };

  function sendSubComent(_id: string) {
    setHasSubComent(false);
  }

  function getPost() {
    if (!params || !params.id) return;
    
    APIServiceAuthenticated.get(`/api/feed/post/${params.id}`, {
      headers: {
        auth: Cookies.get('WenzerToken')
      }
    }).then(res => {
      setPost(res.data);
    }).catch(err => {
      toastfyError(err?.response?.data?.mensagem);
    })
  }

  function getComments() {
    if (!params?.id) return;
    
    APIServiceAuthenticated.get(`/api/getAllComments/${params?.id}`, {
      headers: {
        auth: Cookies.get('WenzerToken')
      }
    }).then(res => {
      debugger;
      setComments(res.data);
    }).catch(err => {
      toastfyError(err?.response?.data?.mensagem);
    })
  }

  function onSave() {
    if (!txtComment || txtComment.trim() == '') {
      toastfyWarning("Preencha o campo de comentário.");
      return;
    }

    if (!params?.id) return;

    APIServiceAuthenticated.post(`/api/setComments`, { postId: params.id, text: txtComment }, {
      headers: {
        auth: Cookies.get('WenzerToken')
      }
    }).then(res => {
      toastfySuccess("Comentário publicado.");
      setTxtComment("");
    }).catch(err => {
      toastfyError(err?.response?.data?.mensagem);
    })
  }

  useEffect(() => {
    getPost();
    getComments();
  }, []);

  return (
    <Container>
      { post && (
        <Post 
          description={post.description} 
          goodIdea={true} 
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
        />
      )}
      <ContainerComent>
        <MainComent>
          {comments.map((data: any) => (
            <div>
              <div className="coment">
                <HeaderAvatar src={data.usuario.photo} />
                <div className="coment-user">
                  <p>{data.usuario.name}</p>
                  <Coment>
                    {data.text}
                  </Coment>
                  <div className="coment-like">
                    <span onClick={handleSubComent}>Comentar</span>
                    <div onClick={handleLikedComent}>
                      <p>2.5k</p>
                      {!likeComent ? <AiOutlineBulb size="18"/> : <AiFillBulb className='active' size="18"/>}
                      <span>Boa ideia</span>
                      <span>{ data.createdAt ? new Date(data.createdAt!).toLocaleString('pt-BR') : "" }</span>
                    </div>
                  </div>
                </div>
              </div>          
              <SubComent>
                <div className="coment">
                  <HeaderAvatar/>
                  <div className="coment-user">
                    <p>Nome Usuário</p>
                    <Coment>
                      subcomentario aqui
                    </Coment>
                    <div className="coment-like">
                      <span>23/11/2000</span>
                    </div>
                  </div>
                </div>

                {hasSubComent && (
                  <div className="coment">
                    <HeaderAvatar src={userInfo?.photo}/>
                    <div className="coment-user">
                      <p>{userInfo?.name}</p>
                      <InputTextArea className="height-coment" placeholder="Escreva um comentário" />
                      <Button onClick={() => sendSubComent(data?._id)} className="button_coment">
                        Comentar
                      </Button>
                    </div>
                  </div>
                )}
              </SubComent>
            </div>
          ))}
        </MainComent>

        <MyComent>
          <InputText 
            type="text"
            defaultValue={txtComment}
            onChange={(e: any) => setTxtComment(e.target.value)}
            placeholder="Escreva um comentário"/>
          <Button onClick={onSave} className="button_my-coment">comentar</Button>
        </MyComent>
      </ContainerComent>
    </Container>
  )
}

export default PostScreen;