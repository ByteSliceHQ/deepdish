import './index.css'

import { Workbench } from '@/workbench'
import { DeepDishProvider } from '@deepdish/core/context'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { procedures } from './mocks/procedures'

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
        <Workbench procedures={procedures} />
      </DeepDishProvider>
    </StrictMode>,
  )
})
