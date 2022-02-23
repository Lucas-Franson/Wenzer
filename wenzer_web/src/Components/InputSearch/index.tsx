import { ChangeEvent, ReactElement } from 'react';
import { MdSearch } from "react-icons/md";
import { Container } from './styles';

interface IInputText {
    placeholder?: string;
    onChange(e: ChangeEvent<HTMLInputElement>): void;
    required?: boolean;
    hasError?: boolean;
}

function InputSearch(props: IInputText): ReactElement {
  const { placeholder = '', onChange, required = false, hasError = false} = props;

  return (
    <Container>
      <input
        className={hasError ? 'hasError' : 'hasOkay'}
        placeholder={placeholder}
        required={required}
        onChange={onChange}
      />
     
        <MdSearch
          size={35}
          className="iconInput"
        />
  
    </Container>
  );
}

export default InputSearch;