import { ShoppingBagIcon, ShoppingCartIcon } from "lucide-react"
import { Link, Outlet, useLocation } from "react-router"
import ThemeSelector from "./ThemeSelector";

function NavBar() {
  const isHomePage = useLocation().pathname;

  return (
    <div>
        <div className="navbar bg-base-100 justify-between">
            {/* LOGO */}
            <div>
                <Link to="/">
                    <div className="flex">
                        <ShoppingCartIcon className="size-9"/>
                        <span className="ml-2 text-2xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">POSGRESTORE</span>
                    </div>
                </Link>
            </div>

            {/* RIGHT SECTION */}
            <div className="flex items-center gap-4">
                <ThemeSelector />
                {isHomePage && (
                    <div className="indicator">
                        <div className="flex rounded-full transition-colors">
                            <ShoppingBagIcon />
                            <span className="indicator-item">8</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
        <Outlet />
    </div>
  )
}

export default NavBar