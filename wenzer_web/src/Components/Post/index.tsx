import { ReactElement } from 'react';

import { ContainerPost, HeaderAvatar } from './styles';
import { IPostProps } from './interface';
import { AiOutlineBulb, AiOutlineComment, AiOutlineProject } from 'react-icons/ai';

function Post({ 
  created_at,
  description,
  id, idProject,
  idUser,
  photo,
  title,
  update_at
 }: IPostProps): ReactElement {
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
            <p>{title}</p>
            <span>{description}</span>
            <img src={photo} alt="publicação projeto" />
        </main>
        <footer>  
          <div>
            <AiOutlineBulb size="22"/>
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