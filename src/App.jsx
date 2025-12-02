import React, { useState } from 'react'
import './App.css'
import apiLocal from './api/apiLocal'
import Header from './components/Header/Header'
import RestaurantCard from './components/RestaurantCard/RestaurantCard'

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
      {/* <div>
        <Header/>
        <main className='main-container'>
          <h2 className='section-title'>Restaurantes</h2>
          <div className='cards-grid'>
            <RestaurantCard/>
          </div>
        </main>
      </div> */}


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
