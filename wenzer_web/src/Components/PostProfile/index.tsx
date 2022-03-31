import React from 'react';
import { AiOutlineBulb, AiOutlineComment } from 'react-icons/ai';

import imageTeste from '../../Utils/image/bgFgtsDescktop.jpg';
import { ContainerPostProject } from './styles';

const PostProfile = ({ index, id, name, photo, countBulb, countComments}: any) => {

  return (
    <ContainerPostProject>
      <span>{index+1}</span>
      <img src={imageTeste} alt="project"/>
      <div className="containerContent">
        <h3>{name}</h3>
        <div className='ContainerAction'>
          <div className="action">
            <AiOutlineBulb size={20} className="idea"/> 
            <span>{countBulb}</span>
          </div>

          <div className="action">
            <AiOutlineComment size={20}/>  
            <span>{countComments}</span>
          </div>
        </div>
      </div>
    </ContainerPostProject>
  )
}

export default PostProfile;