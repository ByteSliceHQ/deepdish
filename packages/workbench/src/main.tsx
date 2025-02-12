import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Workbench } from '@/components/workbench'

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
      <Workbench />
    </StrictMode>,
  )
})
