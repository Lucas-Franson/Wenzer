import { ReactElement, useState } from 'react';

import { ContainerPost, HeaderAvatar } from './styles';
import { IPostProps } from './interface';
import { AiFillBulb, AiOutlineBulb, AiOutlineComment, AiOutlineProject } from 'react-icons/ai';
import APIServiceAuthenticated from '../../Services/api/apiServiceAuthenticated';
import Cookies from 'js-cookie';
import { toastfyError } from "../../Components/Toastfy";

function Post({ 
  created_at,
  description,
  _id, idProject,
  idUser,
  photo,
  title,
  goodIdea,
  user
 }: IPostProps): ReactElement {
  const [hasLiked, setHasLiked] = useState(goodIdea);

  function setGoodIdea() {
    setHasLiked(!hasLiked);
    APIServiceAuthenticated.post('/api/setPostAsGoodIdea', { postId: _id }, {
      headers: {
        auth: Cookies.get('WenzerToken')
      }
    }).then(res => {

    }).catch(err => {
      toastfyError(err?.response?.data?.mensagem);
    })
  }

  return (
      <ContainerPost>
         <header>
          <HeaderAvatar src={user?.photo} />
          <div className="userInfo">
            <p>{user?.name}</p>
            <span>{new Date().toLocaleDateString()}</span>
          </div>
        </header>

        <main>
            <div className="text">
              <p>{title}</p>
              <span>{description}</span>
            </div>
            {photo && photo.data.length !== 0 ? (
              <div className="image">
                <img src={photo} alt="publicação projeto" />
              </div>
            ): (
              <div></div>
            )}
        </main>

        <footer>  
          <div onClick={setGoodIdea}>
            {!hasLiked ? <AiOutlineBulb size="22"/> : <AiFillBulb className='active' size="22"/>}
            <span>Boa ideia</span>
          </div>
          <div>
            <AiOutlineComment size="22" />
            <span>Comentar</span>
          </div>
          <div>
            <AiOutlineProject size="22" />
            <span>Projeto</span>
          </div>
        </footer>
      </ContainerPost>
  )
}

export default Post;