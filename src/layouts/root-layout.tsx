// import { Header } from "../components/Header"
import { Footer } from "../components/Footer"

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <>
      {/* <Header /> */}
      {children}
      <Footer />
    </>
  )
}
