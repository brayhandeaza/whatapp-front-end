import { USER_INFO, sortByMessageCreatedAt } from "@/constants";
import axios from "axios";
import moment from "moment";
import { createContext, useContext, useEffect, useState } from "react";
import { SocketContext } from "./socket";
import { updateLastSeen } from "@/api";
import { MainContextType } from "@/types";


export const MainContext = createContext<MainContextType>({
    conversations: [],
    setConversations: (_: any) => { },

    messages: [],
    setMessages: (_: any) => { },

    conversation: undefined,
    setConversation: (_conversationId: number) => { },

    activeIndex: undefined,
    setActiveIndex: (_: number) => { },

    fetchMessages: (_conversationId: number) => { },

    lastSeen: "",
    setLastSeen: (_: string) => { },

    fetchUserConversations: () => { }
})

export const MainProvider = ({ children }: any) => {
    const { emitEvent, onEvent } = useContext(SocketContext)
    const [lastSeen, setLastSeen] = useState<string>("")
    const [conversations, setConversations] = useState([])
    const [messages, setMessages] = useState([])
    const [conversation, setConversation] = useState(undefined)
    const [activeIndex, setActiveIndex] = useState<number>()


    const fetchUserConversations = async () => {
        await axios.get(`/users/${USER_INFO.id}?lastSeen=${moment().format("YYYY-MM-DD")}`).then(res => {
            const sortedConversations = sortByMessageCreatedAt(res.data.data.conversations)

            setConversations(sortedConversations)
            setConversation(sortedConversations[0])
            setActiveIndex(sortedConversations[0]?.id)
        })
    }

    const fetchMessages = async (id: number) => {
        if (!id) return
        
        try {
            const messages = await axios.get(`/messages/conversation/${id}/?page=1&pageSize=50`)

            setMessages(messages.data.data)
            emitEvent("last-seen", {
                sentTo: conversation?.users[0]?.id,
                sentFrom: USER_INFO.id,
                lastSeen: "Online"
            })

        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        fetchUserConversations()
        fetchMessages(conversation?.id)


        onEvent("last-seen", (data) => {
            emitEvent("last-seen-answer", {
                sentTo: data.sentFrom,
                sentFrom: USER_INFO.id,
                lastSeen: "Online"
            })
        })


        onEvent("new-message-received", (message: any) => {
            if (activeIndex === conversation?.id) {
                fetchMessages(message.conversationId)
                updateLastSeen(message.conversationId)
                fetchUserConversations()
            } else {

            }
        })


        onEvent("new-message", (_data: any) => {
            fetchUserConversations()
        })

    }, [])


    const data = {
        conversations,
        setConversations,

        messages,
        setMessages,

        conversation,
        setConversation,

        activeIndex,
        setActiveIndex,

        lastSeen,
        setLastSeen,

        fetchMessages,
        fetchUserConversations
    }

    return (
        <MainContext.Provider value={data}>
            {children}
        </MainContext.Provider>
    )
}
