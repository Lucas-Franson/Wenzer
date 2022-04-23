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
import { IProjectProps } from './interface';

export default function ModalProject({open, setOpen, idProject}: any) {
  const [imageToPost, setImageToPost] = useState<File>();
  const [previewImagePost, setPreviewImagePost] = useState('');
  const [titlePost, setTitlePost] = useState('');
  const [descriptionPost, setDescriptionPost] = useState('');
  const [typePost, setTypePost] = useState("1");
  const [isLoading, setIsLoading] = useState(false);
  const [project, setProject] = useState<IProjectProps>();
  const [viewing, setViewing] = useState(false);
  const [following, setFollowing] = useState(false);
  
  const [tagsOfProject, setTagOfProjects] = useState<{ label: string, value: string }[]>([]); 
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
    setTypePost("1");
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
    if (viewing) return;
    setImageToPost(undefined);
  }

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (project && userInfo?.id !== project?.userId) {
      toastfyError("Você não possui permissão para editar este projeto.");
      return;
    }

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

    if (idProject) {
      formData.append("_id", idProject);
      updateProject(formData);
    } else {
      createProject(formData);
    }
  }

  function createProject(formData: any) {
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

  function updateProject(formData: any) {
    APIServiceAuthenticated.put(`/api/project`, formData, {
      headers: {
        auth: Cookies.get('WenzerToken')
      }
    }).then(res => {
      toastfySuccess("Projeto editado com sucesso!");
      setIsLoading(false);
      handleClose();
    }).catch(err => {
      toastfyError(err?.response?.data?.mensagem);
      setIsLoading(false);
    });
  }

  function getAllInterests(isMounted: boolean) {
    APIServiceAuthenticated.get(`/api/getAllInterests`, {
      headers: {
        auth: Cookies.get('WenzerToken')
      }
    }).then(res => {
      if (isMounted) setInterests(res.data);
    }).catch(err => {
      toastfyError(err?.response?.data?.mensagem);
    });
  }

  function getProject(isMounted: boolean) {
    APIServiceAuthenticated.get(`/api/project/byid/${idProject}`, {
      headers: {
        auth: Cookies.get('WenzerToken')
      }
    }).then(res => {  
      if (!res.data) {
        toastfyError("Nenhum projeto encontrado.");
        handleClose();  
      }
      if (isMounted) {
        setProject(res.data);
        handleForm(res.data);
        if (res.data.userId != userInfo?.id) setViewing(true);
        else setViewing(false);
      }
    }).catch(err => {
      toastfyError(err?.response?.data?.mensagem);
      handleClose();
    });
  }

  function followProject(event: FormEvent) {
    event.preventDefault();
    
    if (isLoading) return;
    setIsLoading(true);

    APIServiceAuthenticated.post(`/api/project/follower`, { idProject }, {
      headers: {
        auth: Cookies.get('WenzerToken')
      }
    }).then(res => {
      setFollowing(!following);
      let message = !following ? "Você começou a seguir este projeto." : "Voce deixou de seguir este projeto.";
      toastfySuccess(message);
      setIsLoading(false);
    }).catch(err => {
      toastfyError(err?.response?.data?.mensagem);
      setIsLoading(false);
    });
  }

  function handleForm(project: IProjectProps) {
    let publicProject = JSON.parse(project.publicProject + "") ? "1" : "2";
    setTypePost(publicProject);
    setTitlePost(project.name);
    setDescriptionPost(project.description);
    setInterestsSelected(project.tags);
    setPaymentImpulsionamento(JSON.parse(project.marketing + ""));
    setFollowing(project.following);
    if (project.photo && typeof project.photo === 'object') {
      let base64 = `data:${project.photo.mimetype};base64, ${project.photo.data}`;
      let file = dataURLtoFile(base64, project.photo.name);
      setImageToPost(file);
      setPreviewImagePost(base64);
    }
  }

  function dataURLtoFile(dataurl: string, filename: string) {
    var arr: any = dataurl.split(',');
    if (arr && arr.length > 0) {
      var mime = arr[0]!.match(/:(.*?);/)[1],
      bstr = atob(arr[1]), 
      n = bstr.length, 
      u8arr = new Uint8Array(n);
          
      while(n--){
          u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, {type:mime});
    }
}

  useEffect(() => {
    let isMounted = true;
    if (isMounted) setViewing(false);
    if (idProject) {
      getProject(isMounted);
    }
    getAllInterests(isMounted);
    return () => { isMounted = false };
  }, [open]);

  const body = (
    <ContainerModal >
      <header>
        <h2>{viewing ? "Visualizando" : (idProject ? "Editando" : "Novo")} Projeto</h2>
        <MdClose onClick={handleClose} size={25} />
      </header>
      
      <main>
        <form>
          <div className="profile">
            <HeaderAvatar src={project ? project.user.photo : userInfo?.photo} />
            <select required disabled={viewing} defaultValue={typePost} onChange={(e) => setTypePost(e.target.value)}>
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
            <InputText 
              required 
              defaultValue={project?.name} 
              placeholder="Titulo" 
              disabled={viewing}
              onChange={(e: any) => 
                setTitlePost(e.target.value)
              } />
            <InputTextArea 
              required 
              defaultValue={project?.description} 
              placeholder="Qual a sua idéia?" 
              disabled={viewing}
              onChange={(e: any) => 
                setDescriptionPost(e.target.value)
              } />
            <InputAutoComplete 
              options={interests} 
              defaultValues={interestsSelected} 
              disabled={viewing}
              onchange={(e: any) => 
                setInterestsSelected(e)
              } />
            <div className="image">
                {imageToPost && (
                  <div className='imagePost' onClick={removeImage}>
                    <img src={previewImagePost} alt="postagem" />
                  </div>
                )}

              <div className="buttons-image" style={{ display: viewing ? 'none' : 'block' }}>
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
            <Button onClick={onSubmit} style={{ display: viewing ? 'none' : 'block' }}>
              {isLoading ? (
                <CircularProgress size={16} color="inherit" />
              ) : 
                idProject ? ("Editar") : ("Publicar")
              }
            </Button>
            <Button onClick={followProject} style={{ display: viewing ? 'block' : 'none' }}>
              {isLoading ? (
                <CircularProgress size={16} color="inherit" />
              ) : 
                following ? ( "Deixar de seguir projeto") : ("Seguir projeto")
              }
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