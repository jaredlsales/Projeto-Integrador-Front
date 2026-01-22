import React, { useReducer, useEffect } from "react";

const initialState = {
  nome: "",
  telefone: "",
  isSubmitting: false,
  showSuccess: false,
  copySuccess: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "RESET":
      return {
        ...state,
        nome: "",
        telefone: "",
        isSubmitting: false,
        showSuccess: false,
        copySuccess: false,
      };
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "SET_SUBMITTING":
      return { ...state, isSubmitting: action.value };
    case "SET_SHOW_SUCCESS":
      return { ...state, showSuccess: action.value };
    case "SET_COPY_SUCCESS":
      return { ...state, copySuccess: action.value };
    default:
      return state;
  }
}

const CheckoutModal = ({ isOpen, onClose, total }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { nome, telefone, isSubmitting, showSuccess, copySuccess} = state;

  // PIX code fixo
  const pixCode = "00020126580014BR.GOV.BCB.PIX0136123EXAMPLE";

  // Resetar estado quando modal abre (uma única dispatch)
  useEffect(() => {
    if (isOpen) {
      const newOrderId = `BAU${Math.floor(1000 + Math.random() * 9000)}`;
      dispatch({ type: "RESET", payload: { orderId: newOrderId } });
    }
  }, [isOpen]);

  // Fechar com ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  // Formatar telefone automaticamente
  const formatPhone = (value) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 10) {
      return numbers.replace(/^(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3").trim();
    }
    return numbers.replace(/^(\d{2})(\d{5})(\d{4})/, "($1) $2-$3").trim();
  };

  const handleTelefoneChange = (e) => {
    const formatted = formatPhone(e.target.value);
    dispatch({ type: "SET_FIELD", field: "telefone", value: formatted });
  };

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(pixCode)
      .then(() => {
        dispatch({ type: "SET_COPY_SUCCESS", value: true });
        setTimeout(() => dispatch({ type: "SET_COPY_SUCCESS", value: false }), 2000);
      })
      .catch(() => {
        // opcional: tratar erro de clipboard
      });
  };

  // FUNÇÃO DE SUBMISSÃO COM RETORNO PARA O USUÁRIO
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nome.trim() || !telefone.trim()) {
      alert("Por favor, preencha seu nome e telefone");
      return;
    }

    dispatch({ type: "SET_SUBMITTING", value: true });

    // Simular processamento e dar retorno
    setTimeout(() => {
      dispatch({ type: "SET_SUBMITTING", value: false });

      // Ativa a tela de sucesso interna do modal
      dispatch({ type: "SET_SHOW_SUCCESS", value: true });
    }, 1500);
  };

  const handleBackToMenu = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />

      <div className="relative bg-white w-full max-w-lg rounded-3xl p-8 shadow-2xl animate-fade-in">
        {/* Botão Fechar */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 text-xl hover:text-gray-600 transition-colors"
        >
          ✕
        </button>

        {!showSuccess ? (
          <>
            <h2 className="text-3xl font-black text-orange-600 mb-8 text-left">Finalizar Pedido</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="text-left">
                <label className="block font-bold text-gray-700 mb-2">Nome completo</label>
                <input
                  type="text"
                  value={nome}
                  onChange={(e) => dispatch({ type: "SET_FIELD", field: "nome", value: e.target.value })}
                  placeholder="Seu nome"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 focus:outline-none focus:border-orange-500"
                  required
                />
              </div>

              <div className="text-left">
                <label className="block font-bold text-gray-700 mb-2">Telefone</label>
                <input
                  type="text"
                  value={telefone}
                  onChange={handleTelefoneChange}
                  placeholder="(11) 99999-9999"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 focus:outline-none focus:border-orange-500"
                  required
                />
              </div>

              <div className="bg-gray-200 rounded-2xl p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-bold text-gray-700">Total a pagar:</span>
                  <span className="text-2xl font-black text-orange-600">R$ {total}</span>
                </div>
                <p className="text-sm text-gray-600 mb-4 text-left leading-tight">
                  Pague com PIX e seu pedido será confirmado instantaneamente!
                </p>

                <div className="bg-white rounded-xl p-3 flex items-center gap-2 border border-gray-100">
                  <input
                    readOnly
                    value={pixCode}
                    className="flex-grow text-xs text-gray-500 truncate bg-transparent focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={copyToClipboard}
                    className={`p-2 rounded-lg transition-colors ${copySuccess ? "bg-green-100 text-green-600" : "bg-gray-100 hover:bg-gray-200"}`}
                  >
                    {copySuccess ? "✓" : "📋"}
                  </button>
                </div>
              </div>

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

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-2xl font-black text-lg shadow-lg transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processando...
                  </>
                ) : (
                  "Confirmar Pedido"
                )}
              </button>
            </form>
          </>
        ) : (
          /* MENSAGEM DE SUCESSO EXIBIDA APÓS O ALERTA */
          <div className="animate-fade-in text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">🎉</span>
            </div>

            <h2 className="text-3xl font-black text-green-600 mb-3">Pedido Confirmado!</h2>

            <button
              onClick={handleBackToMenu}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-2xl font-black text-lg shadow-lg transition-all active:scale-95"
            >
              Voltar ao Cardápio
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutModal;
