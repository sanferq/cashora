import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/react"
import { useContext } from "react"
import { FaRegMoon } from "react-icons/fa"
import { LuSunMedium } from "react-icons/lu"
import { ThemeContext } from "./theme-provider"

export const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext)

  return (
    <Navbar>
      <NavbarBrand>
        <p className="font-bold text-inherit">Cashora</p>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem
          className="lg:flex text-3xl cursor-pointer"
          onClick={() => toggleTheme()}
        >
          {theme === "light" ? <FaRegMoon /> : <LuSunMedium />}
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}
