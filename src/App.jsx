import React, { useState } from 'react'
import './App.css'
import apiLocal from './api/apiLocal'
import Header from './components/Header/Header'
import RestaurantCard from './components/RestaurantCard/RestaurantCard'
import {ToastContainer, toast} from "react-toastify"

function App() {

  //ConsultarItensPedidos
  const [dadosItensPedidos, setDadosItensPedidos] = useState([""])

  //CadastroItensPedidos  
  const [quantidade, setQuatidade] = useState("")
  const [total_unitario, setTotalUnitario] = useState("")


  //Metodo GET
  async function consultarItensPedidos() {
    try {
      const resposta = await apiLocal.get("/VisualizarItensPedidos")
      setDadosItensPedidos(resposta.data)
    //Verfiicar com o professor sobre o err
    } catch (err) {
      console.log(err.response.data.error)
    }

  }

  //Metodo POST
  async function cadastrarItensPedidos(e){
    e.preventDefault()
    //Validacao dos campos de cadastro
    if(!quantidade || !total_unitario){
      toast.warn("Precisa preencher todos os campos!")
      return
    }

    try {
      const resposta = await apiLocal.post("/ItensPedidosControllers",{
        quantidade: Number(quantidade),
        total_unitario: Number(quantidade),
        idPedido,
        idProduto
      })

      toast.success("Cadastro Efetuado com Sucesso!")
      console.log(resposta.data.dados)
    } catch (err) {
      toast.error("Erro ao Cadastrar ")
      console.log(err.response.data.error)
      
    }
  }

  //Metodo DELETE
   async function deletarItensPedidos(id) {
    try {
      const resposta = await apiLocal.delete(`/ApagarItensPedidos/${id}`)
      toast.success("Registro Excluido Com Sucesso!")
      console.log(resposta.data.dados)
      // Atualiza a lista automaticamente
      consultarItensPedidos()
    } catch (err) {
      toast.warning("Registro nao encontrado!")
      console.log(err)
    }
   }
  
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />

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
        <button onClick={cadastrarItensPedidos}>Cadastrar</button>
      </div>
      <div>
        {dadosItensPedidos.map((item)=>{
          return(
            <div key={item.id}>
              <p>Quantidade: {item.quantidade}</p>
              <p>Total: {item.total_unitario}</p>
              <p>Numero Pedido: {item.pedidos?.numero_pedido}</p>
              <p>Produto: {item.produtos?.categorias?.categoria}</p>
              <button className='apagar' onClick={()=> deletarItensPedidos(item.id)}>Apagar</button>
              <button className='alterar'>Alterar</button>
            </div>
          )
        })}
      </div>

      
      <div className='AppClientes'>
        <h1>Formulario</h1>
        <form>
          <label htmlFor="quantidade">Quantidade: </label>
          <input type="number" placeholder='Digite a quantidade' value={quantidade} onChange={(e) => setQuatidade(e.target.value)} required />
          <label htmlFor="total_unitario">Total unitario: </label>
          <input type="number" step="1" placeholder='Digite o Total unitario' value={total_unitario} onChange={(e) => setTotalUnitario(e.target.value)} required />
        </form>
      </div>

      
    </>
  )
}

export default App
