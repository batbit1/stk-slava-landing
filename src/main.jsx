import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const root = document.getElementById('root')
if (!root) {
  console.error('[main.jsx] Не найден элемент #root — проверьте index.html')
  const p = document.createElement('p')
  p.style.margin = '24px'
  p.style.fontFamily = 'system-ui, sans-serif'
  p.textContent = 'Ошибка: в index.html должен быть элемент <div id="root"></div>'
  document.body.appendChild(p)
} else {
  createRoot(root).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}
