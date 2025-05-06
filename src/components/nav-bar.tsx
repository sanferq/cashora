import { NavButton } from "./nav-button"
import { Card, CardBody } from "@heroui/react"

export const Navbar = () => {
  return (
    <nav>
      <Card className="">
        <CardBody>
          <ul className="flex flex-col gap-3">
            <li>
              <NavButton href="/expenses">Расходы</NavButton>
            </li>
            <li>
              <NavButton href="/income">Доходы</NavButton>
            </li>
            <li>
              <NavButton href="/transactions">Операции</NavButton>
            </li>
          </ul>
        </CardBody>
      </Card>
    </nav>
  )
}
