import "../styles/SighUp.scss"
import { useState } from "react"
import { logo } from '@/assets'
import axios from "axios"

const SighUp = () => {
    const [isLogin, setIsLogin] = useState<boolean>(true)
    const [fullName, setFullName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [error, setError] = useState<string>("")
    const [canSubmit, setCanSubmit] = useState<boolean>(false)
    const [inputClass, setInputClass] = useState<any>({
        fullName: "",
        email: "",
        password: ""
    })

    const isValidEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    const onChange = (e: any) => {
        const { id, value } = e.target
        const values = { fullName, email, password }

        switch (id) {
            case "fullName":
                values["fullName"] = value
                setFullName(value)

                setInputClass({
                    ...inputClass,
                    fullName: value.length >= 2 ? "input-success" : "input-error"
                })
                break;

            case "email":
                values["email"] = value
                setEmail(value)
                setInputClass({
                    ...inputClass,
                    email: isValidEmail(value) ? "input-success" : "input-error"
                })
                break;

            case "password":
                values["password"] = value
                setPassword(value)
                setInputClass({
                    ...inputClass,
                    password: value.length > 5 ? "input-success" : "input-error"
                })

                break;

            default:
                break;
        }

        if (isLogin && isValidEmail(values.email) && values.password.length > 5) {
            setCanSubmit(true)

        } else if (!isLogin && values.fullName.length >= 2 && isValidEmail(values.email) && values.password.length > 5) {
            setCanSubmit(true)

        } else {
            setCanSubmit(false)
        }
    }

    const onClick = async () => {
        setIsLogin(!isLogin)
    }

    const onSubmit = async (e: any) => {
        e.preventDefault()


        if (isLogin) {
            console.log(fullName, email, password);
            setError("")
        } else {
            try {
                const user = await axios.post("/users", { fullName, email, password })

                localStorage.setItem("userInfo", JSON.stringify(user.data.data))
                window.location.reload()

            } catch (error) {
                console.error(error.response.data.error);
                setError(error.response.data.error)
            }
        }
    }


    return (
        <div className="SighUp">
            <main>
                <header>
                    <img src={logo} alt="logo" />
                </header>
                <form onChange={onChange}>
                    {!isLogin && <input className={inputClass.fullName} id="fullName" type="text" placeholder="Full Name*" />}
                    <input className={inputClass.email} id="email" type="email" required placeholder="Email*" />
                    <input className={inputClass.password} id="password" type="password" required placeholder="Password*" />
                    {isLogin ? (
                        <span>Don't have an account yet? <span onClick={() => setIsLogin(!isLogin)}>Signup</span> </span>
                    ) : (
                        <span>
                            Already have an account? <span onClick={onClick}>Login</span>
                        </span>
                    )}

                    {error && (
                        <span className="error">{error}</span>
                    )}

                    <button disabled={!canSubmit} className={canSubmit ? "" : "disabled"} onClick={onSubmit}>{isLogin ? "Login" : "Signup"}</button>
                </form>
            </main>
        </div>
    )
}

export default SighUp