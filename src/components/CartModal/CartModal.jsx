import React from "react";

const CartModal = ({ isOpen, onClose, onCheckout, itens, total, onRemove }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/50 transition-opacity" onClick={onClose} />

      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col p-6 animate-slide-in">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-orange-600">Seu Carrinho</h2>
          <button onClick={onClose} className="text-gray-400 text-2xl">✕</button>
        </div>

        {/* LISTA DINÂMICA */}
        <div className="flex-grow overflow-y-auto space-y-4">
          {itens.length === 0 ? (
            <p className="text-center text-gray-500 mt-10">Seu carrinho está vazio.</p>
          ) : (
            itens.map((item, index) => (
              <div key={index} className="bg-gray-100 p-4 rounded-xl flex gap-4 items-center relative">
                <img src={item.imagemUrl} className="w-20 h-20 rounded-lg object-cover" alt={item.nome} />
                <div className="flex-grow text-left">
                  <h3 className="font-bold text-gray-800">{item.nome}</h3>
                  <p className="text-sm text-gray-500">Quantidade: {item.quantidade}</p>
                  <p className="font-bold text-orange-600 mt-1">R$ {item.preco}</p>
                </div>
                <button onClick={() => onRemove(item.id)} className="text-red-500 p-2 hover:bg-red-50 rounded-lg">
                  🗑️
                </button>
              </div>
            ))
          )}
        </div>

        <div className="mt-auto border-t pt-6">
          <div className="bg-gray-200 p-4 rounded-xl flex justify-between items-center mb-6">
            <span className="text-lg font-medium text-gray-700">Total:</span>
            <span className="text-2xl font-black text-orange-600">R$ {total.toFixed(2)}</span>
          </div>
          <button 
            disabled={itens.length === 0}
            onClick={onCheckout}
            className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white py-4 rounded-xl font-bold text-lg shadow-lg transition-all active:scale-95"
          >
            Finalizar Pedido com PIX
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartModal;