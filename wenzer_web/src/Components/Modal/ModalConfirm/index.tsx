import Modal from '@material-ui/core/Modal';
import { MdClose } from 'react-icons/md';
import Button from '../../Button';
import { ContainerModal, Container } from '../styles';

export default function ModalConfirm({open, setOpen, title}: any) {

  const handleClose = () => {
    setOpen(false);
  };
  
  const body = (
    <ContainerModal className='payment'>
      <header>
        <h2>Confirmar</h2>
        <MdClose onClick={handleClose} size={25} />
      </header>
      
      <main>
         <div className="ConfirmarDeleteModal">
           <p>Excluir {title} ? </p>
           <span>Essa ação não poderá ser desfeita</span>
           <div className="buttonDelete">
             <Button className="deleteNo noHover" onClick={handleClose}>
               Cancelar
             </Button>
             <Button className="deleteYes">
               Excluir
             </Button>
           </div>

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