import React, { useEffect, useState } from "react";
import ProductCard from "../ProductCard/ProductCard";
import { useNavigate } from 'react-router-dom'
import CartModal from "../CartModal/CartModal";
import CheckoutModal from "../CheckoutModal/CheckoutModal";
import apiLocal from "../../api/apiLocal";

function MenuPage() {
    const navigate = useNavigate();
    
    // Estados de Controle
    const [categoriaAtiva, setCategoriaAtiva] = useState('Lanches');
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

    // LÓGICA DO CARRINHO
    const [carrinho, setCarrinho] = useState([]);

    const adicionarAoCarrinho = (produto) => {
        setCarrinho((itensAtuais) => {
            const itemExiste = itensAtuais.find((item) => item.nome === produto.nome);
            if (itemExiste) {
                return itensAtuais.map((item) =>
                    item.nome === produto.nome ? { ...item, quantidade: item.quantidade + 1 } : item
                );
            }
            return [...itensAtuais, { ...produto, quantidade: 1 }];
        });
    };

    const diminuirQuantidade = (nome) => {
        setCarrinho((itensAtuais) => {
            const itemExiste = itensAtuais.find((item) => item.nome === nome);
            if (itemExiste && itemExiste.quantidade > 1) {
                return itensAtuais.map((item) =>
                    item.nome === nome ? { ...item, quantidade: item.quantidade - 1 } : item
                );
            }
            return itensAtuais.filter((item) => item.nome !== nome);
        });
    };

    const removerTotalmente = (nome) => {
        setCarrinho(carrinho.filter(item => item.nome !== nome));
    };

    // Cálculos Dinâmicos
    const totalCarrinho = carrinho.reduce((acc, item) => acc + (parseFloat(item.preco) * item.quantidade), 0);
    const totalItens = carrinho.reduce((acc, item) => acc + item.quantidade, 0);

    // Função auxiliar para pegar a quantidade de um produto específico
    const getQuantidade = (nome) => {
        const item = carrinho.find(i => i.nome === nome);
        return item ? item.quantidade : 0;
    };


    //Hook - VisualizarProdutos

    const [produtosBanco, setProdutosBanco] = useState([]);

    useEffect(() => {
        async function buscarProdutos() {
            try {
                const resposta = await apiLocal.get("/VisualizarProdutos");
                setProdutosBanco(resposta.data);// Aqui os dados do seu MySQL entram no React
                console.log(resposta.data)
            } catch (error) {
                console.error("Erro ao conectar com Back-end", error);
            }
        }
        buscarProdutos();
    }, []);

    //Hook - Categorias

    const [categoriasBanco, setCategoriasBanco] = useState([]);

    useEffect(() => {
        async function loadDados() {
            try {
                // Busca os produtos
                const resProdutos = await apiLocal.get("/VisualizarProdutos");
                setProdutosBanco(resProdutos.data);

                // Busca as categorias (Sua rota: /VisualizarCategoria)
                const resCategorias = await apiLocal.get("/VisualizarCategoria");
                setCategoriasBanco(resCategorias.data);
                
                // Define a primeira categoria do banco como ativa por padrão
                if (resCategorias.data.length > 0) {
                    setCategoriaAtiva(resCategorias.data[0].categoria);
                }
            } catch (error) {
                console.error("Erro ao carregar dados:", error);
            }
        }
        loadDados();
    }, []);

   const produtosFiltrados = produtosBanco.filter(prod => {
    // 1. Encontra o objeto da categoria que tem o nome igual ao botão clicado
    const categoriaSelecionada = categoriasBanco.find(c => c.categoria === categoriaAtiva);
    
    // 2. Compara o idCategoria do produto com o ID da categoria do botão
    return prod.idCategoria === categoriaSelecionada?.id;
    });


    return (
        <div className="min-h-screen bg-gray-50 pb-10 text-left relative">
            <header className="bg-orange-500 text-white p-6 md:px-20 flex flex-col items-start">
                <button onClick={() => navigate('/')} className="flex items-center gap-2 mb-4 font-medium">
                    <span className="text-xl">←</span> <span>Voltar</span>
                </button>
                <h1 className="text-4xl font-bold">Bauru Lanches</h1>
                <p className="opacity-90 text-sm mt-1">Os melhores lanches da região!</p>
                <div className="flex gap-4 mt-3 text-sm font-medium">
                    <span>⭐ 4.8</span> <span>🕒 20-30 min</span>
                </div>
            </header>

            {/* Navegação de Categorias */}
            <nav className="flex justify-center gap-4 my-8 overflow-x-auto px-4">
                {categoriasBanco.map((cat) => (
                    <button 
                        key={cat.id}
                        onClick={() => setCategoriaAtiva(cat.categoria)}
                        className={`${categoriaAtiva === cat.categoria 
                            ? 'bg-white text-gray-800 border-gray-300 shadow-sm' 
                            : 'bg-gray-200 text-gray-500'} 
                            px-6 py-2 rounded-full font-bold transition-all whitespace-nowrap`}
                    >
                        {cat.categoria}
                    </button>
                ))}
            </nav>

            {/* Exibição Condicional (TODAS AS CATEGORIAS VOLTARAM) */}
            <main className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {categoriaAtiva === 'Lanches' && (
                    <>
                        <ProductCard 
                            nome="X-Burger Especial" 
                            ingredientes="Hambúrguer artesanal, queijo cheddar..." 
                            preco="18.90" 
                            imagemUrl="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500"
                            quantidade={getQuantidade("X-Burger Especial")}
                            onAdd={() => adicionarAoCarrinho({nome: "X-Burger Especial", preco: "18.90", imagemUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500"})}
                            onRemove={() => diminuirQuantidade("X-Burger Especial")}
                        />
                        <ProductCard 
                            nome="Hot Dog Completo" 
                            ingredientes="Salsicha premium, molho de tomate..." 
                            preco="12.90" 
                            imagemUrl="https://images.unsplash.com/photo-1541214113241-21578d2d9b62?w=500"
                            quantidade={getQuantidade("Hot Dog Completo")}
                            onAdd={() => adicionarAoCarrinho({nome: "Hot Dog Completo", preco: "12.90", imagemUrl: "https://images.unsplash.com/photo-1541214113241-21578d2d9b62?w=500"})}
                            onRemove={() => diminuirQuantidade("Hot Dog Completo")}
                        />
                    </>
                )}

                {categoriaAtiva === 'Porções' && (
                    <>
                        <ProductCard 
                            nome="Batata Frita P" 
                            ingredientes="Porção individual" 
                            preco="8.00" 
                            imagemUrl="https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500"
                            quantidade={getQuantidade("Batata Frita P")}
                            onAdd={() => adicionarAoCarrinho({nome: "Batata Frita P", preco: "8.00", imagemUrl: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500"})}
                            onRemove={() => diminuirQuantidade("Batata Frita P")}
                        />
                    </>
                )}

                {categoriaAtiva === 'Bebidas' && (
                    <>
                        <ProductCard 
                            nome="Coca Lata" 
                            ingredientes="350ml" 
                            preco="5.00" 
                            imagemUrl="https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500"
                            quantidade={getQuantidade("Coca Lata")}
                            onAdd={() => adicionarAoCarrinho({nome: "Coca Lata", preco: "5.00", imagemUrl: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500"})}
                            onRemove={() => diminuirQuantidade("Coca Lata")}
                        />
                    </>
                )}
            </main>

            {/* Botão flutuante do Carrinho */}
            <div className="fixed bottom-6 right-6 z-40">
                <button 
                    onClick={() => setIsCartOpen(true)}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-4 rounded-full shadow-2xl flex items-center gap-4 transition-transform active:scale-95"
                >
                    <div className="flex items-center gap-2 border-r border-white/30 pr-4">
                        <span className="text-xl">🛒</span>
                        <span className="font-bold text-lg">{totalItens} itens</span>
                    </div>
                    <span className="font-black text-lg">R$ {totalCarrinho.toFixed(2)}</span>
                </button>
            </div>

            <CartModal 
                isOpen={isCartOpen} 
                onClose={() => setIsCartOpen(false)} 
                itens={carrinho}
                total={totalCarrinho}
                onRemove={removerTotalmente}
                onCheckout={() => {
                    setIsCartOpen(false);
                    setIsCheckoutOpen(true);
                }}
            />

            <CheckoutModal 
                isOpen={isCheckoutOpen} 
                onClose={() => setIsCheckoutOpen(false)} 
                total={totalCarrinho.toFixed(2)} 
            />

            <main className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {produtosFiltrados.map((prod) => (
                    <ProductCard 
                        key={prod.id}
                        nome={prod.nome_produto}
                        ingredientes={prod.descricao}
                        preco={prod.valor.toFixed(2)}
                        imagemUrl="https://images.unsplash.com/photo-1556710807-a9261a86064c?w=500" // Uma foto de refri padrão
                        quantidade={carrinho.find(item => item.id === prod.id)?.quantidade || 0}
                        onAdd={() => adicionarAoCarrinho({
                            id: prod.id, 
                            nome: prod.nome_produto, 
                            preco: prod.valor
                        })}
                        onRemove={() => diminuirQuantidade(prod.id)}
                    />
                ))}
            </main>

        </div>
    
        
    );
}

export default MenuPage;
