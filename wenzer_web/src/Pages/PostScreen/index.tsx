import { ReactElement, useState } from 'react';
import Post from '../../Components/Post';

import { Container, ContainerComent, MainComent, SubComent, MyComent, Coment} from './styles';
import { postMock } from '../../mock/post';
import { HeaderAvatar } from '../Feed/styles';
import InputTextArea from '../../Components/InputTextArea';
import Button from '../../Components/Button';
import InputText from '../../Components/InputText';
import { AiFillBulb, AiOutlineBulb } from 'react-icons/ai';

function PostScreen(): ReactElement {
  const [hasSubComent, setHasSubComent] = useState(false);
  const [likeComent, setLikeComent] = useState(false);

  const mock = postMock[0];

  function handleLikedComent(){
    setLikeComent(prev => !prev);
  }

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
              <Coment>
                this is a simple coment in developement  
              </Coment>
              <div className="coment-like">
                <span onClick={handleSubComent}>Comentar</span>
                <div onClick={handleLikedComent}>
                  <p>2.5k</p>
                  {!likeComent ? <AiOutlineBulb size="18"/> : <AiFillBulb className='active' size="18"/>}
                  <span>Boa ideia</span>
                </div>
              </div>
            </div>
          </div>          
          <SubComent>
            <div className="coment">
              <HeaderAvatar/>
              <div className="coment-user">
                <p>Nome Usuário</p>
                <Coment>
                  subcomentario aqui
                </Coment>
                <div className="coment-like">
                  <div onClick={handleLikedComent}>
                    <p>2.5k</p>
                    {!likeComent ? <AiOutlineBulb size="18"/> : <AiFillBulb className='active' size="18"/>}
                    <span>Boa ideia</span>
                  </div>
                </div>
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

        <MyComent>
          <InputText placeholder="Escreva um comentário"/>
          <Button className="button_my-coment">comentar</Button>
        </MyComent>
      </ContainerComent>
    </Container>
  )
}

export default PostScreen;