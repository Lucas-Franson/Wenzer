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
import { toastfyError } from '../../Components/Toastfy';
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

  function getProjectsOnHigh() {
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

  function search(event?: FormEvent) {
    event?.preventDefault();
    setLoading(true);
    let filterByPerson = person ? "&types[]=0" : "";
    let filterByProject = project ? "&types[]=1" : "";
    let filterByPost = post ? "&types[]=2" : "";
    
    APIServiceAuthenticated.get(`/api/project/search?search=${searchWord}${filterByPerson}${filterByProject}${filterByPost}`, {
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
      getProjectsOnHigh();
    })
  }

  function setFilterState(post: boolean, project: boolean, person: boolean) {
    setPost(post);
    setProject(project);
    setPerson(person);
    setAlreadySearch(false);
  }

  function resetSearchWord() {
    setSearchWord('');
    setPerson(false);
    setProject(false);
    setPost(false);
    setAlreadySearch(false);
    getProjectsOnHigh()
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
        getProjectsOnHigh();
      }
      setIsFiltering(false);
    }
  }, [alreadyGetProjects, alreadySearch]);

  return (
      <Container>
        <ContainerSearch>
          <form onSubmit={search}>
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
            <Button className="onlyBorder svg" onClick={resetSearchWord}>
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