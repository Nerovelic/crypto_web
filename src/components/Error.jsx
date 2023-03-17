import React from "react";
import styled from "@emotion/styled";

const Texto = styled.div`
    background-color: #b7332cb3;
    color: #fff;
    padding: 15px;
    text-transform: uppercase;
    text-align: center;
    font-family: 'Source Sans Pro', sans-serif;
    font-weight: 700;
    margin-top: 30px;
`;

const Error = ({children}) => {
    return(
        <Texto>
            {children}
        </Texto>
    )
}

export default Error