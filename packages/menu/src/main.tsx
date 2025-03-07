import './index.css'

import { DeepDishProvider } from '@deepdish/core/context'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './app'

const root = document.getElementById('root')

if (!root) {
  throw new Error('No root element found.')
}

createRoot(root).render(
  <StrictMode>
    <DeepDishProvider>
      <App />
    </DeepDishProvider>
  </StrictMode>,
)
