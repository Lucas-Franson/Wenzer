import { ButtonHTMLAttributes, ReactNode } from 'react';

import { ContainerButton } from './styles';

interface IButtonProps {
    children: ReactNode
}

function Button(props: IButtonProps & ButtonHTMLAttributes<HTMLButtonElement> & any)  {
const { children  } = props;
  return (
      <ContainerButton {...props} >
          {children}
      </ContainerButton>
  )
}

export default Button;