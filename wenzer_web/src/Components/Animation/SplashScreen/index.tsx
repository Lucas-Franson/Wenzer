import React from 'react';

import { Container } from './styles';

import logo from '../../../Utils/image/wenzer_web.svg'
import { CircularProgress } from '@material-ui/core';

const SplashScreen: React.FC = () => {
  return (
      <Container>
        <img src={logo}/>
        <CircularProgress/>
      </Container>
  )
}

export default SplashScreen;