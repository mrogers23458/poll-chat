import { useMutation } from "@apollo/client"
import { useState } from "react"

export default function Send () {

    const [message, setMessage] = useState({
        content: ''
    })

    const handleUpdate = function (e) {
        setMessage({...message, [e.target.name]:e.target.value})
        console.log(message)
    }

    return(
        <div className="send-box">
            <form className="send-form">
                <label htmlFor="message">Message Content</label>
                <input className="message" name="content" onChange={handleUpdate}></input>
                <button className="post btn">Post Message</button>
            </form>
        </div>
    )
}