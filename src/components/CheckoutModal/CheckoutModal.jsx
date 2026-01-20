import React from "react";

const CheckoutModal = ({ isOpen, onClose, total }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Overlay mais escuro para foco no checkout */}
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />

      <div className="relative bg-white w-full max-w-lg rounded-3xl p-8 shadow-2xl animate-fade-in">
        {/* Botão Fechar */}
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 text-xl">✕</button>

        <h2 className="text-3xl font-black text-orange-600 mb-8 text-left">Finalizar Pedido</h2>

        <div className="space-y-6">
          {/* Campos de Input */}
          <div className="text-left">
            <label className="block font-bold text-gray-700 mb-2">Nome completo</label>
            <input 
              type="text" 
              placeholder="Seu nome" 
              className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 focus:outline-none focus:border-orange-500"
            />
          </div>

          <div className="text-left">
            <label className="block font-bold text-gray-700 mb-2">Telefone</label>
            <input 
              type="text" 
              placeholder="(11) 99999-9999" 
              className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 focus:outline-none focus:border-orange-500"
            />
          </div>

          {/* Área do PIX (Card Cinza) */}
          <div className="bg-gray-200 rounded-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-bold text-gray-700">Total a pagar:</span>
              <span className="text-2xl font-black text-orange-600">R$ {total}</span>
            </div>
            <p className="text-sm text-gray-600 mb-4 text-left leading-tight">
              Pague com PIX e seu pedido será confirmado instantaneamente!
            </p>

            {/* Input de Copia e Cola */}
            <div className="bg-white rounded-xl p-3 flex items-center gap-2 border border-gray-100">
              <input 
                readOnly 
                value="00020126580014BR.GOV.BCB.PIX0136hc..." 
                className="flex-grow text-xs text-gray-500 truncate bg-transparent focus:outline-none"
              />
              <button className="bg-gray-100 p-2 rounded-lg hover:bg-gray-200 transition-colors">
                📋
              </button>
            </div>
          </div>

          {/* Instruções */}
          <div className="text-left space-y-2">
            <p className="font-bold text-gray-800 flex items-center gap-2">
              <span>🎆</span> Como pagar:
            </p>
            <ol className="text-sm text-gray-600 space-y-1 list-decimal ml-4">
              <li>Abra o app do seu banco</li>
              <li>Escolha a opção PIX Copia e Cola</li>
              <li>Cole o código copiado acima</li>
              <li>Confirme o pagamento</li>
            </ol>
          </div>

          {/* Botão Confirmar */}
          <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-2xl font-black text-lg shadow-lg transition-all active:scale-95">
            Confirmar Pedido
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;