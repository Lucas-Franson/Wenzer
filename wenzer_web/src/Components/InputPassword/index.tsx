import { ChangeEvent, ReactElement, useState } from 'react';
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { Container } from './styles';

interface IInputText {
    placeholder?: string;
    onChange(e: ChangeEvent<HTMLInputElement>): void;
    required?: boolean;
}

function InputPassoword(props: IInputText): ReactElement {
  const { placeholder = '', onChange, required = false  } = props;
  const [showPassword, setShowPassword] = useState(false);

  function changeVisibilityInput() {
    setShowPassword(!showPassword);
  }

  return (
    <Container>
      <input
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        required={required}
        onChange={onChange}
      />
      {showPassword ? (
        <MdVisibilityOff
          onClick={changeVisibilityInput}
          size={35}
          className="iconInput"
        />
      ) : (
        <MdVisibility
          onClick={changeVisibilityInput}
          size={35}
          className="iconInput"
        />
      )}
    </Container>
  );
}

export default InputPassoword;