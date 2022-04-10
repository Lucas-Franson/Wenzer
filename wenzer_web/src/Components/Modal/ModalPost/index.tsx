import Modal from '@material-ui/core/Modal';
import { useState, useRef, ChangeEvent, FormEvent} from 'react';
import { MdClose, MdImage } from 'react-icons/md';
import { HeaderAvatar } from '../../../Pages/Feed/styles';
import APIServiceAuthenticated from '../../../Services/api/apiServiceAuthenticated';
import { useAuth } from '../../../Services/Authentication/auth';
import Button from '../../Button';
import InputText from '../../InputText';
import InputTextArea from '../../InputTextArea';
import { ContainerModal, Container } from '../styles';
import Cookies from "js-cookie";
import { toastfyError, toastfySuccess, toastfyWarning } from '../../Toastfy';
import { useEffect } from 'react';
import { CircularProgress } from '@material-ui/core';

export default function ModalPost({open, setOpen}: any) {
  const [imageToPost, setImageToPost] = useState<File>();
  const [previewImagePost, setPreviewImagePost] = useState('');
  const [titlePost, setTitlePost] = useState('');
  const [descriptionPost, setDescriptionPost] = useState('');
  const [typePost, setTypePost] = useState('1');
  const [projectSelected, setProjectSelected] = useState("0");
  const [allProject, setAllProject] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { userInfo } = useAuth();

  const filepickerRef = useRef<HTMLDivElement | any>(null);

  const handleClose = () => {
    setOpen(false);

    setImageToPost(undefined);
    setPreviewImagePost('');
    setTitlePost('');
    setDescriptionPost('');
    setTypePost('1');
    setProjectSelected('0');
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
  ];

  function getAllProjects() { 
    if (!open) return;

    APIServiceAuthenticated.get(`/api/project/${userInfo?.id}`, {
      headers: {
        auth: Cookies.get('WenzerToken')
      }
    }).then(res => {
      if (res.data.length > 0) {
        setAllProject(res.data);
        if (res.data.length == 1) {
          setProjectSelected(res.data[0]._id);
        }
      } else {
        setAllProject([{ name: "Nenhum projeto criado.", _id: "0" }]);
        setProjectSelected("0");
      }

    }).catch(err => {
      toastfyError(err?.response?.data?.mensagem);
    });
  }

  useEffect(() => {
    getAllProjects();
  }, [open]);

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

    if (!projectSelected || projectSelected == "0") {
      toastfyWarning("Selecione algum projeto para continuar.");
      return;
    }

    setIsLoading(true);
    var publicPost = typePost == "1";

    const formData = new FormData();
    formData.append("title", titlePost);
    formData.append("description", descriptionPost);
    formData.append("publicPost", publicPost ? "true" : "false");
    formData.append("photo", imageToPost == undefined ? "" : imageToPost);
    formData.append("idProject", projectSelected);

    APIServiceAuthenticated.post(`/api/project/post`, formData, {
      headers: {
        auth: Cookies.get('WenzerToken')
      }
    }).then(res => {
      toastfySuccess("Publicação efetuada com sucesso!");
      setIsLoading(false);
      setOpen(false);
    }).catch(err => {
      setIsLoading(false);
      toastfyError(err?.response?.data?.mensagem);
    });
  }

  const body = (
    <ContainerModal >
      <header>
        <h2>Nova Publicação</h2>
        <MdClose onClick={handleClose} size={25} />
      </header>
      
      <main>
        <form onSubmit={onSubmit}>
          <div className="profile">
            <HeaderAvatar src={userInfo?.photo} />
            <select required defaultValue={typePost} onChange={(e) => setTypePost(e.target.value)}>
              {typesProjects.map(item => (
                <option value={item.value} key={item.value}>{item.label}</option>
              ))}
            </select>
            <select required defaultValue={projectSelected} onChange={(e) => setProjectSelected(e.target.value)}>
              {allProject.map(item => (
                <option value={item._id} key={item._id}>{item.name}</option>
              ))}
            </select>
          </div>

          <div className="content">
            <InputText required placeholder="Titulo" maxLength={80} onChange={(e: any) => setTitlePost(e.target.value)} />
            <InputTextArea required placeholder="Qual a sua idéia?" maxLength={1000} onChange={(e: any) => setDescriptionPost(e.target.value)}/>

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