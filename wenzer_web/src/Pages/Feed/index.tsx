import { ReactElement, useState } from "react";
import { MdImage, MdTextFormat, MdVideoCall } from "react-icons/md";
import NoPostHere from "../../Components/Animation/NoPostHere";
import Modal from '../../Components/Modal/ModalPost';
import { useAuth } from "../../Services/Authentication/auth";

import { Container, ContainerNewPost, HeaderAvatar, InputNewPost } from "./styles";

export default function Feed(): ReactElement {
  const { handleOpenModalPost, openModalPost, setOpenModalPost } = useAuth();
  return (
    <Container>
      <ContainerNewPost>
        <header>
          <HeaderAvatar />
          <InputNewPost         
              onClick={handleOpenModalPost}
          >
              Qual a sua idéia?
          </InputNewPost>
        </header>

        <main>
            <div onClick={handleOpenModalPost}>
              <MdImage size={25} />
              <span>Foto</span>
            </div>

            <div onClick={handleOpenModalPost}>
              <MdVideoCall size={25} />
              <span>Vídeo</span>
            </div>

            <div onClick={handleOpenModalPost}>
              <MdTextFormat size={25} />
              <span>Texto</span>
            </div>
        </main>

      </ContainerNewPost>
      <NoPostHere />
      Feed em breve...
      <Modal open={openModalPost} setOpen={setOpenModalPost} />
    </Container>
  )
}