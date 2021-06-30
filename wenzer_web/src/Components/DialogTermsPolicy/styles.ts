import styled from 'styled-components';

export const Container = styled.div`
  height: 350px;
  
  h2 {
    font-size: 1.2rem;
    font-weight: 500;
    margin: 0.5rem 0;
  }

  h3 {
    font-size: 1rem;
    font-weight: 600;
    margin: 0.5rem 0;
  }

  p {
    font-size: 1rem;
    font-weight: 400;
  }

  ul {
    li {
      font-size: 1rem;
      font-weight: 400;
    }
  }

  a {
    text-decoration: none;
    color: ${(props) => props.theme.colors.primary};

    &:hover {
      color: ${(props) => props.theme.colors.primaryLight};
    }
  }
`;
