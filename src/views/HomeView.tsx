import Menu from '@/components/Menu'
import Conversations from '@/components/conversations'
import Chat from '@/components/Chat'
import { useContext, useEffect } from 'react'
import { MainContext } from '@/contexts'
import axios from 'axios'
import { USER_INFO, sortByMessageCreatedAt } from '@/constants'
import moment from 'moment'

const HomeView: React.FC = () => {
    const { setConversations, setConversation, setActiveIndex } = useContext(MainContext)



    const fetchUserConversations = async () => {
        await axios.get(`/users/${USER_INFO.id}?lastSeen=${moment().format("YYYY-MM-DD")}`).then(res => {
            const sortedConversations = sortByMessageCreatedAt(res.data.data.conversations)

            setConversations(sortedConversations)
            setConversation(sortedConversations[0])
            setActiveIndex(sortedConversations[0]?.id)
        })
    }


    useEffect(() => {
        fetchUserConversations()


    }, [])


    return (
        <>
            <title>WhatsApp - Chats</title>
            <Menu />
            <Conversations />
            <Chat />
        </>
    )
}

export default HomeView