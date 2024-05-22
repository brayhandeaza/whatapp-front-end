import { useState } from "react"
import { archived, chat, logo, settings } from "@/assets"
import "@/styles/Menu.scss"

const Menu: React.FC = () => {
    const [active, setActive] = useState<string>("chat")


    const handleOnActive = (value: string) => {
        setActive(value)
    }

    return (
        <div className="Menu">
            <section>
                <div className="logo">
                    <img src={logo} alt="logo" />
                </div>
                <nav>
                    <div onClick={() => handleOnActive("chat")} className={`icon-container ${active === "chat" ? "active" : ""}`}>
                        <img src={chat} alt="logo" />
                    </div>
                    <div onClick={() => handleOnActive("archived")} className={`icon-container ${active === "archived" ? "active" : ""}`}>
                        <img src={archived} alt="logo" />
                    </div>
                </nav>
            </section>
            <footer>
                <div onClick={() => handleOnActive("settings")} className={`icon-container ${active === "settings" ? "active" : ""}`}>
                    <img src={settings} alt="logo" />
                </div>
            </footer>
        </div>
    )
}

export default Menu