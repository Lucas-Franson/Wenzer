import { ChangeEvent, ReactElement, InputHTMLAttributes } from 'react';

import { Container } from './styles';

interface IInputText {
    type: "text" | "Email";
    placeholder?: string;
    onChange(e: ChangeEvent<HTMLInputElement>): void;
    required?: boolean;
}

function InputText(props: IInputText & InputHTMLAttributes<HTMLInputElement> & any) {
  const { type, placeholder = '', onChange, required = false  } = props;

  return (
    <Container>
      <input type={type} placeholder={placeholder} onChange={onChange} required={required} {...props}></input>
    </Container>
  );
}

export default InputText;