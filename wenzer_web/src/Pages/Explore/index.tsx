import Cookies from 'js-cookie';
import { ReactElement, useLayoutEffect, useState } from 'react';
import { useEffect } from 'react';
import { AiFillFire } from 'react-icons/ai';
import { useHistory } from 'react-router-dom';
import SplashScreen from '../../Components/Animation/SplashScreen';
import Button from '../../Components/Button';
import PostEmAlta from '../../Components/PostEmAlta';
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
  const [loading, setLoading] = useState(true);

  const { searchKey, setIsSearching, setSearchKey } = useWenzer();
  const { userInfo } = useAuth();

  const history = useHistory();

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
      setLoading(false);

    }).catch(err => {
      toastfyError(err?.response?.data?.mensagem);
      setLoading(false);
    })
  }

  function search() {
    let filterByPerson = person ? "&types[]=0" : "";
    let filterByProject = project ? "&types[]=1" : "";
    let filterByPost = post ? "&types[]=2" : "";
    
    APIServiceAuthenticated.get(`/api/project/search?search=${searchKey}${filterByPerson}${filterByProject}${filterByPost}`, {
      headers: {
        auth: Cookies.get('WenzerToken')
      }
    }).then(res => {
      setObjects(res.data);
      setAlreadySearch(true);
      setLoading(false);

    }).catch(err => {
      toastfyError(err?.response?.data?.mensagem);
      setLoading(false);
    })
  }

  function setFilterState(post: boolean, project: boolean, person: boolean) {
    setPost(post);
    setProject(project);
    setPerson(person);
    setAlreadySearch(false);
  }

  function resetSearchKey() {
    setSearchKey('');
    history.push('/explore')
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
  }, [alreadyGetProjects, alreadySearch, searchKey]);

  return (
      <Container>
        <ContainerSearch style={{ display: isFiltering ? '' : 'none' }}>
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
          <Button className="svg" onClick={resetSearchKey}>
            Projetos Em Alta
            <AiFillFire size={30}/> 
          </Button>
        </ContainerSearch>

        {loading ? (
          <SplashScreen />
        ) : (
          <ContainerProjects>
            {objects.map((item: any, index: number) => (
              <PostEmAlta 
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
          </ContainerProjects>
        )}
      </Container>
  )
}

export default Explorar;