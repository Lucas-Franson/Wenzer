import { ReactElement } from "react";
import { useAuth } from '../../Services/Authentication/auth';

import { Container } from "./styles";


export default function Feed(): ReactElement {
    const { singOut } = useAuth()
    return (
        <Container>
            Feed aquiaaaaaaaaaaaaaaa
            <button onClick={singOut}>logout</button>
        </Container>
    )
}