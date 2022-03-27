import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  position: relative;

  input {
    width: 100%;
    padding: 0.8rem 3rem 0.8rem 1rem;
    margin-bottom: 1rem;
    font-weight: 400;
    font-size: 1rem;
    
    color: ${(props) => props.theme.colors.white.light};
    border-radius: 0.5rem;
    background-color: ${(props) => props.theme.colors.background};
  }

  .iconInput {
    position: absolute;
    right: 0;
    top: 7px;
    padding-right: 10px;
  }

  .hasError {
 
      border: 1px solid ${(props) => props.theme.colors.warning};
      border-radius: 0.5rem;
    
  }

  .hasOkay {
    &:focus {
      border: 1px solid ${(props) => props.theme.colors.primary};
      border-radius: 0.5rem;
    }
  }
`;

