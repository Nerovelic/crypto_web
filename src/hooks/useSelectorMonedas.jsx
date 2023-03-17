import React, { useState } from "react";
import styled from "@emotion/styled";

const useSelectorMonedas = (label,divisas) => {
    const Label = styled.label`
        color: white;
        display: block;
        font-family: 'Source Sans Pro', sans-serif;
        font-size: 24px;
        font-weight: 700;
        margin: 15px 0;
    `;
    const SelectSubmit  = styled.select`
        width: 100%;
        font-size: 18px;
        padding: 14px;
        border-radius: 10px;
        margin-bottom: 10px;
        justify-content:center;
    `;

    const [state,setState] = useState('');

    const SelectorMonedas = () =>
    <>
        <Label>{label}</Label>
        <SelectSubmit  
        value={state}
        onChange={e => setState(e.target.value)}
        >
            <option>Seleccionar una divisa</option>
            {divisas.map(opcion => (
              <option 
                key={opcion.id}
                value={opcion.id}
              >{opcion.nombre}</option>  
            ))}
        </SelectSubmit>
    </>

    return [state,SelectorMonedas];
}

export default useSelectorMonedas