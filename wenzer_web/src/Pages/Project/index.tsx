import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { useEffect } from 'react';
import NoContent from '../../Components/Animation/NoContent';
import SplashScreen from '../../Components/Animation/SplashScreen';
import PostProfile from '../../Components/PostEmAlta';
import { toastfyError } from '../../Components/Toastfy';
import { screens, searchTypes } from '../../Constants/MediaSettings';
import APIServiceAuthenticated from '../../Services/api/apiServiceAuthenticated';
import { useAuth } from '../../Services/Authentication/auth';

import { Container, ContainerProjects } from './styles';

const Projetos: React.FC = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const { userInfo } = useAuth();
  const [splashScreenActive, setSplashScreenActive] = useState(true);

  function getProjects() {
    APIServiceAuthenticated.get(`/api/project/${userInfo?.id}`, {
      headers: {
        auth: Cookies.get('WenzerToken')
      }
    }).then(res => {
      setProjects(res.data);
      setSplashScreenActive(false);
    }).catch(err => {
      toastfyError(err?.response?.data?.mensagem);
      setSplashScreenActive(false);
    });
  }

  useEffect(() => {
    if (userInfo) getProjects();
  }, []);

  return (
    <Container>
      {splashScreenActive ? (
        <SplashScreen />
      ) : (
        <ContainerProjects>
          {projects.length > 0 ? (
            projects.map((item: any, index: number) => (
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
            ))
          ) : (
            <div className='noContent'>
              <NoContent/>
              <span>Você ainda não criou nenhum projeto.</span>
            </div>
          )}
        </ContainerProjects>
      )}
    </Container>
  )
}

export default Projetos;