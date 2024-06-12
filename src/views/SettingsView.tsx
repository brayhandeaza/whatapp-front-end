import "@/styles/Settings.scss"
import Menu from "@/components/Menu"
import { USER_INFO } from "@/constants"
import { useEffect, useRef, useState } from "react"
import { FaPlusCircle } from "react-icons/fa";
import { MdUpload } from "react-icons/md";
import { useCloudinary } from "@/hooks/useCloudinary";
import axios from "axios";

const SettingsView: React.FC = () => {
    const [open, setOpen] = useState(false)
    const [imageUrl, setImageUrl] = useState<string>("")
    const ref = useRef<HTMLInputElement>()
    const { uploadImage } = useCloudinary()


    const onLogout = () => {
        localStorage.clear()

        window.location.href = "/"
    }

    const handleChangeImageProfile = () => {
        if (ref.current) {
            ref.current.click()
        }
    }


    const handleChangeImage = (e: any) => {
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            console.log(reader);

            setImageUrl(reader.result as string)
        }
    }


    const uploadProfileImage = async () => {
        try {
            // const url = URL.createObjectURL(ref.current?.files[0])
        
            const { secure_url } = await uploadImage(ref.current?.files[0])
            console.log(secure_url, "secure_url");
            
            const user = await axios.patch(`/users/${USER_INFO.id}`, {
                imageUrl: secure_url
            })

            console.log(user.data.data, "user");

            localStorage.setItem("userInfo", JSON.stringify(user.data.data))
            window.location.reload()

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        setImageUrl(USER_INFO.imageUrl)
    }, [])

    return (
        <div className="Settings">
            <main>
                <div className="image-container">
                    <img onClick={() => setOpen(true)} src={imageUrl} alt="profile-logo" />
                    {imageUrl === USER_INFO.imageUrl ?
                        <FaPlusCircle onClick={handleChangeImageProfile} className="plus-icon" color="#27A356" />
                        :
                        <MdUpload onClick={uploadProfileImage} className="plus-icon" color="#27A356" />
                    }
                    <input onChange={handleChangeImage} ref={ref} style={{ display: "none" }} type="file" name="" id="file-input" />
                </div>

                <h1 className="full-name">{USER_INFO.fullName}</h1>
                <h3>{USER_INFO.email}</h3>

                <button onClick={onLogout}>Logout</button>
            </main >
            <dialog onClick={() => setOpen(false)} className="image-container" open={open}>
                <div className="image-container">
                    <img src={imageUrl} alt="profile-logo" />
                </div>
            </dialog>
            <Menu />
        </div >
    )
}

export default SettingsView