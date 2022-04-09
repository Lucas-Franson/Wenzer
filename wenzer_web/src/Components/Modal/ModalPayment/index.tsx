import Modal from '@material-ui/core/Modal';
import { useState, FormEvent} from 'react';
import { MdClose, MdSecurity } from 'react-icons/md';
import Button from '../../Button';
import InputText from '../../InputText';
import { ContainerModal, Container } from '../styles';
import mastercard from '../../../Utils/image/mastercard.png';
import { useWenzer } from '../../../hooks/useWenzer';

export default function ModalPayment({open, setOpen}: any) {
  const [imageToPost, setImageToPost] = useState<File>();
  const [impulsionamento, setImpulsionamento] = useState(0);
  const { setPaymentImpulsionamento } = useWenzer();

  const handleClose = () => {
    setOpen(false);
    setImageToPost(undefined);
  };

  const handleSetPayment = () => {
    setOpen(false);
    setImageToPost(undefined);
    setPaymentImpulsionamento(true);
  };
  
  const typeImpulsionamento = [
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

  function getTypePayment(type: number) {
    switch(type) {
      case 2:
        return 'R$ 19,90 - renovação automática';
      case 3:
        return 'R$ 29,90 - renovação automática';
      case 4:
        return 'R$ 35,90 - renovação automática';
      default :
        return 'Selecione um tipo de impulsionamento';

    }
  }

  const body = (
    <ContainerModal className='payment'>
      <header>
        <h2>Impulsionar Projeto</h2>
        <MdClose onClick={handleClose} size={25} />
      </header>
      
      <main>
          <div className="profile">
            <select required onChange={e => setImpulsionamento(Number(e.target.value))}>
              {typeImpulsionamento.map(item => (
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

            <div className='payment-value'>{getTypePayment(impulsionamento)}</div>

            <div className="buttons">
              <Button>Cancelar</Button>
              <Button className="payment-button" type="button" onClick={handleSetPayment}>Impulsionar</Button>
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