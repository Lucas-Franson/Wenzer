import { ChangeEvent, InputHTMLAttributes } from 'react';

import { Container } from './styles';

interface IInputText {
    placeholder?: string;
    onChange(e: ChangeEvent<HTMLInputElement>): void;
    required?: boolean;
    maxLength?: number;
    disabled?: boolean;
}

function InputTextArea(props: IInputText & InputHTMLAttributes<HTMLInputElement> & any) {
  const { placeholder = '', onChange, required = false, maxLength = 300, disabled = false  } = props;

  return (
    <Container>
      <textarea 
        maxLength={maxLength} 
        placeholder={placeholder} 
        onChange={onChange} 
        disabled={disabled}
        required={required} 
        {...props}>

        </textarea>
    </Container>
  );
}

export default InputTextArea;