import Modal from '@material-ui/core/Modal';
import Cookies from 'js-cookie';
import { useState, useRef, ChangeEvent, FormEvent} from 'react';
import { MdClose, MdImage } from 'react-icons/md';
import APIServiceAuthenticated from '../../../Services/api/apiServiceAuthenticated';
import Button from '../../Button';
import { toastfyError, toastfySuccess } from '../../Toastfy';
import { ContainerModal, Container } from '../styles';
import { useAuth } from '../../../Services/Authentication/auth';
import { useEffect } from 'react';
import { CircularProgress } from '@material-ui/core';
import Compress from 'compress.js';

export default function ModalProfilePic({open, setOpen}: any) {
  const [file, setFile] = useState<File>();
  const [isLoading, setIsLoading] = useState(false);
  const { setPhoto, userInfo } = useAuth();
  const [previewImagePost, setPreviewImagePost] = useState('');

  const filepickerRef = useRef<HTMLDivElement | any>(null);

  const handleClose = () => {
    setOpen(false);
    setFile(undefined);
  };

  useEffect(() => {
    let isMounted = true;
    if (previewImagePost == '' && isMounted) setPreviewImagePost(userInfo?.photo!);
    return () => { isMounted = false }
  });

  const addImageToPost = (event: ChangeEvent<HTMLInputElement>) => {
    if(!event.target.files){
      return;
    }
    
    const fileMB = event.target.files[0].size / 1024 / 1024;
    if (fileMB > 1) {
      toastfyError("Tamanho da foto deve ser menor que 1MB.");
      return;
    }

    const selectedImagesPreview = URL.createObjectURL(event.target.files[0]);
    setPreviewImagePost(selectedImagesPreview);
    
    let c = new Compress();
    c.compress([event.target.files[0]], {
      size: 1, // the max size in MB, defaults to 2MB
      quality: .75, // the quality of the image, max is 1,
      maxWidth: 1920, // the max width of the output image, defaults to 1920px
      maxHeight: 1920, // the max height of the output image, defaults to 1920px
      resize: true, // defaults to true, set false if you do not want to resize the image width and height
    }).then((data: any) => {
      setFile(data[0].prefix + data[0].data);
    });
  }

  const removeImage = () => {
    setFile(undefined);
  }

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    if(!file) return;
    
    if (isLoading) return;
    setIsLoading(true);

    const formData = new FormData();
    formData.append("file", file);
  
    APIServiceAuthenticated.put(`/api/editPhoto`, formData, {
      headers: {
        auth: Cookies.get('WenzerToken')
      }
    }).then(res => {
      setPhoto(res.data.photo);
      toastfySuccess("Foto alterada!");
      setIsLoading(false);
      setOpen(false);
    }).catch(err => {
      toastfyError(err?.response?.data?.mensagem);
      setIsLoading(false);
    });
  }

  const body = (
    <ContainerModal >
      <header>
        <h2>Editar Foto de Perfil</h2>
        <MdClose onClick={handleClose} size={25} />
      </header>
      
      <main>
        <form onSubmit={onSubmit}>

          <div className="content">
            <div className="image">
              <div onClick={() => filepickerRef.current.click()}>
                <MdImage size={25} />
                <span>
                  {!file ? 'Carregar foto' : 'Carregar outra foto'}
                </span>
                <input
                  type='file'
                  onChange={addImageToPost}
                  ref={filepickerRef}
                  hidden
                />
              </div>

              {previewImagePost && (
                <div className='imagePostProfile' onClick={removeImage}>
                  <img src={previewImagePost} alt="postagem" />
                </div>
              )}
              
            </div>
            <Button>
            {isLoading ? (
              <CircularProgress size={16} color="inherit" />
            ) : (
              "Salvar"
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