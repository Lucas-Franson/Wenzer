import { ReactElement } from 'react';
import Lottie from 'react-lottie';
import { Container } from './styles';
import noContentRobot from './noContentRobot.json';

export default function NoContent(): ReactElement {

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: noContentRobot,
  };

  return (
    <Container>
      <Lottie options={defaultOptions} width={350} height={350}/>
    </Container>
  );
}
