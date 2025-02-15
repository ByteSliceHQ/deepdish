import './index.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Workbench } from '@/workbench'
import { DeepDishProvider } from '@deepdish/core/context'

const root = document.getElementById('root')

if (!root) {
  throw new Error('No root element found.')
}

async function enableMocking() {
  const { worker } = await import('./mocks/browser')

  return worker.start()
}

enableMocking().then(() => {
  createRoot(root).render(
    <StrictMode>
      <DeepDishProvider>
        <Workbench />
      </DeepDishProvider>
    </StrictMode>,
  )
})
