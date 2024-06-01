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


export type MainContextType = {
    children?: any
    fetchMessages: (_: number) => void
    

    conversations: any[]
    setConversations: (_: any) => void

    conversation: any
    setConversation: (_: any) => void

    messages: any[]
    setMessages: (_: any) => void

    archivedSelected: number[]
    setArchivedSelected: (_: any) => void

    activeIndex: number
    setActiveIndex: (_: number) => void

    lastSeen: string
    setLastSeen: (_: string) => void

    fetchUserConversations: () => void
}