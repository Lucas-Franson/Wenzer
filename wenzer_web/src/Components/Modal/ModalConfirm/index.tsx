import { CircularProgress } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import Cookies from 'js-cookie';
import { ChangeEvent, useState } from 'react';
import { MdClose } from 'react-icons/md';
import APIServiceAuthenticated from '../../../Services/api/apiServiceAuthenticated';
import Button from '../../Button';
import { toastfyError, toastfySuccess } from '../../Toastfy';
import { ContainerModal, Container } from '../styles';

export default function ModalConfirm({open, setOpen, setConfirm, title, url}: any) {

  const handleClose = () => {
    setOpen(false);
  };
  const [isLoading, setIsLoading] = useState(false);

  function action(event: ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    if (url && url.trim() != "") {
      setIsLoading(true);

      APIServiceAuthenticated.delete(url, {
        headers: {
          auth: Cookies.get('WenzerToken')
        }
      }).then(res => {
        toastfySuccess("Ação realizada com sucesso!");
        setConfirm();
        setIsLoading(false);
        handleClose();
      }).catch(err => {
        toastfyError(err?.response?.data?.mensagem);
        setIsLoading(false);
      });
    } 
    else {
      toastfyError("URL não pode ser vazia para a requisição");
      return;
    }
  }
  
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
              <Button className="deleteYes" onClick={action}>
                {isLoading ? (
                  <CircularProgress size={16} color="inherit" />
                ) : 
                  "Excluir"
                }
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