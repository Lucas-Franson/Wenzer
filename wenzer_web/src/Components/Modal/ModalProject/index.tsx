import Modal from '@material-ui/core/Modal';
import { useState, useRef, ChangeEvent, FormEvent, useEffect} from 'react';
import { FaCheckDouble } from 'react-icons/fa';
import { MdClose, MdImage, MdPayment } from 'react-icons/md';
import { useWenzer } from '../../../hooks/useWenzer';
import { HeaderAvatar } from '../../../Pages/Feed/styles';
import APIServiceAuthenticated from '../../../Services/api/apiServiceAuthenticated';
import { useAuth } from '../../../Services/Authentication/auth';
import Button from '../../Button';
import InputAutoComplete from '../../InputAutoComplete';
import InputText from '../../InputText';
import InputTextArea from '../../InputTextArea';
import ModalPayment from '../ModalPayment';
import { ContainerModal, Container } from '../styles';
import Cookies from 'js-cookie';
import { toastfyError, toastfySuccess, toastfyWarning } from '../../Toastfy';
import { CircularProgress } from '@material-ui/core';

export default function ModalProject({open, setOpen}: any) {
  const [imageToPost, setImageToPost] = useState<File>();
  const [previewImagePost, setPreviewImagePost] = useState('');
  const [titlePost, setTitlePost] = useState('');
  const [descriptionPost, setDescriptionPost] = useState('');
  const [typePost, setTypePost] = useState("1");
  const [isLoading, setIsLoading] = useState(false);
  
  const [interests, setInterests] = useState<{ label: string, value: string }[]>([]);
  const [interestsSelected, setInterestsSelected] = useState<{ label: string, value: string }[]>([]);

  const [openModalPayment, setOpenModalPayment] = useState(false);

  const filepickerRef = useRef<HTMLDivElement | any>(null);

  const { userInfo } = useAuth();

  const {
    paymentImpulsionamento,
    setPaymentImpulsionamento,
  } = useWenzer();

  const handleClose = () => {
    setOpen(false);
    setImageToPost(undefined);
    setPreviewImagePost('');
    setTitlePost("");
    setDescriptionPost("");
    setInterestsSelected([]);
    setPaymentImpulsionamento(false);
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

    const fileMB = event.target.files[0].size / 1024 / 1024;
    if (fileMB > 1) {
      toastfyError("Tamanho da foto deve ser menor que 1MB.");
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

    if (isLoading) return;
    setIsLoading(true);

    if (titlePost == "") {
      toastfyWarning("Titulo deve ser preenchido.");
      setIsLoading(false);
      return;
    }

    if (descriptionPost == "") {
      toastfyWarning("Descrição deve ser preenchida.");
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("name", titlePost);
    formData.append("description", descriptionPost);
    formData.append("photo", imageToPost == undefined ? "" : imageToPost);
    formData.append("active", "true");
    formData.append("publicProject", typePost == "1" ? "true" : "false");
    formData.append("marketing", paymentImpulsionamento ? "true" : "false");
    formData.append("tags", JSON.stringify(interestsSelected));

    APIServiceAuthenticated.post(`/api/project`, formData, {
      headers: {
        auth: Cookies.get('WenzerToken')
      }
    }).then(res => {
      toastfySuccess("Projeto criado com sucesso!");
      setIsLoading(false);
      handleClose();
    }).catch(err => {
      toastfyError(err?.response?.data?.mensagem);
      setIsLoading(false);
    });
  }

  function getAllInterests() {
    APIServiceAuthenticated.get(`/api/getAllInterests`, {
      headers: {
        auth: Cookies.get('WenzerToken')
      }
    }).then(res => {
      setInterests(res.data);
    }).catch(err => {
      toastfyError(err?.response?.data?.mensagem);
    })
  }

  useEffect(() => {
    getAllInterests();
  }, []);

  const body = (
    <ContainerModal >
      <header>
        <h2>Novo Projeto</h2>
        <MdClose onClick={handleClose} size={25} />
      </header>
      
      <main>
        <form onSubmit={onSubmit}>
          <div className="profile">
            <HeaderAvatar src={userInfo?.photo} />
            <select required onChange={(e) => setTypePost(e.target.value)}>
              {typesProjects.map(item => (
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
            <InputAutoComplete options={interests} defaultValues={interestsSelected} onchange={(e: any) => setInterestsSelected(e)} />
            <div className="image">
                {imageToPost && (
                  <div className='imagePost' onClick={removeImage}>
                    <img src={previewImagePost} alt="postagem" />
                  </div>
                )}

              <div className="buttons-image">
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

                <div onClick={handleOpenModalPayment}>
                  <MdPayment size={22}/>
                  {paymentImpulsionamento ? (
                    <span onClick={handleCancelPayment}>Cancelar Impulsionamento</span>
                  ) : (
                    <span>Impulsionar</span>
                  )}
                </div>
              </div>              
            </div>
            <Button>
              {isLoading ? (
                <CircularProgress size={16} color="inherit" />
              ) : (
                "Publicar"
              )}
            </Button>
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