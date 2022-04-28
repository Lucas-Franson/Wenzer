import Cookies from 'js-cookie';
import React, { ReactElement, useState } from 'react';
import { useEffect } from 'react';
import { MdSearch } from 'react-icons/md';
import Button from '../../Components/Button';
import PostProfile from '../../Components/PostProfile';
import { toastfyError } from '../../Components/Toastfy';
import { screens } from '../../Constants/MediaSettings';
import APIServiceAuthenticated from '../../Services/api/apiServiceAuthenticated';
import { useAuth } from '../../Services/Authentication/auth';

import { Container, ContainerProjects, ContainerSearch } from './styles';

function Explorar(): ReactElement {
  const [projects, setProjects] = useState([]);
  const [alreadyGetProjects, setAlreadyGetProjects] = useState(false);
  const [person, setPerson] = useState(false);
  const [project, setProject] = useState(false);
  const [post, setPost] = useState(false);
  const { userInfo } = useAuth();

  function getProjectsByUser(userId: string) {
    APIServiceAuthenticated.get(`/api/project/onhigh`, {
      headers: {
        auth: Cookies.get('WenzerToken')
      }
    }).then(res => {
      setProjects(res.data);
      setAlreadyGetProjects(true);

    }).catch(err => {
      toastfyError(err?.response?.data?.mensagem);
    })
  }

  useEffect(() => {
    
    if(!alreadyGetProjects) {
      getProjectsByUser(userInfo?.id!);
    }

  })

  return (
      <Container>
        <ContainerSearch>
          <h4>Filtrar por:</h4>
          <div>
            <div>
              <input type="checkbox" onChange={(e) => setPerson(!person)}/>
              <span>Pessoa</span>
            </div>
            <div>
              <input type="checkbox" onChange={(e) => setProject(!project)}/>
              <span>Projeto</span>
            </div>
            <div>
              <input type="checkbox" onChange={(e) => setPost(!post)}/>
              <span>Publicação</span>
            </div>
          </div>
        </ContainerSearch>

        <div className='ButtonSearch'>
          <Button className="flex button-search">
            Pesquisar
            <MdSearch size={20}/>
          </Button>
        </div>

        <ContainerProjects>
          <div className="wraper">
            {projects.map((item: any, index: number) => (
              <PostProfile 
                index={index}
                _id={item._id}
                name={item.name}
                photo={item.photo}
                countGoodIdea={item.countGoodIdea}
                countFollowers={item.countFollowers}
                screen={screens.HotProjects}
                key={item._id}/>
            ))} 
          </div>
        </ContainerProjects>
      </Container>
  )
}

export default Explorar;