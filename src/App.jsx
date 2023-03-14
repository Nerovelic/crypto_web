import styled from "@emotion/styled"
import Formulario from "./components/Formulario";
import ImageCrypto from './img/cryptobro.png'

function App() {  
  const Contenedor = styled.div`
   max-width: 900px;
   margin: 0 auto;
   width: 90%;
   @media (min-width: 992px){
     display: grid;
     grid-template-columns: repeat(2,1fr);
     column-gap: 2rem;
   }
  `;
  const Imagen = styled.img`
    max-width: 400;
    width: 80%;
    margin: 100px auto 0 auto;
    display: block;
  `;
  const Heading = styled.h1`
    font-family: 'Source Sans Pro', sans-serif;
    color: #FFF;
    text-align: center;
    font-size: 50px;
    margin-top: 200px;
    margin-bottom: 50px;
    &::after{
      content:'';
      width: 100px;
      height: 6px;
      background-color: #66a2fe;
      display: block;
      margin: 10px auto 0 auto;
    }
  `;
  return (
    <Contenedor>
      <Imagen
        src={ImageCrypto}
        alt="Es una imagen de crypto"
      />
      <div>
        <Heading>
          Criptomanía Bro
        </Heading>
        <Formulario/>
      </div>
    </Contenedor>
  )
}

export default App
