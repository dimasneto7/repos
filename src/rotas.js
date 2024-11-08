import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Main from './pages/Main'
import Repositorio from './pages/Repositorio'

const Rotas = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/repositorio/:repositorio" element={<Repositorio />} />
    </Routes>
  )
}

export default Rotas
