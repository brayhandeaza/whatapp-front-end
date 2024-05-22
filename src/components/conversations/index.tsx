import React, { useContext, useRef, useState } from 'react'
import { newChat } from "@/assets"
import { USER_INFO } from "@/constants"
import "@/styles/Conversations.scss"
import axios from "axios"
import { SocketContext } from '@/contexts/socket'
import Conversation from './Conversation'
import { MainContext } from '@/contexts'
import { Popover } from 'antd';
import { updateLastSeen } from '@/api'

const Conversations: React.FC = () => {
    const inputRef = useRef<HTMLInputElement>(null)
    const { emitEvent } = useContext(SocketContext)
    const { setConversation, setLastSeen, activeIndex, setActiveIndex, conversations } = useContext(MainContext)
    const [open, setOpen] = useState(false);

    const handleOpenChange = (newOpen: boolean) => {
        setOpen(newOpen);

        inputRef.current?.focus()
    };



    const onClick = (conversation: any, _lastSeen: string) => {
        setActiveIndex(conversation.id)
        setConversation(conversation)
        updateLastSeen(conversation.id)
        setLastSeen("")
        emitEvent("last-seen", {
            sentTo: conversation.users[0]?.id,
            sentFrom: USER_INFO.id,
            lastSeen: "Online"
        })
    }


    const RenderPopoverContent = () => {
        const [users, setUsers] = useState<any>([])

        const createConversation = async (participantId: number) => {
            await axios.post("/conversations", {
                userId: USER_INFO.id,
                participantId

            }).then(() => {
                window.location.reload()
            })
        }


        const fetchUsers = async (search: string) => {
            if (search) {
                await axios.get(`/users/search?page=1&pageSize=5&userId=${USER_INFO.id}&search=${search}`).then(res => {
                    setUsers(res.data.data)
                })
            } else {
                setUsers([])
            }
        }

        return (
            <div className='popover-content'>
                <div className="search">
                    <input ref={inputRef} onChange={(e) => fetchUsers(e.target.value)} type="text" placeholder='Search...' />
                </div>
                {users ? users.map((user: any, key: number) => (
                    <div onClick={() => createConversation(user.id)} key={`user-popover-${key}`} className="user">
                        <img src={user?.imageUrl} alt={`user-popover-image`} />
                        <span>{user?.fullName}</span>
                    </div>
                )) : null}
            </div>

        )
    }

    return (
        <div className="Conversations">
            <header>
                <h1>Chats</h1>
                <div className="icon-container">
                    <Popover className='new-chat-popover' open={open} onOpenChange={handleOpenChange} trigger="click" content={<RenderPopoverContent />} >
                        <img src={newChat} alt="newChat" />
                    </Popover>
                </div>
            </header>

            <main>
                {conversations.map((conversation: any, key: number) => (
                    <Conversation
                        key={"chat-" + key}
                        conversation={conversation}
                        id={conversation.id}
                        activeIndex={activeIndex}
                        onClick={onClick}
                    />
                ))}
            </main>
        </div>
    )
}

export default Conversations