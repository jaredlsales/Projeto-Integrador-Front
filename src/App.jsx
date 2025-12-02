import React, { useState } from 'react'
import './App.css'
import apiLocal from './api/apiLocal'

function App() {

  const [dadosItensPedidos, setDadosItensPedidos] = useState([""])

  async function consultarItensPedidos() {
    try {
      const resposta = await apiLocal.get("/VisualizarItensPedidos")
      setDadosItensPedidos(resposta.data)
    //Verfiicar com o professor sobre o err
    } catch (err) {
      console.log(err.response.data.error)
    }

  }
  


  return (
    <>
      <div className='appGeral'>
        <button onClick={consultarItensPedidos}>Consultar</button>
      </div>
      <div>
        {dadosItensPedidos.map((item)=>{
          return(
            <div>
              <p>Quantidade: {item.quantidade}</p>
              <p>Total: {item.total_unitario}</p>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default App
