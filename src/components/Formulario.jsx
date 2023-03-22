import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import useSelectorMonedas from "../hooks/useSelectorMonedas";
import {monedas} from '../data/monedas';
import Error from "./Error";

const InputSubmit = styled.input`
    background-color:#6061c9;
    border: none;
    margin: 20px 0;
    padding: 10px;
    color: white;
    font-weight: 900;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 12px;
    max-width: 100%;
    width: 100%;
    transition: background-color .3s ease;

    &:hover{
        background-color: #fdfdfd6a;
        cursor: pointer;
    }

    @media (min-width: 992px) {  
      max-width: 50%;
      width: 50%;
      margin: 20px auto;
    }
`;

const Resultado = styled.p`
    color: white;
    margin: 30px auto;
    font-size: 24px;
    text-align: center;
`;

const Imagenes = styled.img`
    display: block;
    margin: 20px 0;
    max-width: 100px;

    @media (max-width: 992px) {
    form {
       display: flex;
       flex-direction: column;
       align-items: center;
     }
    }
`;

const Cargando = styled.div`
  border: 5px solid #f3f3f3;
  border-top: 5px solid #6061c9;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  margin: 30px auto;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const ResultadoContainer = styled.div`
    background-color: #1a1a1a;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 20px;
    margin-top: 50px;
`;

const Formulario = () =>{
    const [cryptos,setCryptos] = useState([]);
    const [error,setError] = useState(false);
    const [state,SelectorMonedas] = useSelectorMonedas('Elige tu moneda:',monedas);
    const [crypt,SelectorCryptos] = useSelectorMonedas('Elige tu cryptomoneda:',cryptos);
    const [resultadoConsulta, setResultadoConsulta] = useState({});
    const [valorCotizado, setValorCotizado] = useState(null);
    const [valorAlto, setValorAlto] = useState(null);
    const [valorBajo, setValorBajo] = useState(null);
    const [imagen, setImagen] = useState('');
    const [mostrarCargando, setMostrarCargando] = useState(false);

    //conslutar una api//
    useEffect(() =>{
        const consultarApi = async () =>{
            setMostrarCargando(true);
            const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";
            const respuesta = await fetch(url);
            const resultado = await respuesta.json();
            console.log(resultado);
            const arregloCryptos = resultado.Data.map(crypto =>{
                const objeto = {
                    id: crypto.CoinInfo.Name,
                    nombre: crypto.CoinInfo.FullName,
                }
                return objeto;
            });
            setCryptos(arregloCryptos);
            setMostrarCargando(false);
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
        setMostrarCargando(true);
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${crypt}&tsyms=${state}`;
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        setResultadoConsulta(resultado);
        setValorCotizado(resultado.DISPLAY[crypt][state].PRICE);
        setValorAlto(resultado.DISPLAY[crypt][state].HIGHDAY);
        setValorBajo(resultado.DISPLAY[crypt][state].LOWDAY);
        setImagen(resultado.RAW[crypt][state].IMAGEURL);
        setMostrarCargando(false);
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
        {mostrarCargando && <Cargando></Cargando>}
        {valorCotizado && (
            <ResultadoContainer>
                <Resultado>{crypt}</Resultado>
                <Imagenes 
                    src={`https://www.cryptocompare.com/${imagen}`} 
                    alt="Imagen de la crypto" 
                />
                <Resultado>El valor es de: <span>{valorCotizado}</span> </Resultado>
                <Resultado>Su valor mas alto es de: <span>{valorAlto}</span></Resultado>
                <Resultado>Su valor mas bajo es de: <span>{valorBajo}</span></Resultado>
            </ResultadoContainer>
        )}
        </div>
        </>
    )    
}

export default Formulario