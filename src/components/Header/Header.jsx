import React from "react";
import "./Header.css";

const Header = () => {
  
  // Função para fazer o scroll suave até a seção de restaurantes
  const scrollToRestaurantes = () => {
    const section = document.getElementById("restaurantes-list");
    
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({
        top: window.innerHeight,
        behavior: "smooth"
      });
    }
  };

  return (
    <header className="relative bg-orange-600 text-white overflow-hidden shadow-2xl">
      {/* Decoração de fundo (Bolhas de cor para dar profundidade) */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-red-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

      <div className="relative z-10 py-24 px-6 flex flex-col items-center text-center">
        
        {/* Nome do Portal com Ícone Personalizado */}
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-white text-orange-600 p-2 rounded-xl rotate-3 shadow-lg">
            <span className="text-3xl">📍</span>
          </div>
          <h2 className="text-4xl font-black italic tracking-tighter">
            Point de Bauru
          </h2>
        </div>

        {/* Título com Gradiente de Texto */}
        <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[0.9] tracking-tight drop-shadow-2xl">
          ONDE A FOME <br />
          <span className="text-yellow-400">ENCONTRA O SABOR</span>
        </h1>

        {/* Descrição em Bloco */}
        <div className="max-w-xl bg-black/10 backdrop-blur-sm p-6 rounded-3xl border border-white/5">
          <p className="text-lg md:text-xl font-medium leading-relaxed text-white">
            Explore os melhores carrinhos de lanche da cidade. Do clássico Bauru
            às porções mais generosas, tudo em um só lugar.
          </p>
        </div>

        {/* Botão de Ação Único com Scroll */}
        <div className="mt-12">
          <button
            onClick={scrollToRestaurantes}
            className="bg-white text-orange-600 px-12 py-6 rounded-2xl font-black text-2xl shadow-xl hover:bg-yellow-400 hover:text-orange-900 transition-all active:scale-95 group flex items-center gap-3"
          >
            Ver Restaurantes 🍔
            <span className="group-hover:translate-y-1 transition-transform">
              ↓
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;