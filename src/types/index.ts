export type SocketType = {
    children?: any
    conversationInfo: any
    setConversationInfo: (conversationId: number) => void
    emitEvent: (event: string, data: any) => void
    onEvent: (event: string, data: any) => void
}


export type ConversationType = {
    id: number
    userId: number
    participantId: number
    lastSeens: any
    messages: any
    participants: any
}