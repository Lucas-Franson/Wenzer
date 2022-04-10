import { ChangeEvent, InputHTMLAttributes } from 'react';

import { Container } from './styles';

interface IInputText {
    placeholder?: string;
    onChange(e: ChangeEvent<HTMLInputElement>): void;
    required?: boolean;
    maxLength?: number;
}

function InputTextArea(props: IInputText & InputHTMLAttributes<HTMLInputElement> & any) {
  const { placeholder = '', onChange, required = false, maxLength = 300  } = props;

  return (
    <Container>
      <textarea maxLength={maxLength} placeholder={placeholder} onChange={onChange} required={required} {...props}></textarea>
    </Container>
  );
}

export default InputTextArea;