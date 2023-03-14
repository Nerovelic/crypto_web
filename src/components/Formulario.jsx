import React from "react";
import styled from "@emotion/styled";

const InputSubmit = styled.input`
    background-color:#6061c9;
    border: none;
    margin: 100;
    padding: 10px;
    color: white;
    font-weight: 900;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 12px;
    margin-left: 110px;
    width: 230px;
    height: 50px;
    transition: background-color .3s ease;

    &:hover{
        background-color: #7a7dfe;
        cursor: pointer;
    }
`;

const ListaSudmit = styled.select`
    background-color:#6061c9;
    border: none;
    margin: 100;
    padding: 10px 40px;
    color: white;
    font-weight: 900;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 12px;
    margin-left: 110px;
    width: 230px;
    height: 50px;
    transition: background-color .3s ease;

    &:hover{
        background-color: #7a7dfe;
        cursor: pointer;
    }
`;



const Formulario = () =>{
    return(
        <form>
            <InputSubmit type="submit" value="Cotizar" />
            <body>
            </body>
            <ListaSudmit name="crypto" id="crypto">
                <option value="Bitcoin">Bitcoin</option>
                <option value="Ethereum">Ethereum</option>
                <option value="Tether">Tether</option>
                <option value="XRP">XRP</option>
            </ListaSudmit>
        </form>
    )
}

export default Formulario