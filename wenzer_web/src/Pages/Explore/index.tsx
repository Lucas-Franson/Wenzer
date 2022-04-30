import Cookies from 'js-cookie';
import React, { ReactElement, useState } from 'react';
import { useEffect } from 'react';
import { MdSearch } from 'react-icons/md';
import Button from '../../Components/Button';
import PostProfile from '../../Components/PostProfile';
import { toastfyError } from '../../Components/Toastfy';
import { screens, searchTypes } from '../../Constants/MediaSettings';
import APIServiceAuthenticated from '../../Services/api/apiServiceAuthenticated';
import { useAuth } from '../../Services/Authentication/auth';

import { Container, ContainerProjects, ContainerSearch } from './styles';

function Explorar(): ReactElement {
  const [objects, setObjects] = useState([]);
  const [alreadyGetProjects, setAlreadyGetProjects] = useState(false);
  const [person, setPerson] = useState(false);
  const [project, setProject] = useState(false);
  const [post, setPost] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);
  const { userInfo } = useAuth();

  function loadSearchFilter() {
    let searchForFilter = window.location.search;
    let filter = new URLSearchParams(searchForFilter);
    let getSearch = filter.get('search');

    return getSearch;
  }

  function getProjectsOnHigh(userId: string) {
    APIServiceAuthenticated.get(`/api/project/onhigh`, {
      headers: {
        auth: Cookies.get('WenzerToken')
      }
    }).then(res => {
      setObjects(res.data);
      setAlreadyGetProjects(true);

    }).catch(err => {
      toastfyError(err?.response?.data?.mensagem);
    })
  }

  useEffect(() => {
    let search = loadSearchFilter();
    if (search) {
      setIsFiltering(true);
    } else {
      if(!alreadyGetProjects) {
        getProjectsOnHigh(userInfo?.id!);
      }
      setIsFiltering(false);
    }
  });

  return (
      <Container>
        <ContainerSearch style={{ display: isFiltering ? 'block' : 'none' }}>
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

        <div className='ButtonSearch' style={{ display: isFiltering ? 'block' : 'none' }}>
          <Button className="flex button-search">
            Pesquisar
            <MdSearch size={20}/>
          </Button>
        </div>

        <ContainerProjects>
          <div className="wraper">
            {objects.map((item: any, index: number) => (
              <PostProfile 
                index={index}
                _id={item._id}
                name={item.name}
                bio={item.bio}
                type={item.type}
                photo={item.photo}
                countGoodIdea={item.countGoodIdea}
                countFollowers={item.countFollowers}
                screen={isFiltering ? screens.Search : screens.HotProjects}
                key={item._id}/>
            ))} 
          </div>
        </ContainerProjects>
      </Container>
  )
}

export default Explorar;