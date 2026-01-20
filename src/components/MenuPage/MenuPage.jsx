import React from "react";
import ProductCard from "../ProductCard/ProductCard";
import { useNavigate } from 'react-router-dom'

function MenuPage () {

    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50 pb-10">
            {/* Cabeçalho do Restaurante */}
            <header className="bg-linear-to-r from-orange-500 to-orange-400 text-white p-4 md:px-10 flex flex-col items-start ">

                {/* BOTÃO VOLTAR - ADICIONE ESTE BLOCO ABAIXO */}
                <button 
                    onClick={() => navigate('/')} // Volta para a Home
                    className="flex items-center gap-2 mb-4 hover:opacity-80 transition-opacity font-medium"
                >
                    <span className="text-xl">←</span> 
                    <span>Voltar</span>
                </button>

                <h1 className="text-3xl font-bold">Bauru Lanches</h1>
                <p className="opacity-90 text-sm mt-1">Os melhores lanches da região! Hambúrgueres artesanais e hot dogs especiais.</p>
                
                <div className="flex gap-4 mt-3 text-sm font-medium"></div>
                <span>⭐ 4.8</span>
                <span>🕒 20-30 min</span>
            </header>

            {/* Navegação de Categorias */}
            <nav className="flex justify-center gap-4 my-8">
                <button className="bg-white border border-gray-300 px-6 py-2 rounded-full font-bold text-gray-700 shadow-sm hover:bg-gray-100">Lanches</button>
                <button className="bg-gray-200 px-6 py-2 rounded-full font-bold text-gray-500 hover:bg-gray-300">Porções</button>
                <button className="bg-gray-200 px-6 py-2 rounded-full font-bold text-gray-500 hover:bg-gray-300">Bebidas</button>
            </nav>

            {/* Grade de Produtos */}
            <main className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <ProductCard
                nome="X-Burger Especial" 
                ingredientes="Hambúrguer artesanal, queijo cheddar, alface, tomate e molho especial."
                preco="18.90"
                imagemUrl="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500"
                />
                <ProductCard 
                nome="Hot Dog Completo" 
                ingredientes="Salsicha premium, molho de tomate, mostarda, maionese e batata palha."
                preco="12.90"
                imagemUrl="https://images.unsplash.com/photo-1541214113241-21578d2d9b62?w=500"
                />
            </main>

        </div>
    )
}

export default MenuPage
