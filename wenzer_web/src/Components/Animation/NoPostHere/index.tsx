import { ReactElement } from 'react';
import Lottie from 'react-lottie';
import { Container } from './styles';
import loadingData from './loading-data.json';

export default function NoPostHere(): ReactElement {

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingData,
  };

  return (
    <Container>
      <Lottie options={defaultOptions} width={350} height={350}/>
    </Container>
  );
}
