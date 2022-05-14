import { useState } from 'react';
import { AiOutlineBulb, AiOutlineTeam } from 'react-icons/ai';
import { useHistory } from 'react-router-dom';
import { screens, searchTypes } from '../../Constants/MediaSettings';
import { useWenzer } from '../../hooks/useWenzer';

import imageTeste from '../../Utils/image/bgFgtsDescktop.jpg';
import ModalProject from '../Modal/ModalProject';
import { Container, ContainerPostProject } from './styles';

const PostRecomendado = ({ index, _id, name, bio, type, photo, countGoodIdea, countFollowers, screen }: any) => {

  const [openModalProject, setOpenModalProject] = useState(false);
  const history = useHistory();
  const { setSearchKey, searchKey } = useWenzer();

  function handleLink() {
    if (type === searchTypes.People) {
      setSearchKey("");
      history.push(`/profile?user=${_id}`);
    } else if (type === searchTypes.Post) {
      setSearchKey("");
      history.push(`/post/${_id}`);
    } else if (type === searchTypes.Project) {
      setOpenModalProject(true);
    }
  }

  return (
    <Container>
      <ContainerPostProject onClick={handleLink}>
        <span style={{ display: screen === screens.HotProjects ? 'block' : 'none' }}>{index+1}º</span>
        <img src={photo && photo != '' ? (typeof photo === 'object' ? `data:${photo.mimetype};base64, ${photo.data}` : photo) : imageTeste} alt="project"/>
        <div className="containerContent">
          <h3>{name}</h3>
          {
            screen != screens.Search ? (
              <div className='ContainerAction'>
                <div className="action" title="Boa ideia">
                  <AiOutlineBulb size={20} className="idea"/> 
                  <span>{countGoodIdea ? countGoodIdea : 0}</span>
                </div>

                <div className="action" title="Seguidores">
                  <AiOutlineTeam size={20}/>  
                  <span>{countFollowers ? countFollowers : 0}</span>
                </div>
              </div>
            ) : (
              <div>
                <span>{bio && bio.length > 40 ? bio.substr(0, 38) + "..." : bio}</span>
              </div>
            )
          }
        </div>
      </ContainerPostProject>
      {
        type == searchTypes.Project && (
          <div style={{ display: openModalProject ? '' : 'none' }}>
            <ModalProject open={openModalProject} setOpen={setOpenModalProject} idProject={_id} />
          </div>
        )
      }
    </Container>
  )
}

export default PostRecomendado;