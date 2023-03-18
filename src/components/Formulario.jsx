import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import useSelectorMonedas from "../hooks/useSelectorMonedas";
import {monedas} from '../data/monedas';
import Error from "./Error";

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
        background-color: #fdfdfd6a;
        cursor: pointer;
    }
`;

const Resultado = styled.p`
    color: white;
    margin: 30px auto;
    font-size: 24px;
    text-align: center;
`;

const Formulario = () =>{
    const [cryptos,setCryptos] = useState([]);
    const [error,setError] = useState(false);
    const [state,SelectorMonedas] = useSelectorMonedas('Elige tu moneda:',monedas);
    const [crypt,SelectorCryptos] = useSelectorMonedas('Elige tu cryptomoneda:',cryptos);
    const [resultadoConsulta, setResultadoConsulta] = useState({});
    const [valorCotizado, setValorCotizado] = useState(null);

    //conslutar una api//
    useEffect(() =>{
        const consultarApi = async () =>{
            const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";
            const respuesta = await fetch(url);
            const resultado = await respuesta.json();
            console.log(resultado);
            const arregloCryptos = resultado.Data.map(crypto =>{
                const objeto = {
                    id: crypto.CoinInfo.Name,
                    nombre: crypto.CoinInfo.FullName
                }
                return objeto;
            });
            setCryptos(arregloCryptos);
        }
        consultarApi();
    }, [])

    const manejadorSubmit = async e => {
        e.preventDefault();
        if([state,crypt].includes('')){
            console.log('Error 404');
            setError(true);
            return;
        }
        setError(false);
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${crypt}&tsyms=${state}`;
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        setResultadoConsulta(resultado);
        setValorCotizado(resultado.DISPLAY[crypt][state].PRICE);
    }

    return(
        <>
        {error && <Error>Todos los campos son obligatorios</Error>}
        <div>
        <form onSubmit={manejadorSubmit}>
            <SelectorMonedas/>
            <SelectorCryptos/>
            <InputSubmit 
            type="submit" 
            value="Cotizar"/>
        </form>
        {valorCotizado && (
            <Resultado>
                El valor de {crypt} en {state} es de: {valorCotizado}
            </Resultado>
        )}
        </div>
        </>
    )    
}

export default Formulario