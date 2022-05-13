import Cookies from 'js-cookie';
import React, { ReactElement, useState } from 'react';
import { useEffect } from 'react';
import { MdSearch } from 'react-icons/md';
import Button from '../../Components/Button';
import PostProfile from '../../Components/PostProfile';
import { toastfyError } from '../../Components/Toastfy';
import { screens, searchTypes } from '../../Constants/MediaSettings';
import { useWenzer } from '../../hooks/useWenzer';
import APIServiceAuthenticated from '../../Services/api/apiServiceAuthenticated';
import { useAuth } from '../../Services/Authentication/auth';

import { Container, ContainerProjects, ContainerSearch } from './styles';

function Explorar(): ReactElement {
  const [objects, setObjects] = useState([]);
  const [alreadyGetProjects, setAlreadyGetProjects] = useState(false);
  const [alreadySearch, setAlreadySearch] = useState(false);
  const [person, setPerson] = useState(false);
  const [project, setProject] = useState(false);
  const [post, setPost] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);
  const { userInfo } = useAuth();
  const { setSearchKey, searchKey } = useWenzer();

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

  function search() {
    let filterByPerson = person ? "&types[]=0" : "";
    let filterByProject = project ? "&types[]=1" : "";
    let filterByPost = post ? "&types[]=2" : "";
    APIServiceAuthenticated.get(`/api/project/search?search=${loadSearchFilter()}${filterByPerson}${filterByProject}${filterByPost}`, {
      headers: {
        auth: Cookies.get('WenzerToken')
      }
    }).then(res => {
      setObjects(res.data);
      setAlreadySearch(true);

    }).catch(err => {
      toastfyError(err?.response?.data?.mensagem);
    })
  }

  function setFilterState(post: boolean, project: boolean, person: boolean) {
    setPost(post);
    setProject(project);
    setPerson(person);
    setAlreadySearch(false);
  }

  useEffect(() => {
    let filterParams = loadSearchFilter();
    if (filterParams) {
      if (!alreadySearch) {
        search();
      }
      setIsFiltering(true);
    } else {
      if(!alreadyGetProjects) {
        getProjectsOnHigh(userInfo?.id!);
      }
      setIsFiltering(false);
    }
  }, [alreadyGetProjects, alreadySearch]);

  return (
      <Container>
        <ContainerSearch style={{ display: isFiltering ? 'block' : 'none' }}>
          <h4>Filtrar por:</h4>
          <div>
            <div>
              <input type="checkbox" onChange={(e) => setFilterState(post, project, !person)} />
              <span>Pessoa</span>
            </div>
            <div>
              <input type="checkbox" onChange={(e) => setFilterState(post, !project, person)} />
              <span>Projeto</span>
            </div>
            <div>
              <input type="checkbox" onChange={(e) => setFilterState(!post, project, person)} />
              <span>Publicação</span>
            </div>
          </div>
        </ContainerSearch>

        <ContainerProjects>
          <div className="wraper">
            {objects.map((item: any, index: number) => (
              <PostProfile 
                index={index}
                _id={item._id}
                name={item.name}
                bio={item.bio}
                type={item.type ?? searchTypes.Project}
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