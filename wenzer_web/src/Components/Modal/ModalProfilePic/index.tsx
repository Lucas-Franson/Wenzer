import Modal from '@material-ui/core/Modal';
import { useState, useRef, ChangeEvent, FormEvent} from 'react';
import { MdClose, MdImage } from 'react-icons/md';
import Button from '../../Button';
import { ContainerModal, Container } from '../styles';

export default function ModalProfilePic({open, setOpen}: any) {
  const [imageProfile, setImageProfile] = useState<File>();
  const [previewImagePost, setPreviewImagePost] = useState('');

  const filepickerRef = useRef<HTMLDivElement | any>(null);

  const handleClose = () => {
    setOpen(false);
    setImageProfile(undefined);
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

  const addImageToPost = (event: ChangeEvent<HTMLInputElement>) => {
    if(!event.target.files){
      return;
    }

    setImageProfile(event.target.files[0]);
    const selectedImagesPreview = URL.createObjectURL(event.target.files[0]);
    setPreviewImagePost(selectedImagesPreview);
    console.log(event.target.files[0]);
  }

  const removeImage = () => {
    setImageProfile(undefined);
  }

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();


    console.log(body);
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
                  {!imageProfile ? 'Carregar foto' : 'Carregar outra foto'}
                </span>
                <input
                  type='file'
                  onChange={addImageToPost}
                  ref={filepickerRef}
                  hidden
                />
              </div>

              {imageProfile && (
                <div className='imagePostProfile' onClick={removeImage}>
                  <img src={previewImagePost} alt="postagem" />
                </div>
              )}
              
            </div>
            <Button>Salvar</Button>
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