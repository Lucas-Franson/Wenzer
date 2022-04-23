import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { useEffect } from 'react';
import PostProfile from '../../Components/PostProfile';
import { toastfyError } from '../../Components/Toastfy';
import { screens } from '../../Constants/MediaSettings';
import APIServiceAuthenticated from '../../Services/api/apiServiceAuthenticated';
import { useAuth } from '../../Services/Authentication/auth';

import { Container, ContainerProjects } from './styles';

const Explorar: React.FC = () => {

  const [projects, setProjects] = useState([]);
  const [alreadyGetProjects, setAlreadyGetProjects] = useState(false);
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
        <ContainerProjects>
          <div className="wraper">
            {projects.map((item: any, index: number) => (
              <PostProfile 
                index={index}
                _id={item._id}
                name={item.name}
                photo={item.photo}
                countOfGoodIdea={item.CountOfGoodIdea}
                countOfActions={item.CountOfActions}
                screen={screens.HotProjects}
                key={item._id}/>
            ))} 
          </div>
        </ContainerProjects>
      </Container>
  )
}

export default Explorar;