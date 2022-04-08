import Modal from '@material-ui/core/Modal';
import { useState, useRef, ChangeEvent, FormEvent} from 'react';
import { FaCheckDouble } from 'react-icons/fa';
import { MdClose, MdImage, MdPayment } from 'react-icons/md';
import { useWenzer } from '../../../hooks/useWenzer';
import { HeaderAvatar } from '../../../Pages/Feed/styles';
import Button from '../../Button';
import InputAutoComplete from '../../InputAutoComplete';
import InputText from '../../InputText';
import InputTextArea from '../../InputTextArea';
import ModalPayment from '../ModalPayment';
import { ContainerModal, Container } from '../styles';

export default function ModalProject({open, setOpen}: any) {
  const [imageToPost, setImageToPost] = useState<File>();
  const [previewImagePost, setPreviewImagePost] = useState('');
  const [titlePost, setTitlePost] = useState('');
  const [descriptionPost, setDescriptionPost] = useState('');
  const [typePost, setTypePost] = useState('1');

  const [openModalPayment, setOpenModalPayment] = useState(false);

  const filepickerRef = useRef<HTMLDivElement | any>(null);

  const {
    paymentImpulsionamento,
    setPaymentImpulsionamento,
  } = useWenzer();

  const handleClose = () => {
    setOpen(false);
    setImageToPost(undefined);
  };

  const handleCancelPayment = () => {
    setPaymentImpulsionamento(false);
  }

  const typesProjects = [
    {
      value: 1,
      label: 'Público'
    },
    {
      value: 2,
      label: 'Privado'
    },
  ];

  
  const stepsProject = [
    {
      value: 1,
      label: 'Novo'
    },
    {
      value: 2,
      label: 'Em desenvolvimento'
    },
    {
      value: 3,
      label: 'Concluído'
    },
  ];
  
  function handleOpenModalPayment() {
    if(paymentImpulsionamento) {
      return;
    }
    setOpenModalPayment(true);
  }

  const addImageToPost = (event: ChangeEvent<HTMLInputElement>) => {
    if(!event.target.files){
      return;
    }

    setImageToPost(event.target.files[0]);
    const selectedImagesPreview = URL.createObjectURL(event.target.files[0]);
    setPreviewImagePost(selectedImagesPreview);
  }

  const removeImage = () => {
    setImageToPost(undefined);
  }

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
    <ContainerModal >
      <header>
        <h2>Novo Projeto</h2>
        <MdClose onClick={handleClose} size={25} />
      </header>
      
      <main>
        <form onSubmit={onSubmit}>
          <div className="profile">
            <HeaderAvatar />
            <select required onChange={(e) => setTypePost(e.target.value)}>
              {typesProjects.map(item => (
                <option value={item.value} key={item.value}>{item.label}</option>
              ))}
            </select>
            <select required onChange={(e) => setTypePost(e.target.value)}>
              {stepsProject.map(item => (
                <option value={item.value} key={item.value}>{item.label}</option>
              ))}
            </select>
            <div className='payment-check'>
              {paymentImpulsionamento && (
                <>
                  <FaCheckDouble size={22} />
                  <span>Impulsionado</span>
                </>
              )}
            </div>
          </div>

          <div className="content">
            <InputText required placeholder="Titulo" onChange={(e: any) => setTitlePost(e.target.value)} />
            <InputTextArea required placeholder="Qual a sua idéia?" onChange={(e: any) => setDescriptionPost(e.target.value)}/>
            <InputAutoComplete />
            <div className="image">
              <div onClick={() => filepickerRef.current.click()}>
                <MdImage size={25} />
                <span>Foto</span>
                <input
                  type='file'
                  onChange={addImageToPost}
                  ref={filepickerRef}
                  hidden
                />
              </div>

              {imageToPost && (
                <div className='imagePost' onClick={removeImage}>
                  <img src={previewImagePost} alt="postagem" />
                </div>
              )}

              <div onClick={handleOpenModalPayment}>
                <MdPayment size={22}/>
                {paymentImpulsionamento ? (
                  <span onClick={handleCancelPayment}>Cancelar Impulsionamento</span>
                ) : (
                  <span>Impulsionar</span>
                )}
              </div>
              
            </div>
            <Button>Publicar</Button>
          </div>
        </form>
      </main>
    </ContainerModal>
  )

  return (
    <Container className={open ? '' : "displayNone"}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
       {body}
      </Modal>
      <ModalPayment open={openModalPayment} setOpen={setOpenModalPayment}/>
    </Container>
  );
}