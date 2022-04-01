import Modal from '@material-ui/core/Modal';
import { useState, FormEvent} from 'react';
import { MdClose, MdSecurity } from 'react-icons/md';
import Button from '../../Button';
import InputText from '../../InputText';
import { ContainerModal, Container } from '../styles';
import mastercard from '../../../Utils/image/mastercard.png';

export default function ModalPayment({open, setOpen}: any) {
  const [imageToPost, setImageToPost] = useState<File>();
  const [titlePost, setTitlePost] = useState('');
  const [descriptionPost, setDescriptionPost] = useState('');
  const [typePost, setTypePost] = useState('1');

  const handleClose = () => {
    setOpen(false);
    setImageToPost(undefined);
  };

  const allProject = [
    {
      value: 1,
      label: 'Tipo de impulsionamento'
    },
    {
      value: 2,
      label: 'mensal'
    },
    {
      value: 3,
      label: 'semestral'
    },
    {
      value: 4,
      label: 'anual'
    },
  ];

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const body = {
      title: titlePost,
      description: descriptionPost,
      type: typePost,
      image: imageToPost
    }

    console.log(body);
  }

  const body = (
    <ContainerModal className='payment'>
      <header>
        <h2>Impulsionar Projeto</h2>
        <MdClose onClick={handleClose} size={25} />
      </header>
      
      <main>
        <form onSubmit={onSubmit}>
          <div className="profile">
            <select required onChange={(e) => setTypePost(e.target.value)}>
              {allProject.map(item => (
                <option value={item.value} key={item.value}>{item.label}</option>
              ))}
            </select>
            <MdSecurity size={22}/>
            <span>Compra Segura</span>
            <img className='credicard' src={mastercard} alt="mastercard"/>
          </div>

          <div className="content">
            <InputText required placeholder="Número do cartão" />
            <InputText required placeholder="Nome do titular" />
            <div className="buttons">
              <InputText required placeholder="Mês" />
              <InputText required placeholder="Ano" />
              <InputText required placeholder="CVV" />
            </div>

            <div className="buttons">
              <Button>Cancelar</Button>
              <Button className="payment-button">Impulsionar</Button>
            </div>
          </div>
        </form>
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