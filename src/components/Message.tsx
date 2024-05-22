import { USER_INFO } from "@/constants"


type Props = {
    message: any
}
const Message: React.FC<Props> = ({ message }) => {
    const isMyMessage = USER_INFO.id === message.userId

    return (
        <div className="Message" style={{ alignItems: isMyMessage ? "flex-end" : "flex-start" }}>
            <span style={{
                background: isMyMessage ? "#005046" : "#464646"
            }}>{message.body}</span>
        </div>
    )
}

export default Message