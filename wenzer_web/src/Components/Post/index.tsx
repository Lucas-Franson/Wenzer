import { ReactElement, useState } from 'react';

import { ContainerPost, HeaderAvatar } from './styles';
import { IPostProps } from './interface';
import { AiFillBulb, AiOutlineBulb, AiOutlineComment, AiOutlineProject } from 'react-icons/ai';

function Post({ 
  created_at,
  description,
  id, idProject,
  idUser,
  photo,
  title,
  update_at
 }: IPostProps): ReactElement {
  const [hasLiked, setHasLiked] = useState(false);

  function goodIdea() {
    setHasLiked(!hasLiked);
  }

  return (
      <ContainerPost>
         <header>
          <HeaderAvatar />
          <div className="userInfo">
            <p>nome usuario</p>
            <span>{new Date().toLocaleDateString()}</span>
          </div>
        </header>

        <main>
            <div className="text">
              <p>{title}</p>
              <span>{description}</span>
            </div>
            <div className="image">
              <img src={photo} alt="publicação projeto" />
            </div>
        </main>

        <footer>  
          <div onClick={goodIdea}>
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