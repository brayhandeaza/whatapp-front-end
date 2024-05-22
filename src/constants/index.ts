// export const USER_INFO = {
//     "id": 1,
//     "fullName": "Jonathan Crist",
//     "imageUrl": "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
//     "email": "Maida14@yahoo.com",
//     "password": "ptgjahORfUiNqVc",
//     "createdAt": "2024-05-15T05:18:58.690Z",
//     "updatedAt": "2024-05-15T05:18:58.690Z"
// }

// export const USER_INFO2 = {
//     "id": 9,
//     "fullName": "Shawna Hoppe",
//     "imageUrl": "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
//     "email": "Kennedy_Farrell@yahoo.com",
//     "password": "y19e1ZTpmycba86",
//     "createdAt": "2024-05-15T05:18:58.705Z",
//     "updatedAt": "2024-05-15T05:18:58.705Z"
// }


// localStorage.setItem("userInfo", JSON.stringify(USER_INFO2))

// localStorage.clear()

const userInfo = localStorage.getItem("userInfo")

export const USER_INFO = userInfo ? JSON.parse(userInfo) : undefined



export const sortByMessageCreatedAt = (conversations: any[]) => {
    return conversations?.sort((a: any, b: any) => {
        const aCreatedAt: any = a.messages.length > 0 ? new Date(a.messages[0].createdAt) : new Date(0);
        const bCreatedAt: any = b.messages.length > 0 ? new Date(b.messages[0].createdAt) : new Date(0);
        return bCreatedAt - aCreatedAt;
    });
};


