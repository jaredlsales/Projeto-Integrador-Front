{/*import React, { useState, useEffect } from 'react'
import './App.css'
import apiLocal from './api/apiLocal'
import {ToastContainer, toast} from "react-toastify"

function App() {
  // Estados do componente

  // Estado para armazenar a lista de itens de pedidos retornada pela API (GET)
  const [dadosItensPedidos, setDadosItensPedidos] = useState([])

  // Estados para os campos do formulário de cadastro/edição
  const [quantidade, setQuantidade] = useState("")
  const [total_unitario, setTotalUnitario] = useState("")

  // Estados para armazenar as listas de pedidos e produtos (para os selects)
  const [pedidos, setPedidos] = useState([])
  const [produtos, setProdutos] = useState([])

  // Estados para armazenar os valores selecionados nos selects
  const [idPedido, setIdPedido] = useState("")
  const [idProduto, setIdProduto] = useState("")

  // Estados para controlar o modo de edição
  const [editando, setEditando] = useState(false)           // Indica se está no modo edição
  const [itemEditando, setItemEditando] = useState(null)   // Armazena o item sendo editado

  // Efeito que é executado uma vez ao carregar o componente
  // Carrega as listas de pedidos e produtos para preencher os selects
  useEffect(() => {
    async function carregarPedidosEProdutos() {
      try {
        // Requisição GET para obter a lista de pedidos
        const respostaPedidos = await apiLocal.get("/VisualizarPedidos")
        setPedidos(respostaPedidos.data)

        // Requisição GET para obter a lista de produtos
        const respostaProdutos = await apiLocal.get("/VisualizarProdutos")
        setProdutos(respostaProdutos.data)
      } catch (err) {
        console.log(err)
      }
    }
    carregarPedidosEProdutos()
  }, []) // Array de dependências vazio = executa apenas uma vez

  // Função para consultar itens de pedidos (GET)
  async function consultarItensPedidos() {
    try {
      // Faz a requisição GET para o endpoint de visualização de itens de pedidos
      const resposta = await apiLocal.get("/VisualizarItensPedidos")
      // Atualiza o estado com os dados recebidos
      setDadosItensPedidos(resposta.data)
    } catch (err) {
      console.log(err.response.data.error)
    }
  }

  // Função para carregar um item no formulário para edição
  function carregarParaEdicao(item) {
    // Ativa o modo edição
    setEditando(true)
    // Armazena o item que está sendo editado
    setItemEditando(item)
    // Preenche os campos do formulário com os dados do item
    setQuantidade(item.quantidade)
    setTotalUnitario(item.total_unitario)
    
    // Tenta encontrar o pedido correspondente na lista de pedidos
    // Comparando o número do pedido do item com os da lista de pedidos
    const pedidoCorrespondente = pedidos.find(p => p.numero_pedido === item.pedidos?.numero_pedido)
    if (pedidoCorrespondente) {
      setIdPedido(pedidoCorrespondente.id)
    }
    
    // Tenta encontrar o produto correspondente na lista de produtos
    // Comparando a categoria ou nome do produto
    const produtoCorrespondente = produtos.find(p => 
      p.categorias?.categoria === item.produtos?.categorias?.categoria ||
      p.nome === item.produtos?.nome
    )
    if (produtoCorrespondente) {
      setIdProduto(produtoCorrespondente.id)
    }
    
    // Exibe mensagem informando que está no modo edição
    toast.info("Modo edição ativado. Edite os campos e clique em Salvar.")
  }

  // Função para salvar um item (tanto cadastro quanto edição)
  async function salvarItensPedidos(e) {
    e.preventDefault() // Previne o comportamento padrão do formulário
    
    // Valida se todos os campos foram preenchidos
    if(!quantidade || !total_unitario || !idPedido || !idProduto){
      toast.warn("Precisa preencher todos os campos!")
      return
    }

    try {
      // Verifica se está no modo edição
      if (editando && itemEditando) {
        // MODO EDIÇÃO - PUT
        // Faz a requisição PUT para atualizar o item existente
        const resposta = await apiLocal.put("/AtualizarItensPedidos", {
          id: itemEditando.id, // ID do item a ser atualizado
          quantidade: Number(quantidade),
          total_unitario: Number(total_unitario),
          idPedido,
          idProduto
        })

        toast.success("Item Atualizado com Sucesso!")
        console.log(resposta.data.dados)
      } else {
        // MODO CADASTRO - POST
        // Faz a requisição POST para criar um novo item
        const resposta = await apiLocal.post("/ItensPedidosControllers",{
          quantidade: Number(quantidade),
          total_unitario: Number(total_unitario),
          idPedido,
          idProduto
        })

        toast.success("Cadastro Efetuado com Sucesso!")
        console.log(resposta.data.dados)
      }

      // Atualiza a lista de itens após cadastro/edição
      consultarItensPedidos()
      
      // Limpa o formulário
      limparFormulario()
      
    } catch (err) {
      // Exibe mensagem de erro específica para o modo (cadastro ou edição)
      const mensagem = editando ? "Erro ao atualizar" : "Erro ao cadastrar"
      toast.error(mensagem)
      console.log(err.response?.data?.error || err)
    }
  }

  // Função para limpar o formulário e resetar o modo de edição
  function limparFormulario() {
    setQuantidade("")
    setTotalUnitario("")
    setIdPedido("")
    setIdProduto("")
    setEditando(false)
    setItemEditando(null)
  }

  // Função para cancelar a edição
  function cancelarEdicao() {
    limparFormulario()
    toast.info("Edição cancelada")
  }

  // Função para deletar um item de pedido (DELETE)
  async function deletarItensPedidos(id) {
    // Confirmação antes de excluir
    if (window.confirm("Tem certeza que deseja excluir este item?")) {
      try {
        // Faz a requisição DELETE passando o ID na URL
        const resposta = await apiLocal.delete(`/ApagarItensPedidos/${id}`)
        toast.success("Registro Excluido Com Sucesso!")
        console.log(resposta.data.dados)
        // Atualiza a lista após exclusão
        consultarItensPedidos()
      } catch (err) {
        toast.warning("Registro nao encontrado!")
        console.log(err)
      }
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
      </div>

      Container para exibir notificações 
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />

      Botões de ação principal
      <div className='appGeral'>
        <button onClick={consultarItensPedidos}>Consultar</button>
        {/* Botão de cancelar edição (só aparece quando está editando)
        {editando && (
          <button onClick={cancelarEdicao} style={{background: '#ff9900', marginLeft: '10px'}}>
            Cancelar Edição
          </button>
        )}
      </div>
      
      Lista de itens de pedidos 
      <div>
         Mapeia cada item da lista para exibir seus dados
        {dadosItensPedidos.map((item)=>{
          return(
            <div key={item.id} className="item-card">
              <p>Quantidade: {item.quantidade}</p>
              <p>Total: {item.total_unitario}</p>
              <p>Numero Pedido: {item.pedidos?.numero_pedido}</p>
              <p>Produto: {item.produtos?.categorias?.categoria}</p>
              Botão para excluir o item
              <button className='apagar' onClick={()=> deletarItensPedidos(item.id)}>Apagar</button>
              Botão para editar o item
              <button className='alterar' onClick={() => carregarParaEdicao(item)}>
                Alterar
              </button>
            </div>
          )
        })}
      </div>

      Formulário para cadastro/edição
      <div className='AppClientes'>
        Título dinâmico baseado no modo (cadastro ou edição)
        <h1>{editando ? 'Editar Item' : 'Formulario de Cadastro'}</h1>
        
        Informação sobre qual item está sendo editado
        {editando && itemEditando && (
          <p style={{color: 'blue', marginBottom: '10px'}}>
            Editando item com ID: {itemEditando.id}
          </p>
        )}
        
        Formulário que chama salvarItensPedidos ao ser submetido
        <form onSubmit={salvarItensPedidos}>
          Select para escolher o pedido
          <label htmlFor="pedido">Pedido: </label>
          <select id="pedido" value={idPedido} onChange={(e) => setIdPedido(e.target.value)} required>
            <option value="">Selecione um pedido</option>
            Mapeia a lista de pedidos para criar as opções
            {pedidos.map(pedido => (
              <option key={pedido.id} value={pedido.id}>Pedido #{pedido.numero_pedido}</option>
            ))}
          </select>

          Select para escolher o produto
          <label htmlFor="produto">Produto: </label>
          <select id="produto" value={idProduto} onChange={(e) => setIdProduto(e.target.value)} required>
            <option value="">Selecione um produto</option>
            Mapeia a lista de produtos para criar as opções
            {produtos.map(produto => (
              <option key={produto.id} value={produto.id}>
                {produto.nome || produto.nome_produto || `Produto ID: ${produto.id}`}
              </option>
            ))}
          </select>

          Campo para quantidade
          <label htmlFor="quantidade">Quantidade: </label>
          <input 
            type="number" 
            placeholder='Digite a quantidade' 
            value={quantidade} 
            onChange={(e) => setQuantidade(e.target.value)} 
            required 
          />
          
          Campo para total unitário
          <label htmlFor="total_unitario">Total unitario: </label>
          <input 
            type="number" 
            step="1" 
            placeholder='Digite o Total unitario' 
            value={total_unitario} 
            onChange={(e) => setTotalUnitario(e.target.value)} 
            required 
          />
          
          Botão de submissão com texto dinâmico
          <button type="submit" style={{background: editando ? '#28a745' : '#007bff'}}>
            {editando ? 'Salvar Alterações' : 'Cadastrar'}
          </button>
          
          Botão para cancelar edição (só aparece no modo edição)
          {editando && (
            <button type="button" onClick={cancelarEdicao} style={{background: '#6c757d', marginLeft: '10px'}}>
              Cancelar
            </button>
          )}
        </form>
      </div>
    </>
  )
}

export default App*/}