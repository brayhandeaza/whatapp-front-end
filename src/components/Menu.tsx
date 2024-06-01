import { useContext, useEffect, useState } from "react"
import { archived, chat, logo, settings } from "@/assets"
import "@/styles/Menu.scss"
import { Link, useLocation } from "react-router-dom"
import { MainContext } from "@/contexts"


const Menu: React.FC = () => {
    const [active, setActive] = useState<string>("chat")
    const location = useLocation()
    const { setConversations } = useContext(MainContext)



    const handleOnActive = (value: string) => {
        setConversations([])
        setActive(value)
    }


    useEffect(() => {
        setActive(location.pathname)

    }, [])

    return (
        <div className="Menu">
            <section>
                <Link to={"/"}>
                    <div className="logo">
                        <img src={logo} alt="logo" />
                    </div>
                </Link>
                <nav>
                    <Link to={"/"}>
                        <div onClick={() => handleOnActive("chat")} className={`icon-container ${active === "/" ? "active" : ""}`}>
                            <img src={chat} alt="logo" />
                        </div>
                    </Link>
                    <Link to={"/archived"}>
                        <div onClick={() => handleOnActive("archived")} className={`icon-container ${active === "/archived" ? "active" : ""}`}>
                            <img src={archived} alt="logo" />
                        </div>
                    </Link>
                </nav>
            </section>
            <footer>
                <Link to={"/settings"}>
                    <div onClick={() => handleOnActive("settings")} className={`icon-container ${active === "/settings" ? "active" : ""}`}>
                        <img src={settings} alt="logo" />
                    </div>
                </Link>
            </footer>
        </div>
    )
}

export default Menu