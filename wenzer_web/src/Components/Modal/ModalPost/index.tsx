import Modal from '@material-ui/core/Modal';
import { MdClose, MdImage } from 'react-icons/md';
import { HeaderAvatar } from '../../../Pages/Feed/styles';
import Button from '../../Button';
import InputTextArea from '../../InputTextArea';
import { ContainerModal, Container } from './styles';


export default function ModalPost({open, setOpen}: any) {

  const handleClose = () => {
    setOpen(false);
  };

  const typesProjects = [
    {
      value: 1,
      label: 'Público'
    },
    {
      value: 2,
      label: 'Privado'
    },
  ]

  const body = (
    <ContainerModal >
      <header>
        <h2>Novo Projeto</h2>
        <MdClose onClick={handleClose} size={25} />
      </header>
      
      <main>
        <div className="profile">
          <HeaderAvatar />
          <select>
            {typesProjects.map(item => (
              <option value={item.value} key={item.value}>{item.label}</option>
            ))}
          </select>
        </div>

        <div className="content">
          <InputTextArea required placeHolder="Qual a sua idéia?"/>
          <div className="image">
            <div>
              <MdImage size={25} />
              <span>Foto/Vídeo</span>
            </div>
          
          </div>
          <Button>Publicar</Button>
        </div>
      </main>
    </ContainerModal>
  )

  return (
    <Container>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
       {body}
      </Modal>
    </Container>
  );
}