import { Link } from "react-router-dom"
import { Button } from "./button"

type Props = {
  children: React.ReactNode
  href: string
}

export const NavButton: React.FC<Props> = ({ children, href }) => {
  return (
    <Button className="flex justify-start text-l" fullWidth>
      <Link to={href} className="w-full">
        {children}
      </Link>
    </Button>
  )
}
