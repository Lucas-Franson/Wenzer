import React from 'react';
import { useState } from 'react';
import { AiOutlineBulb, AiOutlineTeam } from 'react-icons/ai';

import imageTeste from '../../Utils/image/bgFgtsDescktop.jpg';
import ModalProject from '../Modal/ModalProject';
import { Container, ContainerPostProject } from './styles';

const PostProfile = ({ index, id, name, photo, countOfGoodIdea, countOfActions}: any) => {

  const [openModalProject, setOpenModalProject] = useState(false);

  function handleOpenModalProject() {
    setOpenModalProject(true);
  }

  return (
    <ContainerPostProject onClick={handleOpenModalProject}>
      <span>{index+1}º</span>
      <img src={imageTeste} alt="project"/>
      <div className="containerContent">
        <h3>{name}</h3>
        <div className='ContainerAction'>
          <div className="action" title="Boa ideia">
            <AiOutlineBulb size={20} className="idea"/> 
            <span>{countOfGoodIdea}</span>
          </div>

          <div className="action" title="Seguidores">
            <AiOutlineTeam size={20}/>  
            <span>{countOfActions}</span>
          </div>
        </div>
      </div>
      <div style={{ display: openModalProject ? '' : 'none' }}>
        <ModalProject open={openModalProject} setOpen={setOpenModalProject} />
      </div>
    </ContainerPostProject>
  )
}

export default PostProfile;