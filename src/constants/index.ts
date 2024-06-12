const userInfo = localStorage.getItem("userInfo")

export const USER_INFO = userInfo ? JSON.parse(userInfo) : undefined

export const sortByMessageCreatedAt = (conversations: any[]) => {
    return conversations?.sort((a: any, b: any) => {
        const aCreatedAt: any = a.messages.length > 0 ? new Date(a.messages[0].createdAt) : new Date(0);
        const bCreatedAt: any = b.messages.length > 0 ? new Date(b.messages[0].createdAt) : new Date(0);
        return bCreatedAt - aCreatedAt;
    });
};


console.log(USER_INFO, "USER_INFO");


export const SERVER_URL = "https://whatsapp-back-end-28aa98490ce5.herokuapp.com/"


export const EXPO_PUBLIC_CLOUDINARY_API_URL="https://api.cloudinary.com/v1_1/brayhandeaza/auto/upload"
