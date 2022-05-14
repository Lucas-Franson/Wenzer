import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import imageTeste from '../../Utils/image/bgFgtsDescktop.jpg';
import ModalProject from '../Modal/ModalProject';
import { Container, ContainerPostProject } from './styles';

const PostRecomendado = ({ _id, name, bio, photo }: any) => {

  const [openModalProject, setOpenModalProject] = useState(false);
  const history = useHistory();

  function handleLink() {
    setOpenModalProject(true);
  }

  return (
    <Container>
      <ContainerPostProject onClick={handleLink}>
        <img src={photo && photo != '' ? (typeof photo === 'object' ? `data:${photo.mimetype};base64, ${photo.data}` : photo) : imageTeste} alt="project"/>
        <div className="containerContent">
          <h3>{name}</h3>
          <div>
            <span>{bio && bio.length > 40 ? bio.substr(0, 38) + "..." : bio}</span>
          </div>
        </div>
      </ContainerPostProject>
      {
        <div style={{ display: openModalProject ? '' : 'none' }}>
          <ModalProject open={openModalProject} setOpen={setOpenModalProject} idProject={_id} />
        </div>
      }
    </Container>
  )
}

export default PostRecomendado;