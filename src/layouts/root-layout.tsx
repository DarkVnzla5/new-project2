import { Footer } from "../components/Footer"
import { Header } from "../components/Header"

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}
