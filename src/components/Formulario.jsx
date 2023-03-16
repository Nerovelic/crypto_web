import React from "react";
import styled from "@emotion/styled";
import useSelectorMonedas from "../hooks/useSelectorMonedas";
import {monedas} from '../data/monedas';

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

const Formulario = () =>{
    const [state,SelectorMonedas] = useSelectorMonedas('Elige tu moneda:',monedas);
    return(
        <div>
        <form>
            <SelectorMonedas/>
            {state}
            <InputSubmit 
            type="submit" 
            value="Cotizar"/>
        </form>
        </div>
    )
}

export default Formulario