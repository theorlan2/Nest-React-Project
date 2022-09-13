import React, { FunctionComponent, ReactNode } from "react";
import styled from "styled-components";

interface Props {
    children?: ReactNode;
}


const ContainerDiv = styled.div`
.container {
    margin: 0 auto;
    width: 100%;
    max-width: 82%;
}

@media all and (max-width: 480px) {
    .container {
        max-width: 96%;
    }
}
`;

const Container: FunctionComponent<Props> = ({ children }) => (
    <ContainerDiv>
        {children}
    </ContainerDiv>
)

export default Container;
