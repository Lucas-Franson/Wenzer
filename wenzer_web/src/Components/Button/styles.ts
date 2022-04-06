import styled from 'styled-components';

export const ContainerButton = styled.button`
    width: 100%;
    border-radius: 0.3rem;
    padding: 0.8rem 2.5rem;

    background-color: ${(props) => props.theme.colors.primary};
    color: #fff;

    transition: ease all 0.2s;

    &.onlyBorder {
      border: 1px solid ${(props) => props.theme.colors.primary};
      background-color: transparent;
      color: ${(props) => props.theme.colors.primary};
    }

    &:hover {
      background-color: ${(props) => props.theme.colors.primaryLight};
      color: white;
    }
    
    &.payment-button {
      background-color: ${(props) => props.theme.colors.succes};
    }

    &.button_coment {
      margin-top: 10px;
      width: 50%;
    }

`
