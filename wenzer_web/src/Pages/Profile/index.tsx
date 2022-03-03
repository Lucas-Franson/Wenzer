import React from 'react';
import { HeaderAvatar } from '../Feed/styles';

import { CardInfo, CardProfile, Container, ContainerProfile, ContainerProjects } from './styles';

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
            </CardInfo>
            
            <CardInfo>
              <h3>Interesses</h3>
            </CardInfo>

            <CardInfo>
              <h3>Atividades</h3>
            </CardInfo>

          </ContainerProfile>

          <ContainerProjects>
            <CardInfo className='mt-0'>
              <h3>Projetos que estou parcipando</h3>
            </CardInfo>
          </ContainerProjects>
      </Container>
  )
}

export default Profile;