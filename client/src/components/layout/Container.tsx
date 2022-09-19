import React, { FunctionComponent, ReactNode } from "react";

interface Props {
    children?: ReactNode;
}

const Container: FunctionComponent = (props: Props) => {

    return (
        <div className="container" >
            {props.children}
        </div>
    )
}

export default Container;
