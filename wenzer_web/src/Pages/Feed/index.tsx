import { ReactElement } from "react";
import NoPostHere from "../../Components/Animation/NoPostHere";
import InputText from "../../Components/InputText";

import { Container, ContainerNewPost, HeaderAvatar } from "./styles";

export default function Feed(): ReactElement {
    return (
        <Container>
            <ContainerNewPost>
                <HeaderAvatar />
                <InputText
                    className="noMargin"
                    placeHolder="Qual a sua idéia de projeto?"
                    onChange={() => {}}
                />
            </ContainerNewPost>
            <NoPostHere />
            Feed em breve...
        </Container>
    )
}