import { ChangeEvent, InputHTMLAttributes } from 'react';

import { Container } from './styles';

interface IInputText {
    type: "text" | "Email" | "select";
    placeholder?: string;
    onChange(e: ChangeEvent<HTMLInputElement>): void;
    required?: boolean;
    maxLength?: number;
}

function InputText(props: IInputText & InputHTMLAttributes<HTMLInputElement> & any) {
  const { type, placeholder = '', onChange, required = false, maxLength = 240 } = props;

  return (
    <Container>
      <input type={type} placeholder={placeholder} onChange={onChange} maxLength={maxLength} required={required} {...props}></input>
    </Container>
  );
}

export default InputText;