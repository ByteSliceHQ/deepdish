import { Footer } from '@/components/footer'
import { Header } from '@/components/header'

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-white text-zinc-700">
      <Header />
      {children}
      <Footer />
    </div>
  )
}
