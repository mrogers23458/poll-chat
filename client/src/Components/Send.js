export default function Send () {
    return(
        <div className="send-box">
            <form className="send-form">
                <label htmlFor="message">Message Content</label>
                <input className="message" name="content"></input>
                <button className="post btn">Post Message</button>
            </form>
        </div>
    )
}