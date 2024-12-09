import { USER_INFO } from "@/constants"
import axios from "axios"

export const updateLastSeen = async (conversationId: number) => {
    await axios.post("/conversations/lastSeen", {
        conversationId,
        userId: USER_INFO.id
    }).then((_res: any) => {
        // console.log(res.data.data, "last-seen");
    })
}

