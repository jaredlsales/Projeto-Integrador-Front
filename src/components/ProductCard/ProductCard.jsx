import React from "react";

function ProductCard () {
    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 flex flex-col h-full">

            {/* Imagem do Produto */}
            <img src="https://scc10.com.br/wp-content/uploads/2022/01/hamburguer.jpg" alt="Foto de um Hambúrguer" className="w-full h-48 object-cover" />

            {/* Detalhes */}
            <div className="p-4 flex-col grow">#
                <h3 className="text-lg font-bold text-gray-800 mb-1">X-Bacon</h3>
                <p className="text-sm text-gray-500 mb-4 line-clamp-2 grow">Pão, hambúrguer, bacon, queijo, maionese, ketchup, alface e tomate.</p>
            </div>

            {/* Preço e Botão Adicionar */}
            <div className="flex justify-between items-center mt-auto">
                <span className="text-xl font-bold text-orange-600">R$ 15,00</span>
                <button className="bg-orange-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded-lg flex items gap-1 transition-colors">
                    <span className="text-lg">Adicionar</span>
                </button>

            </div>
            

        </div>
    )
}

export default ProductCard