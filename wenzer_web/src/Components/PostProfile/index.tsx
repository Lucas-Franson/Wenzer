import { useState } from 'react';
import { AiOutlineBulb, AiOutlineTeam } from 'react-icons/ai';
import { screens } from '../../Constants/MediaSettings';

import imageTeste from '../../Utils/image/bgFgtsDescktop.jpg';
import ModalProject from '../Modal/ModalProject';
import { Container, ContainerPostProject } from './styles';

const PostProfile = ({ index, _id, name, bio, type, photo, countGoodIdea, countFollowers, screen }: any) => {

  const [openModalProject, setOpenModalProject] = useState(false);

  function handleOpenModalProject() {
    setOpenModalProject(true);
  }

  return (
    <Container>
      <ContainerPostProject onClick={handleOpenModalProject}>
        <span style={{ display: screen === screens.HotProjects ? 'block' : 'none' }}>{index+1}º</span>
        <img src={photo && typeof photo === 'object' ? `data:${photo.mimetype};base64, ${photo.data}` : imageTeste} alt="project"/>
        <div className="containerContent">
          <h3>{name}</h3>
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
        </div>
      </ContainerPostProject>
      <div style={{ display: openModalProject ? '' : 'none' }}>
        <ModalProject open={openModalProject} setOpen={setOpenModalProject} idProject={_id} />
      </div>
    </Container>
  )
}

export default PostProfile;