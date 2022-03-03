import { ChangeEvent, InputHTMLAttributes } from 'react';

import { Container } from './styles';

interface IInputText {
    placeholder?: string;
    onChange(e: ChangeEvent<HTMLInputElement>): void;
    required?: boolean;
}

function InputTextArea(props: IInputText & InputHTMLAttributes<HTMLInputElement> & any) {
  const { placeholder = '', onChange, required = false  } = props;

  return (
    <Container>
      <textarea maxLength={300} placeholder={placeholder} onChange={onChange} required={required} {...props}></textarea>
    </Container>
  );
}

export default InputTextArea;