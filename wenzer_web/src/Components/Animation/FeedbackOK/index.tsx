import React, { ReactElement } from 'react';
import Lottie from 'react-lottie';
import { Container } from './styles';
import animationData from './feedbackOk.json';

export default function FeedbackOk(): ReactElement {

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
  };

  return (
    <Container>
      <Lottie options={defaultOptions} width={100} height={100}/>
    </Container>
  );
}
