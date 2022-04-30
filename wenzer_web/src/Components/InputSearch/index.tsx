import { ChangeEvent, ReactElement, InputHTMLAttributes } from 'react';
import { MdSearch } from "react-icons/md";
import { Container } from './styles';

interface IInputText {
    placeholder?: string;
    onKeyDown(e: ChangeEvent<HTMLInputElement>): void;
    required?: boolean;
    hasError?: boolean;
}

function InputSearch(props: IInputText & InputHTMLAttributes<HTMLInputElement> ): ReactElement {
  const { placeholder = '', onKeyDown, required = false, hasError = false} = props;

  return (
    <Container>
      <input
        className={hasError ? 'hasError' : 'hasOkay'}
        placeholder={placeholder}
        required={required}
        onKeyDown={onKeyDown}
      />
        <MdSearch
          size={30}
          className="iconInput"
        />
    </Container>
  );
}

export default InputSearch;