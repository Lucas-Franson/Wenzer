import { memo, ReactNode } from "react";
import { Container } from "./styles";

type CardProps = {
  title: string;
  description: string;
  children: ReactNode;
};

function CardProject({ title, description, children }: CardProps) {
 
  return (
    <Container>
      <strong>{title}</strong>

      <div>
        <div>{children}</div>
        <p>{description}</p>
        <a href="#home">Cadastrar</a>
      </div>

  
    </Container>
  );
}

export default memo(CardProject);
