import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Rotas from './rotas'
import GlobalStyle from './styles/global'

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Rotas />
    </BrowserRouter>
  )
}

export default App
