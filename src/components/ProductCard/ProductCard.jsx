import React, { useState } from "react";

const ProductCard = ({ 
  nome, 
  ingredientes, 
  preco, 
  imagemUrl, 
  quantidade, 
  onAdd, 
  onRemove 
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 relative group hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badge de Destaque */}
      {quantidade > 0 && (
        <div className="absolute top-3 right-3 z-10 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
          {quantidade} no carrinho
        </div>
      )}
      
      {/* Imagem do Produto */}
      <div className="h-48 overflow-hidden relative">
        <img 
          src={imagemUrl || "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop"} 
          alt={nome}
          className={`w-full h-full object-cover transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      {/* Conteúdo */}
      <div className="p-4">
        {/* Nome e Preço */}
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-800 truncate pr-2 flex-1">{nome}</h3>
          <span className="text-xl font-black text-orange-600 whitespace-nowrap ml-2">
            R$ {typeof preco === 'number' ? preco.toFixed(2) : preco}
          </span>
        </div>
        
        {/* Descrição */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-2 min-h-[2.5rem]">
          {ingredientes}
        </p>
        
        {/* Botões de Controle */}
        <div className="flex items-center justify-between">
          {quantidade > 0 ? (
            <>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={onRemove}
                  className="w-10 h-10 rounded-full bg-gray-100 text-gray-700 flex items-center justify-center hover:bg-gray-200 transition-colors text-lg font-bold shadow-sm active:scale-95"
                  title="Remover uma unidade"
                >
                  -
                </button>
                
                <span className="text-lg font-bold min-w-[28px] text-center text-gray-800 animate-pulse">
                  {quantidade}
                </span>
                
                <button 
                  onClick={onAdd}
                  className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white flex items-center justify-center hover:from-orange-600 hover:to-orange-700 transition-all text-lg font-bold shadow-md active:scale-95"
                  title="Adicionar mais uma"
                >
                  +
                </button>
              </div>
              
              <div className="text-right">
                <p className="text-xs text-gray-500">Subtotal</p>
                <p className="font-bold text-gray-800 text-lg animate-pulse">
                  R$ {(parseFloat(preco) * quantidade).toFixed(2)}
                </p>
              </div>
            </>
          ) : (
            <button 
              onClick={onAdd}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-3 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 active:scale-95 group"
            >
              <span className="text-lg group-hover:scale-125 transition-transform">+</span>
              <span>Adicionar ao Carrinho</span>
            </button>
          )}
        </div>
      </div>
      
      {/* Efeito de destaque no hover */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-orange-400 rounded-2xl transition-all duration-300 pointer-events-none" />
    </div>
  );
};

export default ProductCard;