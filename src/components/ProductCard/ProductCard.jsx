import React from "react";

// Adicionamos onAdd e onRemove nas propriedades (props)
const ProductCard = ({ nome, ingredientes, preco, imagemUrl, onAdd, onRemove, quantidade }) => {

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 flex flex-col h-full text-left relative">
            
            {/* Círculo laranja com a quantidade no topo da imagem */}
            {quantidade > 0 && (
                <span className="absolute top-2 right-2 bg-orange-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shadow-md z-10">
                    {quantidade}
                </span>
            )}

            <div className="w-full h-64 overflow-hidden">
                <img src={imagemUrl} alt={nome} className="w-full h-full object-cover" />
            </div>

            <div className="p-5 flex-grow">
                <h3 className="text-xl font-bold text-gray-800 mb-1">{nome}</h3>
                <p className="text-sm text-gray-500 mb-4">{ingredientes}</p>
            </div>

            <div className="flex justify-between items-center py-3 px-5 border-t border-gray-100">
                <span className="text-xl font-bold text-orange-600">R$ {preco}</span>
                
                {/* Lógica dos botões conectada ao carrinho global */}
                {!quantidade || quantidade === 0 ? (
                    <button 
                        onClick={onAdd} // Chama a função de adicionar do MenuPage
                        className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-2xl font-medium shadow-lg transition-all active:scale-95"
                    >
                        + Adicionar
                    </button>
                ) : (
                    <div className="flex items-center gap-3">
                        <button 
                            onClick={onRemove} // Chama a função de remover do MenuPage
                            className="border border-orange-500 text-orange-500 w-8 h-8 rounded-lg font-bold hover:bg-orange-50 transition-colors flex items-center justify-center"
                        >
                            -
                        </button>
                        <span className="font-bold text-gray-800">{quantidade}</span>
                        <button 
                            onClick={onAdd} // Chama a função de adicionar do MenuPage
                            className="bg-orange-500 text-white w-8 h-8 rounded-lg font-bold shadow-md hover:bg-orange-600 transition-colors flex items-center justify-center"
                        >
                            +
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProductCard