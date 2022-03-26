import React from 'react';
import { AiOutlineBulb, AiOutlineComment } from 'react-icons/ai';

import imageTeste from '../../Utils/image/bgFgtsDescktop.jpg';
import { ContainerPostProject } from './styles';

const PostProfile: React.FC = () => {
  return (
    <ContainerPostProject>
    <img src={imageTeste} alt="project"/>
    <div className="containerContent">
      <h3>Titulo que devera ser maior que a telasdasdasasdasdasdasdasdasddasasdasddasasdasddasasdasddasasdasddasasdasddasasdasddasdasdasdasda</h3>
      <div className='ContainerAction'>
        <div className="action">
          <AiOutlineBulb size={20} className="idea"/> 
          <span>15</span>
        </div>

        <div className="action">
          <AiOutlineComment size={20}/>  
          <span>15</span>
        </div>
      </div>
    </div>
  </ContainerPostProject>
  )
}

export default PostProfile;