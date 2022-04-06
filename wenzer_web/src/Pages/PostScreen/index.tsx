import { ReactElement, useState } from 'react';
import Post from '../../Components/Post';

import { Container, ContainerComent, MainComent, SubComent } from './styles';
import { postMock } from '../../mock/post';
import { HeaderAvatar } from '../Feed/styles';
import InputTextArea from '../../Components/InputTextArea';
import Button from '../../Components/Button';

function PostScreen(): ReactElement {
  const [hasSubComent, setHasSubComent] = useState(false);

  const mock = postMock[0];

  function handleSubComent() {
    setHasSubComent(true);
  };

  function sendSubComent() {
    setHasSubComent(false);
  }

  return (
    <Container>
      <Post 
        description={mock.description} 
        goodIdea={true} 
        id={mock.id}
        idProject={mock.idProject}
        idUser={mock.idUser}
        photo={mock.photo}
        title={mock.title}
        user={mock.user}
        created_at={mock.created_at}
        key={mock.id}
        updated_at={mock.updated_at}
      />
      <ContainerComent>
        <MainComent>
          <div className="coment">
            <HeaderAvatar/>
            <div className="coment-user">
              <p>Nome Usuário</p>
              <InputTextArea className="height-coment" placeholder="Escreva um comentário" />
              <span onClick={handleSubComent}>Comentar</span>
            </div>
          </div>
          <SubComent>
            <div className="coment">
              <HeaderAvatar/>
              <div className="coment-user">
                <p>Nome Usuário</p>
                <InputTextArea className="height-coment" placeholder="Escreva um comentário" />
              </div>
            </div>

            {hasSubComent && (
              <div className="coment">
                <HeaderAvatar/>
                <div className="coment-user">
                  <p>Nome Usuário</p>
                  <InputTextArea className="height-coment" placeholder="Escreva um comentário" />
                  <Button onClick={sendSubComent} className="button_coment">
                    Comentar
                  </Button>
                </div>
              </div>
            )}
          </SubComent>
        </MainComent>
      </ContainerComent>
    </Container>
  )
}

export default PostScreen;