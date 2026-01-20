import './App.css'
import React from 'react'
import Header from './components/Header/Header'
import RestaurantCard from './components/RestaurantCard/RestaurantCard'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import MenuPage from './components/MenuPage/MenuPage'

// 1. Criamos um componente para a Home para não poluir o App.jsx
const Home = () => (
  <div className='min-h-screen bg-[#FDFDFD] pb-10'>
    <Header />
    <main className='max-w-6xl mx-auto p-6 md:p-10'>
      <h2 className='text-2xl font-bold text-gray-800 mb-6'>Restaurantes</h2>
      
      {/* Grid para organizar os cards */}
      <div className='flex flex-wrap gap-6 justify-center md:justify-start'>
        <RestaurantCard />
        {/* Você pode adicionar mais cards aqui se quiser */}
      </div>
    </main>
  </div>
);

function App() {
  return (
    <Router>
      <div className='container-fluid'>
        <Routes>
          {/* 1. Definimos que na rota '/' (inicial) aparece a Home */}
          <Route path="/" element={<Home />} />
          
          {/* 2. Definimos que na rota '/menupage' aparece apenas o MenuPage */}
          <Route path='/menupage' element={<MenuPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App