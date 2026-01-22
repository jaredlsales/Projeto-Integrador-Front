import React, { useEffect, useState } from "react";
import ProductCard from "../ProductCard/ProductCard";
import {useNavigate } from 'react-router-dom'
import CartModal from "../CartModal/CartModal";
import CheckoutModal from "../CheckoutModal/CheckoutModal";
import apiLocal from "../../api/apiLocal";

function MenuPage() {
    const navigate = useNavigate();
    
    // Estados de Controle
    const [categoriaAtiva, setCategoriaAtiva] = useState('Bebidas');
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

    // LÓGICA DO CARRINHO
    const [carrinho, setCarrinho] = useState([]);

    const adicionarAoCarrinho = (produto) => {
        setCarrinho((itensAtuais) => {
            const itemExiste = itensAtuais.find((item) => item.id === produto.id);
            if (itemExiste) {
                return itensAtuais.map((item) =>
                    item.id === produto.id ? { ...item, quantidade: item.quantidade + 1 } : item
                );
            }
            return [...itensAtuais, { 
                ...produto, 
                quantidade: 1,
                // Adiciona a imagem ao produto no carrinho também
                imagemUrl: produto.imagemUrl 
            }];
        });
    };

    const diminuirQuantidade = (id) => {
        setCarrinho((itensAtuais) => {
            const itemExiste = itensAtuais.find((item) => item.id === id);
            if (itemExiste && itemExiste.quantidade > 1) {
                return itensAtuais.map((item) =>
                    item.id === id ? { ...item, quantidade: item.quantidade - 1 } : item
                );
            }
            return itensAtuais.filter((item) => item.id !== id);
        });
    };

    const removerTotalmente = (id) => {
        setCarrinho(carrinho.filter(item => item.id !== id));
    };

    // Cálculos Dinâmicos
    const totalCarrinho = carrinho.reduce((acc, item) => acc + (parseFloat(item.preco) * item.quantidade), 0);
    const totalItens = carrinho.reduce((acc, item) => acc + item.quantidade, 0);

    // FUNÇÃO PARA IMAGEM POR CATEGORIA
    const getImagemPorCategoria = (categoria) => {
        const imagens = {
            'Bebidas': 'https://images.unsplash.com/photo-1553456558-aff63285bdd1?w=500&auto=format&fit=crop', // Refrigerante
            'Lanches': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop', // Hambúrguer
            'Porções': 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=500&auto=format&fit=crop' // Batata frita
        };
        return imagens[categoria] || 'https://images.unsplash.com/photo-1556710807-a9261a86064c?w=500&auto=format&fit=crop';
    };

    const [produtosBanco, setProdutosBanco] = useState([]);
    const [categoriasBanco, setCategoriasBanco] = useState([]);

    useEffect(() => {
        async function loadDados() {
            try {
                const resProdutos = await apiLocal.get("/VisualizarProdutos");
                setProdutosBanco(resProdutos.data);

                const resCategorias = await apiLocal.get("/VisualizarCategoria");
                setCategoriasBanco(resCategorias.data);
                
                // Garanta que a categoria ativa seja "Bebidas" inicialmente
                if (categoriaAtiva !== 'Bebidas') {
                    setCategoriaAtiva('Bebidas');
                }
            } catch (error) {
                console.error("Erro ao carregar dados:", error);
            }
        }
        loadDados();
    }, []);

    const produtosFiltrados = produtosBanco.filter(prod => {
        const categoriaNoBanco = categoriasBanco.find(c => 
            c.categoria.trim().toLowerCase() === categoriaAtiva.trim().toLowerCase()
        );
        
        if (!categoriaNoBanco) return false;
        
        return prod.idCategoria === categoriaNoBanco.id;
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

            {/* Exibição Dinâmica do Banco de Dados */}
            <main className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {produtosFiltrados.length > 0 ? (
                    produtosFiltrados.map((prod) => (
                        <ProductCard 
                            key={prod.id}
                            nome={prod.nome_produto}
                            ingredientes={prod.descricao}
                            preco={prod.valor.toFixed(2)}
                            imagemUrl={getImagemPorCategoria(categoriaAtiva)} // ← Imagem por categoria
                            quantidade={carrinho.find(item => item.id === prod.id)?.quantidade || 0}
                            onAdd={() => adicionarAoCarrinho({
                                id: prod.id, 
                                nome: prod.nome_produto, 
                                preco: prod.valor,
                                imagemUrl: getImagemPorCategoria(categoriaAtiva) // ← Passa a imagem também
                            })}
                            onRemove={() => diminuirQuantidade(prod.id)}
                        />
                    ))
                ) : (
                    <p className="col-span-full text-center text-gray-500 py-10">
                        Nenhum produto encontrado em "{categoriaAtiva}"
                    </p>
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

            {/* IMPORTANTE: Certifique-se de passar a função removerTotalmente */}
            <CartModal 
                isOpen={isCartOpen} 
                onClose={() => setIsCartOpen(false)} 
                itens={carrinho}
                total={totalCarrinho}
                onRemove={removerTotalmente} // ← Esta função deve estar sendo passada
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
        </div>

        
    );
}

export default MenuPage;