import React from "react";
import "./Header.css";

const Header = () => {
    return(
        <>
        <header className="w-full h-62.5 bg-linear-to-r from-orange-500 to-orange-400 flex flex-col justify-center items-center text-white px-4 text-center ">
            <h1 className="text-6xl font-bold mb-2">Peça comida online</h1>
            <p className="text-lg opacity-90">Escolha seu restaurante favorito</p>
        </header>
        </>
    )
}

export default Header;