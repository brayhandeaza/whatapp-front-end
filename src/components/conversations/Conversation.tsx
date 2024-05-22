import { unReadMessage } from '@/assets'
import { MainContext } from '@/contexts'
import axios from 'axios'
import moment from 'moment'
import React, { useContext, useEffect, useState } from 'react'


type Props = {
    conversation: any
    id: number
    activeIndex: number
    onClick: (conversation: any, _lastSeen: string, unReadMessageCount: number) => void
}

const Conversation: React.FC<Props> = ({ conversation, id, onClick }: Props) => {
    const [unReadMessageCount, setUnReadMessageCount] = useState<number>(0)
    const { activeIndex } = useContext(MainContext)


    const formatLastMessage = (text: string) => {
        if (!text) return ""

        if (text.length < 40) return text

        return text.slice(0, 35) + "..."
    }

    const fetchUnReadMessageCount = async () => {
        const lastMessageDate = conversation.lastSeens[0]?.lastSeen || moment().format("YYYY-MM-DD")
        try {
            await axios.get(`/messages/unread/conversation/${conversation.id}?lastSeenDate=${lastMessageDate}`).then(res => {
                // console.log(res.data.data);
                setUnReadMessageCount(res.data.data || 0)
            })
        } catch (error) {
            console.error(error);
        }
    }



    useEffect(() => {
        fetchUnReadMessageCount()
    }, [])


    return (
        <div id={`chat-${id}`} style={{ background: activeIndex === conversation.id ? "#282829" : "" }} onClick={() => onClick(conversation, new Date().toISOString(), unReadMessageCount)} className={`chat`}>
            <div className="left">
                <div className={`prifile-img-container`}>
                    <img src={conversation.users[0].imageUrl} alt="" />
                </div>

                <div className="info-container">
                    <div>
                        <span>{conversation.users[0].fullName}</span>
                        {/* <span>{moment(conversation.messages[0].createdAt).fromNow()}</span> */}
                    </div>
                    <div style={{ opacity: conversation.messages[0] ? 1 : 0 }} className="last-message">
                        <img id={`read-message-icon-${id}`} src={unReadMessage} alt="readMessage" />
                        <span id={`last-message-${id}`}>{formatLastMessage(conversation.messages[0]?.body)}</span>
                    </div>
                </div>
            </div>

            <div className="right-side-container">
                <span style={{ color: unReadMessageCount ? "#27A356" : "white" }} id={`read-message-date-${id}`}>{moment(conversation.messages[0]?.createdAt).fromNow()}</span>
            </div>
        </div>
    )
}

export default Conversation