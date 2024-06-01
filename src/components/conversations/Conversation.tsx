import { unReadMessage } from '@/assets'
import { USER_INFO } from '@/constants'
import { MainContext } from '@/contexts'
import { Popover } from 'antd'
import axios from 'axios'
import moment from 'moment'
import React, { useContext, useEffect, useState } from 'react'
import { MdExpandCircleDown } from "react-icons/md";



type Props = {
    conversation: any
    title: string
    id: number
    activeIndex: number
    showSelection: boolean
    onClick: (conversation: any, _lastSeen: string, unReadMessageCount: number) => void
}

const Conversation: React.FC<Props> = ({ conversation, title, id, onClick, showSelection }: Props) => {
    const [unReadMessageCount, setUnReadMessageCount] = useState<number>(0)
    const { activeIndex, archivedSelected, setArchivedSelected } = useContext(MainContext)


    const formatLastMessage = (text: string) => {
        if (!text) return ""

        if (text.length < 40) return text

        return text.slice(0, 35) + "..."
    }

    const fetchUnReadMessageCount = async () => {
        const lastMessageDate = conversation.lastSeens[0]?.lastSeen || moment().format("YYYY-MM-DD")
        try {
            await axios.get(`/messages/unread/conversation/${conversation.id}?lastSeenDate=${lastMessageDate}`).then(res => {
                setUnReadMessageCount(res.data.data || 0)
            })
        } catch (error) {
            console.error(error);
        }
    }

    const onChange = (e: any) => {
        if (e.target.checked) {
            setArchivedSelected([...archivedSelected, conversation.id])

        } else {
            setArchivedSelected(archivedSelected.filter((id: number) => id !== conversation.id))
        }
    }

    const updateArchivedConversations = async () => {
        try {
            await axios.patch(`/conversations/${id}`, { "archivedBy": USER_INFO.id })
            window.location.reload()

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchUnReadMessageCount()
    }, [])


    return (
        <div style={{ display: "flex" }}>
            {showSelection ? <input style={{ marginRight: "10px" }} onChange={(e) => onChange(e)} type="checkbox" /> : null}
            <div id={`chat-${id}`} style={{ background: activeIndex === conversation.id ? "#282829" : "" }} onClick={() => onClick(conversation, new Date().toISOString(), unReadMessageCount)} className={`chat`}>
                <div className="left">
                    <div className={`prifile-img-container`}>
                        <img src={conversation.users[0].imageUrl} alt="" />
                    </div>

                    <div className="info-container">
                        <div>
                            <span>{conversation.users[0].fullName}</span>
                        </div>
                        <div style={{ opacity: conversation.messages[0] ? 1 : 0 }} className="last-message">
                            <img id={`read-message-icon-${id}`} src={unReadMessage} alt="readMessage" />
                            <span id={`last-message-${id}`}>{formatLastMessage(conversation.messages[0]?.body)}</span>
                        </div>
                    </div>
                </div>

                <div className="right-side-container">
                    <span style={{ color: "white", cursor: "pointer" }} id={`read-message-date-${id}`}>{moment(conversation.messages[0]?.createdAt).fromNow()}</span>
                    {title !== "Archived" ? <Popover placement="bottom" content={
                        <span onClick={updateArchivedConversations} className='archived-conversation' style={{ color: "white", padding: "0 20px", cursor: "pointer" }}>Archived</span>
                    }>
                        <MdExpandCircleDown size={22} style={{ color: "gray", marginTop: "5px", marginLeft: 5 }} />
                    </Popover> : null}
                </div>
            </div>
        </div>
    )
}

export default Conversation