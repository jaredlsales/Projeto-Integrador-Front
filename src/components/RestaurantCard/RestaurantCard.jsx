import React from "react";
import "./RestaurantCard.css";

const RestaurantCard = () => {
    return (
        <div className="bg-white rounded-xl w-75 shadow-md overflow-hidden hover:-translate-y-1 transition-transform duration-200 cursor-pointer border border-gray-100 ">
            
            {/* Container da Imagem */}
            <div className="relative h-40 w-full">
                <img 
                src="https://scc10.com.br/wp-content/uploads/2022/01/hamburguer.jpg" alt="Foto de um Hambúrguer "
                className="w-full h-full object-cover"
                />

            {/* DADO FIXO: Texto "Lanches" escrito direto */}
            <span className="absolute top-2 right-2 bg-white text-gray-800 text-xs font-bold px-3 py-1 rounded-full shadow-sm ">Lanches</span>
            </div>
            
            {/* Conteúdo do Texto */}
            <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800 mb-2 leading-tight ">Bauru Lanches</h3>
                {/* DADO FIXO: Descrição escrita direta */}
                <p className="text-sm text-gray-500 mb-4 leading-relaxed line-clamp-2">Os melhores lanches artesanais da região! Hambúrgueres, hot dogs e muito mais.</p>

                {/* Rodapé com Dados Fixos */}
                <div className="flex justify-between items-center text-xs text-gray-600 font-medium border-t border-gray-100 pt-3 ">
                    <div className="flex items-center gap-1">
                        <span className="text-yellow-500 text-base">⭐ 4.8</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <span className="text-base">🕒 20-30 min</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <span className="text-base">Min. R$ 15,00</span>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default RestaurantCard;