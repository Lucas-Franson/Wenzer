import styled from 'styled-components';

export const ContainerButton = styled.button`
    width: 100%;
    border-radius: 0.3rem;
    padding: 0.8rem 2.5rem;

    background-color: ${(props) => props.theme.colors.primary};
    color: #fff;

    transition: ease all 0.2s;

    &:hover {
      background-color: ${(props) => props.theme.colors.primaryLight};
      color: white;
    }

    &.noHover {
      background-color: ${(props) => props.theme.colors.secondary};
      color: white;
    }

    &.onlyBorder {
      border: 1px solid ${(props) => props.theme.colors.primary};
      background-color: transparent;
      color: ${(props) => props.theme.colors.primary};
    }

    &.payment-button {
      background-color: ${(props) => props.theme.colors.succes};
    }

    &.button_coment {
      margin-top: 10px;
      width: 50%;
    }

    &.button_my-coment {
      width: 40%;
    }

    &.button-search {
      width: 30%;
    }

    &.flex {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 15px;
    }

    &.svg {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }

    &.white-content {
      color: ${(props) => props.theme.colors.white.light};

      &:hover {
        color: white;
      }
    }

    &.deleteYes {
      background-color: ${props => props.theme.colors.warning};
    }

    &.deleteNo {
      border: 1px solid ${(props) => props.theme.colors.background};
      background-color: transparent;
      color: ${(props) => props.theme.colors.white.dark};
    }

`
