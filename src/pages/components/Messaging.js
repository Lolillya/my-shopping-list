import React from "react"

import { initializeApp } from "firebase/app"
import { getDatabase, ref, push, onValue, set, } from "firebase/database"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons"

export default function Messaging(props) {

    // --------------------------------------------------
    // Database setup------------------------------------
    // --------------------------------------------------

    const appSettings = {
        databaseURL: "https://playground-949fe-default-rtdb.asia-southeast1.firebasedatabase.app/"
    }

    const app = initializeApp(appSettings)
    const database = getDatabase(app)
    const MessagesDB = ref(database, `Messages/`)

    // ---------------------------------------------
    // ---------------------------------------------
    // ---------------------------------------------

    const [messages, setMessages] = React.useState([])
    const [value, setValue] = React.useState("")
    const nullRef = React.useRef(null)

    const messageElements = messages.map(msg =>
        <div className="msg--cont--wrap">
            <p style={{ margin: 0, paddingTop: "2px", paddingBottom: "2px" }}>{msg.msg}</p>
        </div>
    )

    function handleClick(event) {
        let userName = "Unknown User"
        if(props.getName.length != 0)
        userName = props.getName;

        if (value.length != 0)
            push(ref(database, `Messages`), {
                msg: userName + " : " +  value
            })

        else
            console.log("Empty Field!")
        setValue("")
        nullRef.current.value = ""
        event.preventDefault()
    }

    function handleChange(event) {
        setValue(event.target.value)
    }

    React.useEffect(() => {
        onValue(MessagesDB, function (messages) {
            if (messages.exists()) {
                let msg = Object.values(messages.val())
                setMessages(msg)
            }
            else
                setMessages([])
        })

    }, [])

    
    // handleReset = () => {
        
    // }


    return (
        <div className="msg--container">
            <section id="msg--output">
                {messageElements}
            </section>

            <form onSubmit={handleClick} autoComplete="off">
                <FontAwesomeIcon icon={faPaperPlane} id="msg--send--icon" type="submit" onClick={handleClick} />
                <input id="msg--input" value={value} onChange={handleChange} ref={nullRef} autoComplete="off"/>
            </form>
        </div>
    )
}