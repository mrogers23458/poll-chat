import { useQuery } from "@apollo/client"
import { GET_MESSAGES } from "../utils/query"

export default function Receive (){

    const { loading, error, data } = useQuery(GET_MESSAGES,
        {
            pollInterval: 500
        })

    if (loading) {
        return (
            <div className="loading">
                Loading...
            </div>
        )
    }

    if (error) {
        return (
            <div>
                There was an error...
            </div>
        )
    }

    if (data) {
        console.log(data)
        

        const allMessages = data.messages
        return(
            <div className="messages-box">
               {allMessages.map((message)=> <div key={message._id} className="message-content"> {message.content} </div>)}
            </div>
        )
    }
    return(
        <div className="receive-box">
            receive something
        </div>
    )
}