import Chat from "@/components/Chat"
import Menu from "@/components/Menu"
import Conversations from "@/components/conversations"
import { USER_INFO, sortByMessageCreatedAt } from "@/constants"
import { MainContext } from "@/contexts"
import axios from "axios"
import { useContext, useEffect } from "react"

const ArchivedView: React.FC = () => {
	const { setConversations, setConversation, setActiveIndex } = useContext(MainContext)

	const fetchArchivedConversations = async () => {
		try {
			const res = await axios.get(`/conversations/archived/user/${USER_INFO.id}`)
			const sortedConversations = sortByMessageCreatedAt(res.data.data)

			setConversations(sortedConversations)
			setConversation(sortedConversations[0])
			setActiveIndex(sortedConversations[0]?.id)

		} catch (error) {
			console.error(error);
		}
	}


	useEffect(() => {
		fetchArchivedConversations()

	}, [])


	return (
		<>
			<title>WhatsApp - Archived</title>
			<Menu />
			<Conversations title="Archived" />
			<Chat />
		</>
	)
}

export default ArchivedView