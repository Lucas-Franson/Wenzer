import Modal from '@material-ui/core/Modal';
import { useState, useRef, ChangeEvent, FormEvent} from 'react';
import { MdClose, MdImage } from 'react-icons/md';
import { HeaderAvatar } from '../../../Pages/Feed/styles';
import Button from '../../Button';
import InputText from '../../InputText';
import InputTextArea from '../../InputTextArea';
import { ContainerModal, Container } from './styles';

export default function ModalPost({open, setOpen}: any) {
  const [imageToPost, setImageToPost] = useState<File>();
  const [previewImagePost, setPreviewImagePost] = useState('');
  const [titlePost, setTitlePost] = useState('');
  const [descriptionPost, setDescriptionPost] = useState('');
  const [typePost, setTypePost] = useState('1');

  const filepickerRef = useRef<HTMLDivElement | any>(null);

  const handleClose = () => {
    setOpen(false);
    setImageToPost(undefined);
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
          </div>

          <div className="content">
            <InputText required placeholder="Titulo" onChange={(e: any) => setTitlePost(e.target.value)} />
            <InputTextArea required placeholder="Qual a sua idéia?" onChange={(e: any) => setDescriptionPost(e.target.value)}/>

            <div className="image">
              <div onClick={() => filepickerRef.current.click()}>
                <MdImage size={25} />
                <span>Foto/Vídeo</span>
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
            <Button>Publicar</Button>
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