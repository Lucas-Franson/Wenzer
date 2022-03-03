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
    }  
`
