// Импорт необходимых компонентов
import { Outlet } from "react-router-dom"
import { Header } from "../components/header"
import { Container } from "../components/container"
import { Navbar } from "../components/nav-bar"
import { BalancedCard } from "../components/balanced-card"

// структуру страницы
export const Layout = () => {
  return (
    <>
      <Header />
      <Container>
        <div className="flex gap-6 w-full">
          <div className="w-64">
            <Navbar />
          </div>
          <div className="flex-1">
            <Outlet />
          </div>
          <div className="w-64">
            <BalancedCard />
          </div>
        </div>
      </Container>
    </>
  )
}
