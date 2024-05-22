import { USER_INFO } from "@/constants";
import { SocketType } from "@/types";
import { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";


export const SocketContext = createContext<SocketType>({
    emitEvent: (_: string, __: any) => { },
    onEvent: (_: string, __: any) => { },
    conversationInfo: undefined,
    setConversationInfo: (_: number) => { }
})

export const SocketProvider = ({ children }: any) => {
    const socket = io("http://localhost:3000")
    const [conversationInfo, setConversationInfo] = useState<number>()

    const emitEvent = (event: string, data: any) => {
        socket.emit(event, data)
    }

    const onEvent = (event: string, callback: Function) => {
        socket.on(event, (data) => {
            callback(data)
        })
    }

    useEffect(() => {
        socket.emit("joinRoom", USER_INFO.id)
    }, [])

    const data = {
        emitEvent,
        onEvent,
        conversationInfo,
        setConversationInfo

    }

    return (
        <SocketContext.Provider value={data}>
            {children}
        </SocketContext.Provider>
    )
}
