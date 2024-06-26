import '@/styles/Conversations.scss'
import { useContext, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import EmojiPicker from 'emoji-picker-react';
import { Popover } from 'antd'
import { emoji } from '@/assets'
import { SocketContext } from '@/contexts/socket'
import Message from '@/components/Message'
import { USER_INFO } from '@/constants'
import { MainContext } from '@/contexts'



const Chat: React.FC = () => {
    const ref = useRef<HTMLInputElement>(null)
    const messagesEndRef = useRef(null)
    const [message, setMessage] = useState<string>("")
    const [hasMounted, setHasMounted] = useState(false)

    const { emitEvent, onEvent } = useContext(SocketContext)
    const { lastSeen, fetchUserConversations, setLastSeen, conversation, setMessages, messages, fetchMessages } = useContext(MainContext)

    const updateLastSeen = async (conversationId: number) => {
        try {
            await axios.post("/conversations/lastSeen", {
                conversationId,
                userId: USER_INFO.id
            })
        } catch (error) {
            console.error(error);
        }
    }

    const sendMessage = async ({ key }: { key: string }) => {
        if (!message) return

        if (key === "Enter") {
            await axios.post("/messages", {
                conversationId: conversation.id,
                userId: USER_INFO.id,
                body: message,
                mediaUrl: "https://avatars.githubusercontent.com/u/65832964"
            }).then((res) => {
                const newMessage = {
                    ...res.data.data,
                    sentTo: conversation.users[0]?.id
                }

                emitEvent("new-message", newMessage)
                setMessages([...messages, res.data.data])
                setMessage("")
                setHasMounted(!hasMounted)
                updateLastSeen(conversation.id)
                fetchUserConversations()
            })
        }
    }

    const onEmojiClick = (emojiObject: any) => {
        setMessage(message + emojiObject.emoji)

    }


    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };


    const RenderProfilePopoverContent = () => {
        return (
            <div className="profile-popover">
                <img src={conversation.users[0]?.imageUrl} alt="profile" />
                <h3>{conversation.users[0]?.fullName}</h3>
                <span>{conversation.users[0]?.email}</span>
            </div>
        )
    }


    useEffect(() => {
        scrollToBottom();
    }, [hasMounted, messages]);



    useEffect(() => {
        if (conversation) {
            fetchMessages(conversation.id)
        }

    }, [conversation])


    useEffect(() => {
        onEvent("last-seen-answer", (data: any) => {
            setLastSeen(data.lastSeen)
        })

        setHasMounted(!hasMounted)

    }, [])

    return (
        <div className="Chat">
            {conversation ?
                <div className="wrapper">
                    <div className="header">
                        <Popover content={RenderProfilePopoverContent} trigger="click">
                            <img src={conversation.users[0]?.imageUrl} alt="profile" />
                        </Popover>
                        <div className="info">
                            <span className='full-name'>{conversation.users[0]?.fullName}</span>
                            <span id="user-online-status">{lastSeen}</span>
                        </div>
                    </div>
                    <div className='messages' style={{ paddingRight: "20px", paddingTop: "20px" }}>
                        {messages.map((message, index) => (
                            <Message message={message} key={index} />
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                    <div className="footer">
                        <div className="input-box">
                            <input value={message} onChange={(e) => setMessage(e.target.value)} onKeyDown={sendMessage} ref={ref} type="text" placeholder="Message" id="new-message" />
                            <Popover overlayInnerStyle={{ background: "#282829" }} content={<EmojiPicker onEmojiClick={onEmojiClick} theme={"dark" as any} />} trigger="click">
                                <img src={emoji} alt="emoji" />
                            </Popover>
                        </div>
                    </div>
                </div>
                : null
            }
        </div>
    )
}

export default Chat