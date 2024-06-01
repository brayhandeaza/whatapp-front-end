import { EXPO_PUBLIC_CLOUDINARY_API_URL } from "@/constants";
import axios from "axios"
import { useState } from "react";


type UseCloudinaryType = {
    uploadImage: (image: any) => Promise<any>;
    setUploadedData: (image: any) => void;
    uploadedData: any
}


export const useCloudinary = (): UseCloudinaryType => {
    const [uploadedData, setUploadedData] = useState<any>({})

    const uploadImage = async (image: any): Promise<any> => {
        try {
            const data = new FormData()
            data.append("file", image)
            data.append("upload_preset", "r8aablpi")
            data.append("public_id", image["public_id"])
            data.append("name", image["name"])
            const response = await axios.post(EXPO_PUBLIC_CLOUDINARY_API_URL, data)

            // setUploadedData(response.data)
            // callBack(response.data?.secure_url)

            // console.log(response.data?.secure_url);

            return response.data

        } catch (error) {
            console.log(error)
        }
    }


    return {
        uploadImage,
        setUploadedData,
        uploadedData
    }
}
