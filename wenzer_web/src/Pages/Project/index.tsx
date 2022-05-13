import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { useEffect } from 'react';
import PostProfile from '../../Components/PostProfile';
import { toastfyError } from '../../Components/Toastfy';
import { screens, searchTypes } from '../../Constants/MediaSettings';
import APIServiceAuthenticated from '../../Services/api/apiServiceAuthenticated';
import { useAuth } from '../../Services/Authentication/auth';

import { Container, ContainerProjects } from './styles';

const Projetos: React.FC = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const { userInfo } = useAuth();

  function getProjects() {
    APIServiceAuthenticated.get(`/api/project/${userInfo?.id}`, {
      headers: {
        auth: Cookies.get('WenzerToken')
      }
    }).then(res => {
      setProjects(res.data);
    }).catch(err => {
      toastfyError(err?.response?.data?.mensagem);
    });
  }

  useEffect(() => {
    if (userInfo) getProjects();
  }, []);

  return (
      <Container>
          <ContainerProjects>
          <div className="wraper">
            {projects.map((item: any, index: number) => (
              <PostProfile 
                index={index}
                _id={item._id}
                name={item.name}
                type={searchTypes.Project}
                photo={item.photo}
                countOfGoodIdea={item.CountOfGoodIdea}
                countOfActions={item.CountOfActions}
                screen={screens.MyProjects}
                key={item._id}/>
            ))} 
          </div>
        </ContainerProjects>
      </Container>
  )
}

export default Projetos;