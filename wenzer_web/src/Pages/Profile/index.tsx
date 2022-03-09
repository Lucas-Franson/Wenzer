import React from 'react';
import { HeaderAvatar } from '../Feed/styles';

import { CardInfo, CardMyProject, CardProfile, Container, ContainerProfile, ContainerProjects } from './styles';
import imageTeste from '../../Utils/image/bgFgtsDescktop.jpg';
import { AiFillHeart, AiOutlineBulb } from 'react-icons/ai';

const Profile: React.FC = () => {
  return (
      <Container>
          <ContainerProfile>
            <CardProfile>
                <div className="imageProfile">
                  <HeaderAvatar className='avatarProfile' />
                  <p>Nome usuário</p>
                  <span>Descrição do perfil aqui</span>
                </div>

                <div className="counterProject">
                  <div className="counter">
                    <span>Projetos</span>
                    <span>5</span>
                  </div>
                  <div className="counter">
                    <span>Participando</span>
                    <span>26</span>
                    </div>
                </div>

            </CardProfile>
            <CardInfo>
              <h3>Conexões</h3>
              <span>Você ainda não tem nenhuma conexão</span>
            </CardInfo>
            
            <CardInfo>
              <h3>Interesses</h3>
              <span>Você ainda não tem nenhum interesse</span>
            </CardInfo>

            <CardInfo>
              <h3>Atividades</h3>
              <span>Você ainda não tem nenhuma atividade</span>
            </CardInfo>

          </ContainerProfile>

          <ContainerProjects>
            <div className="wraper">
              <CardMyProject>
                <img src={imageTeste} alt="project"/>
                <div className="containerContent">
                  <h3>Titulo que devera ser maior que a telasdasdasasdasdasdasdasdasddasasdasddasasdasddasasdasddasasdasddasasdasddasasdasddasdasdasdasda</h3>
                  <div className='ContainerAction'>
                    <div className="action">
                      <AiFillHeart size={20}  className="heart"/>
                      <span>15</span>
                    </div>

                    <div className="action">
                      <AiOutlineBulb size={20} className="idea"/>  
                      <span>15</span>
                    </div>
                  </div>
                </div>
              </CardMyProject>

              <CardMyProject>

              </CardMyProject>

              <CardMyProject>

              </CardMyProject>
            
            </div>
            <CardInfo className='mt-10'>
              <h3>Projetos que estou parcipando</h3>
            </CardInfo>
          </ContainerProjects>
      </Container>
  )
}

export default Profile;