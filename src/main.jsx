import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Header from './component/Header/header'
import Main from './component/Main/main'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Header/>
    <Main/>
  </StrictMode>,
)
