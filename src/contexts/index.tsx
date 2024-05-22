import { USER_INFO } from "@/constants";
import axios from "axios";
import moment from "moment";
import { createContext, useContext, useEffect, useState } from "react";
import { SocketContext } from "./socket";
import { updateLastSeen } from "@/api";


type Props = {
    children?: any
    fetchMessages: (_: number) => void

    conversations: any[]
    setConversations: (_: any) => void

    conversation: any
    setConversation: (_: any) => void

    messages: any[]
    setMessages: (_: any) => void

    activeIndex: number
    setActiveIndex: (_: number) => void

    lastSeen: string
    setLastSeen: (_: string) => void
}

export const MainContext = createContext<Props>({
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
    setLastSeen: (_: string) => { }
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
            setConversations(res.data.data.conversations)

            setConversation(res.data.data.conversations[0])
            setActiveIndex(res.data.data.conversations[0]?.id)
        })
    }


    const fetchMessages = async (id: number) => {
        await axios.get(`/messages/conversation/${id}/?page=1&pageSize=50`).then((res) => {
            setMessages(res.data.data)

            emitEvent("last-seen", {
                sentTo: conversation?.users[0]?.id,
                sentFrom: USER_INFO.id,
                lastSeen: "Online"
            })
        })
    }

    useEffect(() => {
        fetchUserConversations()
        fetchMessages(conversation?.id)


        onEvent("last-seen", (data) => {
            console.log({ data }, "last-seen");

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
            // setMessages([...messages, message])
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

        fetchMessages
    }

    return (
        <MainContext.Provider value={data}>
            {children}
        </MainContext.Provider>
    )
}