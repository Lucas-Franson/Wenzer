import Cookies from 'js-cookie';
import { FormEvent, ReactElement, useLayoutEffect, useState } from 'react';
import { useEffect } from 'react';
import { AiFillFire } from 'react-icons/ai';
import { MdSearch } from 'react-icons/md';
import { useHistory } from 'react-router-dom';
import NoContent from '../../Components/Animation/NoContent';
import SplashScreen from '../../Components/Animation/SplashScreen';
import Button from '../../Components/Button';
import InputSearch from '../../Components/InputSearch';
import PostEmAlta from '../../Components/PostEmAlta';
import { toastfyError, toastfyWarning } from '../../Components/Toastfy';
import { screens, searchTypes } from '../../Constants/MediaSettings';
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
  const [searchWord, setSearchWord] = useState('');

  const { userInfo } = useAuth();

  const history = useHistory();

  function loadSearchFilter() {
    let searchForFilter = window.location.search;
    let filter = new URLSearchParams(searchForFilter);
    let getSearch = filter.get('search');

    return getSearch;
  }

  function getProjectsOnHigh(isMounted: boolean) {
    debugger;
    APIServiceAuthenticated.get(`/api/project/onhigh`, {
      headers: {
        auth: Cookies.get('WenzerToken')
      }
    }).then(res => {
      if (isMounted) {
        setObjects(res.data);
        setAlreadyGetProjects(true);
        setLoading(false);
        setIsFiltering(false);
      }

    }).catch(err => {
      toastfyError(err?.response?.data?.mensagem);
      if (isMounted) setLoading(false);
    })
  }

  function search(e: FormEvent, isMounted: boolean) {
    e.preventDefault();
    searchRequest(isMounted);
  }

  function searchRequest(isMounted: boolean) {
    if (isMounted) setLoading(true);
    if ((searchWord && !searchWord.trim()) || !searchWord) {
      setLoading(false);
      toastfyWarning("Preencha o campo de pesquisar.");
      return;
    }
    let filterByPerson = person ? "&types[]=0" : "";
    let filterByProject = project ? "&types[]=1" : "";
    let filterByPost = post ? "&types[]=2" : "";
    
    APIServiceAuthenticated.get(`/api/project/search?search=${searchWord}${filterByPerson}${filterByProject}${filterByPost}`, {
      headers: {
        auth: Cookies.get('WenzerToken')
      }
    }).then(res => {
      if (isMounted) {
        setObjects(res.data);
        setAlreadySearch(true);
        setLoading(false);
        setIsFiltering(true);
      }
    }).catch(err => {
      if (isFiltering) toastfyError(err?.response?.data?.mensagem);
      if (isMounted) {
        setLoading(false);
        getProjectsOnHigh(isMounted);
      }
    });
  }

  function setFilterState(post: boolean, project: boolean, person: boolean) {
    setPost(post);
    setProject(project);
    setPerson(person);
    setAlreadySearch(false);
  }

  function resetSearchWord(e: FormEvent) {
    e.preventDefault();
    setSearchWord('');
    setPerson(false);
    setProject(false);
    setPost(false);
    setAlreadySearch(false);
    getProjectsOnHigh(true);
    setIsFiltering(false);
    // history.push('/explore')
  }

  useEffect(() => {
    let isMounted = true;
    debugger;
    let filterParams = loadSearchFilter();
    if (filterParams) {
      if (!alreadySearch) {
        searchRequest(isMounted);
      }
      if (isMounted) setIsFiltering(true);
    } else {
      if(!alreadyGetProjects) {
        getProjectsOnHigh(isMounted);
      }
      if (isMounted) setIsFiltering(false);
    }
    return () => { isMounted = false }
  }, [alreadyGetProjects, alreadySearch]);

  return (
      <Container>
        <ContainerSearch>
          <form onSubmit={(e) => search(e, true)}>
            <InputSearch placeholder='Pesquisar' value={searchWord} onChange={(e) => setSearchWord(e.target.value)}/>
            <h4>Filtrar por:</h4>
            <div>
              <div>
                <input type="checkbox" checked={person} onChange={(e) => setFilterState(post, project, !person)} />
                <span>Pessoa</span>
              </div>
              <div>
                <input type="checkbox" checked={project} onChange={(e) => setFilterState(post, !project, person)} />
                <span>Projeto</span>
              </div>
              <div>
                <input type="checkbox" checked={post} onChange={(e) => setFilterState(!post, project, person)} />
                <span>Publicação</span>
              </div>
            </div>
            <Button className="svg" type="submit">
              Pesquisar
              <MdSearch size={22}/> 
            </Button>
            <Button className="onlyBorder svg" onClick={(e: any) => resetSearchWord(e)}>
              Em Alta
              <AiFillFire size={22}/> 
            </Button>
          </form>
        </ContainerSearch>

        {loading ? (
          <SplashScreen />
        ) : (
          <ContainerProjects>
            {objects.length === 0 ? (
              <div className='noContent'>
                <NoContent/>
                <span>Sua pesquisa não encontrou nenhum resultado.</span>
              </div>
            ) : (
              objects.map((item: any, index: number) => (
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
              ))
            )} 
          </ContainerProjects>
        )}
      </Container>
  )
}

export default Explorar;