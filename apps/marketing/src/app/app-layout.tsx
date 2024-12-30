import Footer from '@/components/footer'
import Header from '@/components/header'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <Header />
      {children}
      <Footer />
    </div>
  )
}
