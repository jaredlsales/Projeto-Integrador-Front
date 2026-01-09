import './App.css'
import React from 'react'
import Header from './components/Header/Header'
import RestaurantCard from './components/RestaurantCard/RestaurantCard'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import MenuPage from './components/MenuPage/MenuPage'

function App () {
  return (

    <Router>

      <div className='container'>
        <Routes>
          <Route path='/menupage' element={<MenuPage/>}/>
        </Routes>

      </div>

      <div className='min-h-screen pb-10'>
        <Header/>
        <main className='max-w-6xl mx-auto p-6 md:p-10'>
          <h2 className='text-2xl font-bold text-gray-800 mb-6'>Restaurantes</h2>

          {/* Grid para organizar os cards */}
          <div className='flex flex-wrap gap-6 justify-center md:justify-start'></div>
          <RestaurantCard/>

        </main>
      </div>
    
    </Router>
  )
}

export default App