import Receive from "../Components/Receive";
import Send from "../Components/Send";

export default function Home() {
    return(
        <div className="home-box">
            <Send />
            <Receive />
        </div>
    )
}